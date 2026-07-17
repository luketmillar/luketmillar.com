import { react } from 'tldraw'
import { supabase } from 'lib/supabase'
import type { Editor, TLRecord, TLShape } from 'tldraw'

// A shape counts as "finished" (worth persisting) once a sticker is placed or a
// freehand stroke completes. Skips the many intermediate states of a live draw.
// Text is handled separately (persisted when editing ends), not here.
const isFinished = (rec: TLRecord): rec is TLShape => {
    if (rec.typeName !== 'shape') return false
    const shape = rec as TLShape
    if (shape.type === 'sticker') return true
    if (shape.type === 'draw') return (shape.props as { isComplete: boolean }).isComplete
    return false
}

/**
 * Wire a tldraw editor to the shared Supabase wall:
 * - load every existing shape,
 * - persist each finished shape you draw,
 * - stream in shapes other people add,
 * - block deletes so the wall is append-only.
 * Returns a cleanup function.
 */
export const initWallSync = (editor: Editor): (() => void) => {
    const savedIds = new Set<string>()
    let disposed = false

    // Stored shapes carry the page id of whoever drew them; re-parent onto this
    // client's current page so they actually render.
    const pageId = editor.getCurrentPageId()
    const onThisPage = (shape: TLRecord): TLRecord => ({ ...shape, parentId: pageId } as TLRecord)

    const persist = (shape: TLShape) => {
        if (savedIds.has(shape.id)) return
        savedIds.add(shape.id)
        supabase
            .from('wall_shapes')
            .insert({ shape_id: shape.id, shape })
            .then(({ error }) => {
                if (error) {
                    savedIds.delete(shape.id)
                    console.error('Failed to save shape:', error.message)
                }
            })
    }

    // Append-only: refuse every shape deletion — except text, whose empty
    // placeholders tldraw needs to clean up itself (there's no user-reachable
    // way to delete a text shape that actually has content).
    const offDelete = editor.sideEffects.registerBeforeDeleteHandler('shape', (shape) => {
        if (shape.type === 'text') return
        return false
    })

    // Load the existing wall.
    supabase
        .from('wall_shapes')
        .select('shape_id, shape')
        .then(({ data, error }) => {
            if (disposed || error || !data) return
            data.forEach((row) => savedIds.add(row.shape_id))
            const records = data.map((row) => onThisPage(row.shape as TLRecord))
            editor.store.mergeRemoteChanges(() => editor.store.put(records))
        })

    // Persist finished shapes as they're created/completed locally.
    const offListen = editor.store.listen(
        (entry) => {
            for (const rec of Object.values(entry.changes.added)) {
                if (isFinished(rec)) persist(rec)
            }
            for (const [, next] of Object.values(entry.changes.updated)) {
                if (isFinished(next)) persist(next)
            }
        },
        { source: 'user', scope: 'document' }
    )

    // Text isn't "complete" at a single moment like a stroke — it's done when
    // you click away. Persist a text shape once it stops being edited (and only
    // if it survived, i.e. wasn't an empty placeholder tldraw discarded).
    let prevEditing = editor.getEditingShapeId()
    const offTextPersist = react('persist-text', () => {
        const editing = editor.getEditingShapeId()
        const finished = prevEditing
        prevEditing = editing
        if (finished && finished !== editing) {
            setTimeout(() => {
                const shape = editor.getShape(finished)
                if (shape && shape.type === 'text') persist(shape)
            }, 0)
        }
    })

    // Stream in shapes from everyone else.
    const channel = supabase
        .channel('wall-shapes')
        .on(
            'postgres_changes',
            { event: 'INSERT', schema: 'public', table: 'wall_shapes' },
            (payload) => {
                const row = payload.new as { shape_id: string; shape: TLRecord }
                if (savedIds.has(row.shape_id)) return // our own echo
                savedIds.add(row.shape_id)
                editor.store.mergeRemoteChanges(() => editor.store.put([onThisPage(row.shape)]))
            }
        )
        .subscribe()

    return () => {
        disposed = true
        offDelete()
        offListen()
        offTextPersist()
        supabase.removeChannel(channel)
    }
}

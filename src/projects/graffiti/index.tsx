import React from 'react'
import styled from 'styled-components'
import {
    Tldraw,
    DefaultColorStyle,
    DefaultSizeStyle,
    DefaultFontStyle,
    react,
    type Editor,
    type TLComponents,
    type TLDefaultColorStyle,
    type TLDefaultSizeStyle,
} from 'tldraw'
import 'tldraw/tldraw.css'
import { BG, STICKERS, DEFAULT_SIZE } from './config'
import { StickerShapeUtil, StickerTool, stickerConfig } from './StickerShape'
import { initWallSync } from './useWallSync'
import Toolbar, { type WallTool } from './Toolbar'

const Root = styled.div`
    position: fixed;
    inset: 0;
    overflow: hidden;
    background: ${BG};
    touch-action: none;

    /* Hide tldraw's focus ring / any stray chrome edges. */
    .tl-background {
        background: ${BG};
    }

    /* Drop tldraw's legibility outline (a multi-direction text-shadow) on text. */
    .tl-text-content,
    .tl-rich-text {
        text-shadow: none !important;
    }
`

// Ghost of the sticker that follows the cursor so it's clear where it'll land.
// Opacity is driven imperatively by the pointer listener (shown only over the
// canvas), so it starts hidden here.
const StickerGhost = styled.div<{ $size: number }>`
    position: fixed;
    left: 0;
    top: 0;
    z-index: 400;
    pointer-events: none;
    font-size: ${(p) => p.$size * 0.86}px;
    line-height: 1;
    opacity: 0;
    transition: opacity 120ms;
    will-change: transform;
`

// tldraw license (removes the watermark). License keys are meant to ship in the
// client bundle — they're domain-locked, not a secret.
const TLDRAW_LICENSE_KEY =
    'tldraw-2026-10-25/WyJ4aFUyTzNLYiIsWyIqIl0sMTYsIjIwMjYtMTAtMjUiXQ./mYCjyj9HaVv4Lh8/GRuvkBe9HFIPEILRL9Ee+OQdRpOM5ODw5zbpfqZXvzF4eIaTV5M8TKKmaMTftmPRGjl7g'

const Background = () => <div style={{ position: 'absolute', inset: 0, background: BG }} />
const components: TLComponents = { Background }

// The wall is a fixed square (1:1) in page space, scaled to cover the window and
// centred, so everyone sees the same wall regardless of screen size.
const WALL_SIZE = 1080

// Stickers are a single, consistent size (no per-sticker size control).
const STICKER_SIZE = 92
stickerConfig.size = STICKER_SIZE

const Graffiti = () => {
    const editorRef = React.useRef<Editor | null>(null)
    const cleanupRef = React.useRef<null | (() => void)>(null)
    const ghostRef = React.useRef<HTMLDivElement>(null)

    const [ready, setReady] = React.useState(false)
    const [tool, setToolState] = React.useState<WallTool>('draw')
    const [color, setColorState] = React.useState<TLDefaultColorStyle>('black')
    const [size, setSizeState] = React.useState<TLDefaultSizeStyle>(DEFAULT_SIZE)
    const [sticker, setStickerState] = React.useState<string>(STICKERS[0])

    // Mirror the tool for the once-registered pointer listener below.
    const toolRef = React.useRef(tool)
    toolRef.current = tool

    const handleMount = React.useCallback((editor: Editor) => {
        editorRef.current = editor

        // Cover the window with the square wall (1:1, uniform scale), centred on
        // both axes — like CSS `object-fit: cover`. The wall always fills the
        // whole window; whichever direction overflows (the window's shorter side)
        // gets cropped, and you can never see outside the wall. Then lock the
        // camera so there's no pan or zoom. force: true applies it despite the lock.
        const fitCamera = () => {
            // The canvas fills the window (Root is fixed inset:0), so window
            // dimensions are the viewport — and they're current immediately on
            // resize, unlike tldraw's internally-observed bounds.
            const vw = window.innerWidth
            const vh = window.innerHeight
            const z = Math.max(vw / WALL_SIZE, vh / WALL_SIZE)
            editor.setCamera(
                { x: vw / (2 * z) - WALL_SIZE / 2, y: vh / (2 * z) - WALL_SIZE / 2, z },
                { force: true, immediate: true }
            )
        }
        editor.setCameraOptions({ isLocked: true })
        fitCamera()
        window.addEventListener('resize', fitCamera)
        // Keep the chosen tool active after each stroke/sticker.
        editor.updateInstanceState({ isToolLocked: true })
        editor.setStyleForNextShapes(DefaultColorStyle, 'black')
        editor.setStyleForNextShapes(DefaultSizeStyle, DEFAULT_SIZE)
        editor.setStyleForNextShapes(DefaultFontStyle, 'sans')
        editor.setCurrentTool('draw')

        // Hard-lock the toolset to pen / text / sticker. `hideUi` already
        // removes the toolbar, menus, context menu, and keyboard shortcuts; this
        // snaps the editor back if anything ever tries to enter select / eraser
        // / hand / etc. The one exception: typing runs inside the select tool's
        // editing state, so `select` is allowed *while a shape is being edited*.
        const stopToolLock = react('lock-tools', () => {
            const id = editor.getCurrentToolId()
            if (id === 'draw' || id === 'sticker' || id === 'text') return
            if (id === 'select' && editor.getEditingShapeId()) return
            editor.setCurrentTool('draw')
        })

        // Keep the toolbar's highlighted tool in sync with the editor — e.g.
        // after placing text the editor returns to the pen, so the pip follows.
        const stopToolSync = react('sync-tool-ui', () => {
            const id = editor.getCurrentToolId()
            if (id === 'draw' || id === 'sticker' || id === 'text') setToolState(id as WallTool)
        })

        const stopSync = initWallSync(editor)
        cleanupRef.current?.()
        cleanupRef.current = () => {
            window.removeEventListener('resize', fitCamera)
            stopToolLock()
            stopToolSync()
            stopSync()
        }
        setReady(true)
    }, [])

    React.useEffect(() => () => cleanupRef.current?.(), [])

    // Kill the right-click menu. tldraw handles `contextmenu` on its own canvas
    // and stops it bubbling, so a React handler on our wrapper never fires — we
    // block it in the capture phase at the document, before tldraw sees it.
    React.useEffect(() => {
        const block = (e: MouseEvent) => e.preventDefault()
        document.addEventListener('contextmenu', block, { capture: true })
        return () => document.removeEventListener('contextmenu', block, { capture: true })
    }, [])

    // Sticker ghost tracks the pointer, but only over the wall itself — hidden
    // when hovering the toolbar, top bar, or anything else that isn't canvas.
    React.useEffect(() => {
        const onMove = (e: PointerEvent) => {
            const el = ghostRef.current
            if (!el) return
            el.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`
            const overCanvas = !!(e.target as Element | null)?.closest?.('.tl-container')
            el.style.opacity = toolRef.current === 'sticker' && overCanvas ? '0.7' : '0'
        }
        window.addEventListener('pointermove', onMove)
        return () => window.removeEventListener('pointermove', onMove)
    }, [])

    // Hide the ghost immediately when leaving the sticker tool, even if the
    // pointer isn't moving.
    React.useEffect(() => {
        if (tool !== 'sticker' && ghostRef.current) ghostRef.current.style.opacity = '0'
    }, [tool])

    const setTool = (t: WallTool) => {
        setToolState(t)
        editorRef.current?.setCurrentTool(t)
    }
    const setColor = (c: TLDefaultColorStyle) => {
        setColorState(c)
        editorRef.current?.setStyleForNextShapes(DefaultColorStyle, c)
    }
    const setSize = (s: TLDefaultSizeStyle) => {
        setSizeState(s)
        editorRef.current?.setStyleForNextShapes(DefaultSizeStyle, s)
    }
    const setSticker = (e: string) => {
        setStickerState(e)
        stickerConfig.emoji = e
    }

    return (
        <Root>
            <Tldraw
                licenseKey={TLDRAW_LICENSE_KEY}
                hideUi
                shapeUtils={[StickerShapeUtil]}
                tools={[StickerTool]}
                components={components}
                onMount={handleMount}
            />

            <StickerGhost ref={ghostRef} $size={STICKER_SIZE} aria-hidden>
                {sticker}
            </StickerGhost>

            {ready && (
                <Toolbar
                    tool={tool}
                    setTool={setTool}
                    color={color}
                    setColor={setColor}
                    size={size}
                    setSize={setSize}
                    sticker={sticker}
                    setSticker={setSticker}
                />
            )}
        </Root>
    )
}

export default Graffiti

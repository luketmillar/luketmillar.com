import { ShapeUtil, HTMLContainer, Rectangle2d, StateNode, T, type TLBaseShape } from 'tldraw'

// Register the custom shape's props with tldraw's shape registry so that
// TLShape (and therefore ShapeUtil<StickerShape>, editor.getShape, etc.) knows
// about the 'sticker' type.
declare module '@tldraw/tlschema' {
    interface TLGlobalShapePropsMap {
        sticker: { emoji: string; size: number }
    }
}

export type StickerShape = TLBaseShape<'sticker', { emoji: string; size: number }>

// The sticker tool reads this when placing — kept in sync by the toolbar so the
// tool always stamps the currently-selected emoji at the current size.
export const stickerConfig = { emoji: '💥', size: 92 }

export class StickerShapeUtil extends ShapeUtil<StickerShape> {
    static override type = 'sticker' as const
    static override props = { emoji: T.string, size: T.number }

    getDefaultProps(): StickerShape['props'] {
        return { emoji: '💥', size: 92 }
    }

    // Stickers are place-and-leave: no resizing or rotating.
    override canResize() {
        return false
    }
    override hideResizeHandles() {
        return true
    }
    override hideRotateHandle() {
        return true
    }

    getGeometry(shape: StickerShape) {
        return new Rectangle2d({ width: shape.props.size, height: shape.props.size, isFilled: true })
    }

    component(shape: StickerShape) {
        return (
            <HTMLContainer
                style={{
                    width: shape.props.size,
                    height: shape.props.size,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: shape.props.size * 0.86,
                    lineHeight: 1,
                    userSelect: 'none',
                    pointerEvents: 'none',
                }}
            >
                {shape.props.emoji}
            </HTMLContainer>
        )
    }

    // No selection indicator — the wall isn't editable.
    getIndicatorPath() {
        return undefined
    }
}

// Click (or tap) to stamp a sticker centred on the pointer.
export class StickerTool extends StateNode {
    static override id = 'sticker'

    override onPointerDown = () => {
        const { x, y } = this.editor.inputs.currentPagePoint
        const size = stickerConfig.size
        this.editor.createShape<StickerShape>({
            type: 'sticker',
            x: x - size / 2,
            y: y - size / 2,
            props: { emoji: stickerConfig.emoji, size },
        })
    }
}

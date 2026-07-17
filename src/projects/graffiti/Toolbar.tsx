import React from 'react'
import styled, { keyframes } from 'styled-components'
import { Pencil, Type } from 'lucide-react'
import type { TLDefaultColorStyle, TLDefaultSizeStyle } from 'tldraw'
import { PEN_COLORS, SIZES, STICKERS } from './config'

export type WallTool = 'draw' | 'text' | 'sticker'

// Pick a legible glyph colour for a given ink so the pencil reads on any swatch.
const glyphOn = (hex: string) => {
    const n = parseInt(hex.slice(1), 16)
    const r = (n >> 16) & 255
    const g = (n >> 8) & 255
    const b = n & 255
    return 0.299 * r + 0.587 * g + 0.114 * b > 150 ? '#1d1d1d' : '#ffffff'
}

const pop = keyframes`
    from { opacity: 0; transform: translateY(10px) scale(0.94); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
`

const Dock = styled.div`
    position: fixed;
    left: 50%;
    bottom: max(20px, env(safe-area-inset-bottom));
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    z-index: 300;
    max-width: calc(100vw - 24px);
`

const frosted = `
    background: rgba(255, 255, 255, 0.78);
    backdrop-filter: blur(22px) saturate(1.5);
    -webkit-backdrop-filter: blur(22px) saturate(1.5);
    border: 1px solid rgba(255, 255, 255, 0.75);
    box-shadow:
        0 14px 44px rgba(38, 32, 26, 0.24),
        0 3px 10px rgba(38, 32, 26, 0.12),
        inset 0 1px 0 rgba(255, 255, 255, 0.7);
`

const Bar = styled.div`
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 7px;
    border-radius: 22px;
    ${frosted}
`

const ToolBtn = styled.button<{ $active: boolean }>`
    position: relative;
    width: 58px;
    height: 58px;
    border: none;
    border-radius: 17px;
    cursor: pointer;
    display: grid;
    place-items: center;
    background: ${(p) => (p.$active ? 'rgba(0, 0, 0, 0.06)' : 'transparent')};
    transition: transform 0.18s cubic-bezier(0.2, 0.8, 0.3, 1), background 0.18s ease;
    -webkit-tap-highlight-color: transparent;

    &:hover {
        transform: translateY(-2px);
        background: rgba(0, 0, 0, 0.05);
    }
    &:active {
        transform: translateY(0) scale(0.95);
    }

    /* active underline pip */
    &::after {
        content: '';
        position: absolute;
        bottom: 6px;
        left: 50%;
        width: ${(p) => (p.$active ? '16px' : '0')};
        height: 3px;
        border-radius: 3px;
        background: #1d1d1d;
        transform: translateX(-50%);
        opacity: ${(p) => (p.$active ? 0.85 : 0)};
        transition: width 0.22s cubic-bezier(0.2, 0.8, 0.3, 1), opacity 0.22s ease;
    }
`

const PenTile = styled.span<{ $color: string }>`
    width: 40px;
    height: 40px;
    border-radius: 13px;
    display: grid;
    place-items: center;
    background: ${(p) => p.$color};
    color: ${(p) => glyphOn(p.$color)};
    box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.1), 0 3px 8px rgba(0, 0, 0, 0.2),
        inset 0 1px 0 rgba(255, 255, 255, 0.25);
    transition: background 0.2s ease;
`

const GlyphTile = styled.span`
    width: 40px;
    height: 40px;
    border-radius: 13px;
    display: grid;
    place-items: center;
    color: #1d1d1d;
    background: rgba(0, 0, 0, 0.05);
    box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.06);
`

const EmojiTile = styled.span`
    font-size: 30px;
    line-height: 1;
    filter: drop-shadow(0 2px 3px rgba(0, 0, 0, 0.22));
    transform: rotate(-6deg);
`

const Popover = styled.div`
    padding: 14px;
    border-radius: 22px;
    ${frosted}
    animation: ${pop} 0.2s cubic-bezier(0.2, 0.9, 0.3, 1);
    transform-origin: bottom center;
`

const ColorGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 11px;
`

const Swatch = styled.button<{ $color: string; $active: boolean }>`
    width: 32px;
    height: 32px;
    border-radius: 50%;
    border: none;
    cursor: pointer;
    background: ${(p) => p.$color};
    box-shadow: ${(p) =>
        p.$active
            ? '0 0 0 2px #fff, 0 0 0 4.5px #1d1d1d, 0 2px 6px rgba(0,0,0,0.25)'
            : 'inset 0 0 0 1px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0,0,0,0.14)'};
    transition: transform 0.16s cubic-bezier(0.2, 0.8, 0.3, 1);
    -webkit-tap-highlight-color: transparent;

    &:hover {
        transform: scale(1.18);
    }
    &:active {
        transform: scale(1);
    }
`

const Divider = styled.div`
    height: 1px;
    margin: 13px -2px 11px;
    background: rgba(0, 0, 0, 0.09);
`

const SizeRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
`

const SizeBtn = styled.button<{ $active: boolean }>`
    width: 38px;
    height: 32px;
    border-radius: 10px;
    border: none;
    cursor: pointer;
    display: grid;
    place-items: center;
    background: ${(p) => (p.$active ? '#1d1d1d' : 'rgba(0, 0, 0, 0.05)')};
    color: ${(p) => (p.$active ? '#fff' : '#1d1d1d')};
    transition: background 0.16s ease, transform 0.16s ease;
    -webkit-tap-highlight-color: transparent;

    &:hover {
        transform: translateY(-1px);
        background: ${(p) => (p.$active ? '#1d1d1d' : 'rgba(0, 0, 0, 0.1)')};
    }
`

const Pip = styled.span<{ $d: number }>`
    width: ${(p) => p.$d}px;
    height: ${(p) => p.$d}px;
    border-radius: 50%;
    background: currentColor;
`

const EmojiGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(6, 46px);
    gap: 7px;
    max-width: calc(100vw - 52px);

    @media (max-width: 380px) {
        grid-template-columns: repeat(5, 46px);
    }
`

const EmojiCell = styled.button<{ $active: boolean }>`
    width: 46px;
    height: 46px;
    border-radius: 13px;
    border: none;
    cursor: pointer;
    font-size: 27px;
    line-height: 1;
    display: grid;
    place-items: center;
    background: ${(p) => (p.$active ? 'rgba(0, 0, 0, 0.09)' : 'rgba(255, 255, 255, 0.55)')};
    box-shadow: ${(p) =>
        p.$active
            ? 'inset 0 0 0 2px #1d1d1d, 0 2px 6px rgba(0,0,0,0.14)'
            : 'inset 0 0 0 1px rgba(0,0,0,0.05), 0 1px 3px rgba(0,0,0,0.1)'};
    transition: transform 0.16s cubic-bezier(0.2, 0.8, 0.3, 1), background 0.16s ease,
        box-shadow 0.16s ease;
    -webkit-tap-highlight-color: transparent;

    &:hover {
        transform: translateY(-3px) rotate(-7deg) scale(1.1);
        box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.05), 0 8px 16px rgba(0, 0, 0, 0.18);
        z-index: 1;
    }
    &:active {
        transform: translateY(-1px) scale(1.02);
    }
`

interface Props {
    tool: WallTool
    setTool: (t: WallTool) => void
    color: TLDefaultColorStyle
    setColor: (c: TLDefaultColorStyle) => void
    size: TLDefaultSizeStyle
    setSize: (s: TLDefaultSizeStyle) => void
    sticker: string
    setSticker: (s: string) => void
}

const Toolbar = ({ tool, setTool, color, setColor, size, setSize, sticker, setSticker }: Props) => {
    const [open, setOpen] = React.useState<WallTool | null>(null)
    const dockRef = React.useRef<HTMLDivElement>(null)

    const currentHex = PEN_COLORS.find((c) => c.name === color)?.hex ?? '#1d1d1d'

    // Close the picker on outside click / Escape.
    React.useEffect(() => {
        if (!open) return
        const onDown = (e: PointerEvent) => {
            if (dockRef.current && !dockRef.current.contains(e.target as Node)) setOpen(null)
        }
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setOpen(null)
        }
        document.addEventListener('pointerdown', onDown)
        document.addEventListener('keydown', onKey)
        return () => {
            document.removeEventListener('pointerdown', onDown)
            document.removeEventListener('keydown', onKey)
        }
    }, [open])

    // Hovering a tool reveals its submenu; clicking it also makes it the active
    // tool. Leaving the dock closes whatever is open.
    const openMenu = (t: WallTool) => setOpen(t)
    const activate = (t: WallTool) => {
        setTool(t)
        setOpen(t)
    }

    // Pen and text share one ink (colour + size) submenu; whichever tool's menu
    // is open is the one a colour/size choice activates.
    const inkOpen = open === 'draw' || open === 'text'
    const inkTool: WallTool = open === 'text' ? 'text' : 'draw'

    return (
        <Dock ref={dockRef} onMouseLeave={() => setOpen(null)}>
            {inkOpen && (
                <Popover role="dialog" aria-label="Ink options">
                    <ColorGrid>
                        {PEN_COLORS.map((c) => (
                            <Swatch
                                key={c.name}
                                $color={c.hex}
                                $active={c.name === color}
                                onClick={() => {
                                    setColor(c.name)
                                    setTool(inkTool)
                                }}
                                aria-label={`ink ${c.name}`}
                            />
                        ))}
                    </ColorGrid>
                    <Divider />
                    <SizeRow>
                        {SIZES.map((s) => (
                            <SizeBtn
                                key={s.key}
                                $active={s.key === size}
                                onClick={() => {
                                    setSize(s.key)
                                    setTool(inkTool)
                                }}
                                aria-label={`size ${s.key}`}
                            >
                                <Pip $d={s.dot} />
                            </SizeBtn>
                        ))}
                    </SizeRow>
                </Popover>
            )}

            {open === 'sticker' && (
                <Popover role="dialog" aria-label="Sticker options">
                    <EmojiGrid>
                        {STICKERS.map((s) => (
                            <EmojiCell
                                key={s}
                                $active={s === sticker}
                                onClick={() => {
                                    setSticker(s)
                                    setTool('sticker')
                                    setOpen(null)
                                }}
                                aria-label={`sticker ${s}`}
                            >
                                {s}
                            </EmojiCell>
                        ))}
                    </EmojiGrid>
                </Popover>
            )}

            <Bar>
                <ToolBtn
                    $active={tool === 'draw'}
                    onMouseEnter={() => openMenu('draw')}
                    onClick={() => activate('draw')}
                    aria-label="Pen"
                >
                    <PenTile $color={currentHex}>
                        <Pencil size={21} strokeWidth={2.4} />
                    </PenTile>
                </ToolBtn>
                <ToolBtn
                    $active={tool === 'text'}
                    onMouseEnter={() => openMenu('text')}
                    onClick={() => activate('text')}
                    aria-label="Text"
                >
                    <GlyphTile>
                        <Type size={21} strokeWidth={2.6} />
                    </GlyphTile>
                </ToolBtn>
                <ToolBtn
                    $active={tool === 'sticker'}
                    onMouseEnter={() => openMenu('sticker')}
                    onClick={() => activate('sticker')}
                    aria-label="Stickers"
                >
                    <EmojiTile>{sticker}</EmojiTile>
                </ToolBtn>
            </Bar>
        </Dock>
    )
}

export default Toolbar

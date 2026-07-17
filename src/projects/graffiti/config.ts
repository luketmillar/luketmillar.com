import type { TLDefaultColorStyle, TLDefaultSizeStyle } from 'tldraw'

export const BG = '#ffffff' // plain white wall

// Pen palette. `name` is the tldraw color style; `hex` is only for the swatch
// UI (matched to tldraw's light theme so the swatch looks like the ink).
export const PEN_COLORS: { name: TLDefaultColorStyle; hex: string }[] = [
    { name: 'black', hex: '#1d1d1d' },
    { name: 'red', hex: '#e03131' },
    { name: 'orange', hex: '#e16919' },
    { name: 'yellow', hex: '#f1ac4b' },
    { name: 'green', hex: '#099268' },
    { name: 'light-green', hex: '#4cb05e' },
    { name: 'blue', hex: '#4465e9' },
    { name: 'light-blue', hex: '#4dabf7' },
    { name: 'violet', hex: '#ae3ec9' },
    { name: 'white', hex: '#ffffff' },
]

// Pen weights, mapped to tldraw's larger size tiers (m / l / xl) so even the
// smallest pen is chunky. `dot` is the size preview shown in the toolbar.
export const SIZES: { key: TLDefaultSizeStyle; dot: number }[] = [
    { key: 'm', dot: 9 },
    { key: 'l', dot: 15 },
    { key: 'xl', dot: 23 },
]

// Middle weight, used as the default.
export const DEFAULT_SIZE: TLDefaultSizeStyle = 'l'

export const STICKERS = [
    '💥', '⭐️', '🔥', '💀', '👽', '👾', '🤖', '🦄',
    '🌈', '☮️', '❤️', '😎', '🤘', '✌️', '👑', '🍕',
    '🌸', '🍄', '⚡️', '💯', '🎨', '🛹', '🚀', '🐛',
]

export type SizeKey = TLDefaultSizeStyle

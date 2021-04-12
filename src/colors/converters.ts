
export const rgbToHex = (rgb: readonly number[]): string => {
    const [r, g, b] = rgb
    const hexValue = [r, g, b]
        .map(value => {
            value = Math.floor(value)
            const hex = value.toString(16)
            return hex.length === 1 ? '0' + hex : hex
        })
        .join('')
    return '#' + hexValue.toUpperCase()
}

const shorthandHex = /^#?([a-f\d])([a-f\d])([a-f\d])([a-f\d])?$/i
const longhandHex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})?$/i
export const hexToRgb = (hex: string) => {
    hex = hex.replace(shorthandHex, (m, r, g, b) => {
        return r + r + g + g + b + b
    })
    const result = longhandHex.exec(hex)
    if (!result) {
        throw new Error(`invalid hex color: ${hex}`)
    }
    return [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)]
}

export const rgbToHsv = (rgba: readonly number[]): number[] => {
    // convert rgb to hue saturation and value. value is the dominant rgb value.
    let [r, g, b] = rgba
    r = r / 255
    g = g / 255
    b = b / 255

    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    const v = max
    const d = max - min
    const s = max === 0 ? 0 : d / max
    let h

    if (max === min) {
        h = 0
    } else {
        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0)
                break
            case g:
                h = (b - r) / d + 2
                break
            case b:
            default:
                h = (r - g) / d + 4
                break
        }

        h /= 6
    }

    return [h, s, v]
}

export const hsvToRgb = (hsv: readonly number[]): number[] => {
    const [h, s, v] = hsv
    let r, g, b

    const i = Math.floor(h * 6)
    const f = h * 6 - i
    const p = v * (1 - s)
    const q = v * (1 - f * s)
    const t = v * (1 - (1 - f) * s)

    switch (i % 6) {
        case 0:
            r = v
            g = t
            b = p
            break
        case 1:
            r = q
            g = v
            b = p
            break
        case 2:
            r = p
            g = v
            b = t
            break
        case 3:
            r = p
            g = q
            b = v
            break
        case 4:
            r = t
            g = p
            b = v
            break
        case 5:
        default:
            r = v
            g = p
            b = q
            break
    }

    return [Math.floor(r * 255), Math.floor(g * 255), Math.floor(b * 255)]
}
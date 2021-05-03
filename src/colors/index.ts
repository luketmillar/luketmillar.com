import * as ColorConverters from './converters'

const orange = '#FF5B00'
const aqua = '#00CCFF'
const pink = '#D11DE1'
const purple = '#9013fe'
const red = '#CF250F'

const s = {
    aqua,
    orange,
    pink,
    purple,
    red,
    hexToRgb: ColorConverters.hexToRgb,
    rgbToHex: ColorConverters.rgbToHex,
    hexToHsv: (hex: string) => ColorConverters.rgbToHsv(ColorConverters.hexToRgb(hex)),
    hsvToHex: (hsv: number[]) => ColorConverters.rgbToHex(ColorConverters.hsvToRgb(hsv))
}

export default s
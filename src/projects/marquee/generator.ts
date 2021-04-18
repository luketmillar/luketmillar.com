import { duplicate } from './utils'

export const emptyLayout = (width: number, height: number) => {
    return duplicate(() => emptyRow(width), height)
}
export const emptyRow = (width: number) => {
    return duplicate(() => ' ', width)
}
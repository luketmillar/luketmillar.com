import * as generator from './generator'

export default class LayoutManager {
    public layout: string[]
    constructor(layout: string[]) {
        this.layout = layout
    }
    public addRow = (index: number) => {
        const layout = this.layout
        this.layout = [...layout.slice(0, index), generator.emptyRow(this.columns), ...layout.slice(index)]
        return this.layout
    }
    public addColumn = (index: number) => {
        const layout = this.layout
        this.layout = layout.map(row => row.slice(0, index) + ' ' + row.slice(index))
        return this.layout
    }
    public subtractRow = (index: number) => {
        const layout = this.layout
        this.layout = [...layout.slice(0, index), ...layout.slice(index + 1)]
        return this.layout
    }
    public subtractColumn = (index: number) => {
        const layout = this.layout
        this.layout = layout.map(row => row.slice(0, index) + row.slice(index + 1))
        return this.layout
    }
    public reset = () => {
        this.layout = generator.emptyLayout(this.columns, this.rows)
        return this.layout
    }

    public replaceCharacter = (row: number, column: number, character: string) => {
        let line = this.layout[row]
        const updatedRow = line.slice(0, column) + character + line.slice(column + 1)
        return this.replaceRow(row, updatedRow)
    }

    public replaceRow = (row: number, line: string) => {
        this.layout = [...this.layout.slice(0, row), line, ...this.layout.slice(row + 1)]
        return this.layout
    }

    public get rows() {
        return this.layout.length
    }
    public get columns() {
        return this.layout[0].length
    }
}
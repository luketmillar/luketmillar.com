import * as generator from './generator'
import { Layout } from './layout'

export default class LayoutManager {
    public layout: Layout
    private onChange?: (layout: Layout) => void
    constructor(layout: Layout) {
        this.layout = layout
    }
    public replaceLayout = (layout: Layout) => {
        this.layout = layout
    }
    public addRow = (index: number) => {
        this.setLayout([...this.layout.slice(0, index), generator.emptyRow(this.columns), ...this.layout.slice(index)])
    }
    public addColumn = (index: number) => {
        this.setLayout(this.layout.map(row => row.slice(0, index) + ' ' + row.slice(index)))
    }
    public subtractRow = (index: number) => {
        this.setLayout([...this.layout.slice(0, index), ...this.layout.slice(index + 1)])
    }
    public subtractColumn = (index: number) => {
        this.setLayout(this.layout.map(row => row.slice(0, index) + row.slice(index + 1)))
    }
    public reset = () => {
        this.setLayout(generator.emptyLayout(this.columns, this.rows))
    }

    public replaceCharacter = (row: number, column: number, character: string) => {
        let line = this.layout[row]
        const updatedRow = line.slice(0, column) + character + line.slice(column + 1)
        this.replaceRow(row, updatedRow)
    }

    public replaceRow = (row: number, line: string) => {
        this.setLayout([...this.layout.slice(0, row), line, ...this.layout.slice(row + 1)])
    }

    public setOnChange = (onChange: (layout: Layout) => void) => {
        this.onChange = onChange
    }

    private setLayout = (layout: Layout) => {
        this.layout = layout
        this.onChange?.(this.layout)
    }

    public get rows() {
        return this.layout.length
    }
    public get columns() {
        return this.layout[0].length
    }
}
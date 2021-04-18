const ID = {
    create: (row: number, column: number) => `${row}-${column}`,
    parse: (id: string | undefined) => {
        if (id === undefined) {
            return undefined
        }
        const values = id.split('-')
        if (values.length !== 2) {
            return undefined
        }
        try {
            const row = parseInt(values[0])
            const column = parseInt(values[1])
            return { row, column }
        } catch (err) {
            return undefined
        }

    }
}

export default class FocusManager {
    public static ID = ID
    private rows: number
    private columns: number
    constructor(rows: number, columns: number) {
        this.rows = rows
        this.columns = columns
    }
    public goLeft = () => {
        const cell = this.activeCell
        if (!cell) {
            return
        }
        if (cell.column === 0 && cell.row === 0) {
            this.focusCell(this.rows - 1, this.columns - 1)
            return
        }
        const nextCell = this.getCell(cell.row, cell.column - 1)
        if (nextCell) {
            nextCell.focus()
        } else {
            this.focusCell(cell.row - 1, this.columns - 1)
        }
    }
    public goRight = () => {
        const cell = this.activeCell
        if (!cell) {
            return
        }
        if (cell.column === this.columns - 1 && cell.row === this.rows - 1) {
            this.focusCell(0, 0)
            return
        }
        const nextCell = this.getCell(cell.row, cell.column + 1)
        if (nextCell) {
            nextCell.focus()
        } else {
            this.focusCell(cell.row + 1, 0)
        }
    }
    public goUp = () => {
        const cell = this.activeCell
        if (!cell) {
            return
        }

        const nextCell = this.getCell(cell.row - 1, cell.column)
        if (nextCell) {
            nextCell.focus()
        } else {
            this.focusCell(this.rows - 1, cell.column)
        }
    }
    public goDown = () => {
        const cell = this.activeCell
        if (!cell) {
            return
        }
        const nextCell = this.getCell(cell.row + 1, cell.column)
        if (nextCell) {
            nextCell?.focus()
        } else {
            this.focusCell(0, cell.column)
        }
    }

    public get activeCell() {
        return ID.parse(document.activeElement?.id)
    }
    public getCell = (row: number, column: number) => {
        return document.getElementById(ID.create(row, column))
    }
    public focusCell = (row: number, column: number) => {
        this.getCell(row, column)?.focus()
    }

    public handleKeyboardEvent = (character: string) => {
        switch (character) {
            case 'ArrowLeft':
                return this.goLeft()
            case 'ArrowRight':
                return this.goRight()
            case 'ArrowUp':
                return this.goUp()
            case 'ArrowDown':
                return this.goDown()
        }
    }

    public sizeChanged = (rows: number, columns: number) => {
        this.rows = rows
        this.columns = columns
    }
}

import EventEmitter from '../../hooks/EventEmitter'

type CellChange = {
    type: 'cell-change',
    payload: { row: number, column: number, isRevealed: boolean, isBomb: boolean }
}
type BoardChange = {
    type: 'board-change',
    payload: { rows: number, columns: number }
}
type Win = {
    type: 'win'
    payload: {}
}
type Lose = {
    type: 'lose',
    payload: {}
}

export default class GameBoard extends EventEmitter<CellChange | BoardChange | Win | Lose> {
    public readonly cells: boolean[]
    public readonly rows: number
    public readonly columns: number
    public readonly bombs: number
    public readonly revealState: boolean[]
    private done: boolean = false
    constructor(rows: number, columns: number, bombs: number) {
        super()
        this.rows = rows
        this.columns = columns
        this.bombs = bombs
        this.cells = create(rows, columns, bombs)
        console.log(this.cells)
        this.revealState = []
    }

    public isBomb = (row: number, column: number) => this.cells[this.getIndex(row, column)]
    public isRevealed = (row: number, column: number) => this.revealState[this.getIndex(row, column)]

    public reveal = (row: number, column: number) => {
        if (this.done) {
            return
        }
        const cell = this.getIndex(row, column)
        this.revealState[cell] = true
        this.emit('cell-change', { row, column, isRevealed: this.isRevealed(row, column), isBomb: this.isBomb(row, column) })
        if (this.isBomb(row, column)) {
            this.done = true
            this.cells.forEach((isBomb, index) => {
                if (!isBomb) {
                    return
                }
                const { row, column } = this.getPosition(index)
                this.emit('cell-change', { row, column, isBomb, isRevealed: true })
            })
            this.emit('lose', {})
        }
        if (!this.isBombOrBombNeighbor(row, column)) {
            setTimeout(() => {
                this.revealNeighbors(row, column)
            }, 50)
        }
        if (this.isComplete()) {
            this.emit('win', {})
            this.done = true
        }
    }

    public bombNeighborCount = (row: number, column: number) => {
        const neighbors = this.getNeighbors(row, column)
        return neighbors.filter(cell => this.isBomb(cell.row, cell.column)).length
    }

    private revealNeighbors = (row: number, column: number) => {
        const neighbors = this.getNeighbors(row, column)
        neighbors
            .filter(cell => !this.isRevealed(cell.row, cell.column))
            .filter(cell => !this.isBomb(cell.row, cell.column))
            .forEach(cell => {
                this.reveal(cell.row, cell.column)
            })
    }

    private getNeighbors = (row: number, column: number) => {
        const north = { row: row - 1, column }
        const south = { row: row + 1, column }
        const east = { row, column: column - 1 }
        const west = { row, column: column + 1 }
        const northWest = { row: north.row, column: west.column }
        const northEast = { row: north.row, column: east.column }
        const southWest = { row: south.row, column: west.column }
        const southEast = { row: south.row, column: east.column }
        const neighbors = [north, south, east, west, northWest, northEast, southWest, southEast]
        return neighbors.filter(cell => this.isValid(cell.row, cell.column))
    }

    private getIndex = (row: number, column: number) => row * this.columns + column
    private getPosition = (index: number) => {
        return {
            row: Math.floor(index / this.columns),
            column: index % this.columns
        }
    }

    private isValid = (row: number, column: number) => {
        if (row < 0 || column < 0) {
            return false
        }
        if (row >= this.rows || column >= this.columns) {
            return false
        }
        return true
    }

    private isBombOrBombNeighbor = (row: number, column: number) => {
        if (this.isBomb(row, column)) {
            return true
        }
        const neighbors = this.getNeighbors(row, column)
        return neighbors.some(cell => this.isBomb(cell.row, cell.column))
    }

    private isComplete = () => {
        console.log(this.cells, this.revealState)
        for (let i = 0; i < this.cells.length; i++) {
            const isBomb = this.cells[i]
            const isRevealed = this.revealState[i] === true
            if (!!isBomb === !!isRevealed) {
                return false
            }
        }
        console.log('yes')
        return true
    }
}

const create = (rows: number, columns: number, bombs: number): boolean[] => {
    const board: boolean[] = []
    const cellCount = rows * columns
    for (let i = 0; i < cellCount; i++) {
        board.push(i < bombs)
    }
    for (let i = 0; i < cellCount; i++) {
        const randomPosition = Math.floor(Math.random() * (cellCount - i))
        const current = board[i]
        board[i] = board[randomPosition]
        board[randomPosition] = current
    }
    return board
}
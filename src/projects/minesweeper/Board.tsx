import React from 'react'
import Cell from './Cell'
import { useBoard } from './GameContext'

const Spacing = 8

const arrayOf = (n: number) => Array.from(new Array(n))

const Board = () => {
    const board = useBoard()
    return <div>
        {arrayOf(board.rows).map((_, row) => <>
            {row > 0 && <div style={{ height: Spacing }} />}
            <Row index={row} columns={board.columns} />
        </>)}
    </div>
}


const Row = ({ index, columns }: { index: number; columns: number }) => {
    return <div style={{ display: 'flex' }}>
        {arrayOf(columns).map((_, column) => <>
            {column > 0 && <div style={{ width: Spacing }} />}
            <Cell row={index} column={column} />
        </>)}
    </div>

}

export default Board
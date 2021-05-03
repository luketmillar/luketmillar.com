import React from 'react'
import styled from 'styled-components'
import { useBoard } from './GameContext'
import Bomb from './bomb'
import Colors from 'colors'

const getCellColor = (row: number, column: number, rows: number, columns: number) => {
    return Colors.purple
}

const Cell = styled.div`
    width: 50px;
    height: 50px;

    border-radius: 5px;

    display: flex;
    align-items: center;
    justify-content: center;
`

const UnrevealedCell = styled(Cell) <{ isFlagged: boolean }>`
    background-color: ${props => props.isFlagged ? Colors.aqua : '#444'};
    :hover {
        opacity: 0.9;
    }
    :active {
        opacity: 0.8;
    }
`
const RevealedCell = styled(Cell) <{ isBomb?: boolean }>`
    background-color: ${props => props.isBomb ? Colors.red : '#111'};
`


interface IProps {
    row: number
    column: number
}
const CellContainer = ({ row, column }: IProps) => {
    const board = useBoard()
    const [revealed, setRevealed] = React.useState(board.isRevealed(row, column))
    const [flagged, setFlagged] = React.useState(false)
    React.useEffect(() => {
        board.on('cell-change', (event) => {
            if (event.row !== row || event.column !== column) {
                return
            }
            setRevealed(event.isRevealed)
        })
    }, [row, column, board])

    return <StatefulCell
        onFlag={() => setFlagged(f => !f)}
        onReveal={() => board.reveal(row, column)}
        row={row}
        column={column}
        isRevealed={revealed}
        isFlagged={flagged}
    />
}

const StatefulCell = ({ row, column, isRevealed, isFlagged, onReveal, onFlag }: IProps & { onFlag: () => void, isRevealed: boolean, isFlagged: boolean, onReveal: () => void }) => {
    if (isRevealed) {
        return <RevealedStatus row={row} column={column} />
    } else {
        return <UnrevealedCell isFlagged={isFlagged} onClick={() => {
            if (isFlagged) {
                onFlag()
            } else {
                onReveal()
            }
        }} onContextMenu={e => {
            e.preventDefault()
            onFlag()
        }} />
    }
}

const RevealedStatus = ({ row, column }: { row: number, column: number }) => {
    const board = useBoard()
    const count = board.bombNeighborCount(row, column)
    const isBomb = board.isBomb(row, column)
    if (isBomb) {
        return <RevealedCell isBomb><Bomb /></RevealedCell>
    }
    return <RevealedCell>{count ? count : null}</RevealedCell>
}

export default CellContainer
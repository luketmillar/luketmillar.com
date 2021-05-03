import React from 'react'
import Board from './Board'
import { Provider } from './GameContext'
import * as config from './config'
import GameBoard from './Model'

const Minesweeper = () => {
    const board = React.useMemo(() => new GameBoard(config.Rows, config.Columns, config.Bombs), [])
    const [won, setWon] = React.useState(false)
    const [lost, setLost] = React.useState(false)
    React.useEffect(() => {
        const offWin = board.on('win', () => setWon(true))
        const offLose = board.on('lose', () => setLost(true))
        return () => {
            offWin()
            offLose()
        }
    }, [board])
    return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <div>
            <h1 style={{ textAlign: 'center' }}>{won ? <h1>You won</h1> : lost ? <h1>You lose</h1> : 'Minesweeper'}</h1>
            <div style={{ height: 24 }} />
            <Provider value={board}>
                <Board />
            </Provider>
        </div>
    </div>
}

export default Minesweeper
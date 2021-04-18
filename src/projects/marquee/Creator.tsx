import React from 'react'
import Board from './Board'
import * as generator from './generator'
import { replaceCharacter } from './utils'

const onComplete = () => null
const size = { width: 50, height: 75 }

interface IProps {
    onCreate: (messages: string[]) => void
}
const Creator = ({ onCreate }: IProps) => {
    const [layout, setLayout] = React.useState(generator.emptyLayout(10, 5))
    const height = layout.length
    const width = layout[0].length
    const handleCharacterChange = React.useCallback((row: number, column: number, character: string) => {
        let line = layout[row]
        if (character === 'Backspace') {
            line = replaceCharacter(line, column, ' ')
        } else {
            line = replaceCharacter(line, column, character)
        }
        layout[row] = line
        // go right
        const newColumn = Math.min(column + 1, width - 1)
        document.getElementById(`${row}-${newColumn}`)?.focus()

        setLayout([...layout])
    }, [layout, width])

    const addRow = (index: number) => {
        setLayout([...layout.slice(0, index), generator.emptyRow(width), ...layout.slice(index)])
    }
    const addColumn = (index: number) => {
        const newLayout = layout.map(row => {
            return row.slice(0, index) + ' ' + row.slice(index)
        })
        setLayout(newLayout)
    }

    const handleKeyboardEvent = React.useCallback((row: number, column: number, character: string) => {
        switch (character) {
            case 'Backspace': {
                layout[row] = replaceCharacter(layout[row], column, ' ')
                setLayout([...layout])
                const newColumn = Math.max(column - 1, 0)
                document.getElementById(`${row}-${newColumn}`)?.focus()
                return
            }
            case 'ArrowLeft': {
                const newColumn = Math.max(column - 1, 0)
                document.getElementById(`${row}-${newColumn}`)?.focus()
                return
            }
            case 'ArrowRight': {
                const newColumn = Math.min(column + 1, width - 1)
                document.getElementById(`${row}-${newColumn}`)?.focus()
                return
            }
            case 'ArrowUp': {
                const newRow = Math.max(row - 1, 0)
                document.getElementById(`${newRow}-${column}`)?.focus()
                return
            }
            case 'ArrowDown': {
                const newRow = Math.min(row + 1, height - 1)
                document.getElementById(`${newRow}-${column}`)?.focus()
                return
            }
        }
    }, [layout, height, width])

    const reset = () => {
        setLayout(generator.emptyLayout(width, height))
    }

    return <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div onClick={reset}>Reset</div>
        <div onClick={() => addRow(0)}>
            <h1 style={{ width: 80, textAlign: 'center' }}>+</h1>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <h1 onClick={() => addColumn(0)} style={{ width: 80, textAlign: 'center' }}>+</h1>
            <div>
                <Board editor onChangeMessage={handleCharacterChange} onKeyboardNavigation={handleKeyboardEvent} messageLayout={layout} cellSize={size} onComplete={onComplete} />
            </div>
            <h1 onClick={() => addColumn(width)} style={{ width: 80, textAlign: 'center' }}>+</h1>
        </div>
        <div onClick={() => addRow(height)}>
            <h1 style={{ width: 80, textAlign: 'center' }}>+</h1>
        </div>
    </div>
}

export default Creator
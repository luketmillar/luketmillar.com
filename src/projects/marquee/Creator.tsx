import React from 'react'
import styled from 'styled-components'
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
    const subtractRow = (index: number) => {
        setLayout([...layout.slice(0, index), ...layout.slice(index + 1)])
    }
    const subtractColumn = (index: number) => {
        const newLayout = layout.map(row => {
            return row.slice(0, index) + row.slice(index + 1)
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
        <Button onClick={reset}>Reset</Button>
        <div style={{ height: 12 }} />
        <AddSubtract onAdd={() => addRow(0)} onSubtract={() => subtractRow(0)} />
        <div style={{ height: 12 }} />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <AddSubtract onAdd={() => addColumn(0)} onSubtract={() => subtractColumn(0)} style={{ flexDirection: 'column' }} />
            <div style={{ width: 12 }} />
            <div>
                <Board editor onChangeMessage={handleCharacterChange} onKeyboardNavigation={handleKeyboardEvent} messageLayout={layout} cellSize={size} onComplete={onComplete} />
            </div>
            <div style={{ width: 12 }} />
            <AddSubtract onAdd={() => addColumn(width)} onSubtract={() => subtractColumn(width - 1)} style={{ flexDirection: 'column' }} />
        </div>
        <div style={{ height: 12 }} />
        <AddSubtract onAdd={() => addRow(height)} onSubtract={() => subtractRow(height - 1)} />
    </div>
}

const AddSubtract = ({ onAdd, onSubtract, style }: { onAdd: () => void, onSubtract: () => void, style?: React.CSSProperties }) => (
    <div style={{ display: 'flex', ...style }}>
        <Add onClick={onAdd} />
        <div style={{ width: 8, height: 8 }} />
        <Subtract onClick={onSubtract} />
    </div>)

const Add = ({ onClick }: { onClick: () => void }) => <AddPlusButton onClick={onClick}>+</AddPlusButton>
const Subtract = ({ onClick }: { onClick: () => void }) => <AddPlusButton onClick={onClick}>-</AddPlusButton>

const Button = styled.button`
    background-color: #111;
    border: none;
    border-radius: 5px;
    color: white;

    padding: 10px 18px;

    font-size: 18px;
    font-weight: 700;
    
    :hover {
        background-color: #222;
    }
`

const AddPlusButton = styled(Button)`
    font-size: 36px;
    font-weight: 900;
`

export default Creator
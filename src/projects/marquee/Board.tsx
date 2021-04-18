import React from 'react'
import SplitFlap from './SplitFlap'
import { Layout } from './layout'
import { characterList } from './characters'
import { duplicate } from './utils'

const keyboardEvents = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Backspace']

interface IProps {
    messageLayout: Layout
    cellSize: { width: number, height: number }
    editor?: boolean
    onChangeMessage?: (row: number, column: number, character: string) => void
    onKeyboardNavigation?: (row: number, column: number, character: string) => void
    onComplete: () => void
}
const Board = ({ messageLayout, cellSize, onComplete, onChangeMessage, onKeyboardNavigation, editor }: IProps) => {
    const completion = React.useMemo(() => new CompletionTracker(onComplete), [onComplete])

    React.useMemo(() => {
        completion.start()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [completion, messageLayout])


    const height = messageLayout.length
    const width = messageLayout[0].length

    const center = Math.floor(width / 2)

    const onCellKeyDown = (row: number, column: number, e: React.KeyboardEvent) => {
        const character = e.key?.toUpperCase()
        if (characterList.includes(character)) {
            onChangeMessage?.(row, column, character)
        } else if (keyboardEvents.includes(e.key)) {
            onKeyboardNavigation?.(row, column, e.key)
        }
    }

    return <div>
        {duplicate((row: number) => (
            <div key={`row-${row}`} style={{ display: 'flex' }}>
                {duplicate((column: number) => (
                    <SplitFlap
                        key={`column-${column}`}
                        delay={editor ? 0 : Math.abs(center - column) * 5}
                        character={messageLayout[row][column]}
                        onStart={completion.cellStart}
                        onComplete={completion.cellComplete}
                        size={cellSize}
                        selectable={editor}
                        onKeyDown={onChangeMessage ? e => onCellKeyDown(row, column, e) : undefined}
                        row={row}
                        column={column}
                    />
                ), width)}
            </div>), height)}</div>
}

class CompletionTracker {
    private readonly onComplete: () => void
    private incompleteCount = 0
    constructor(onComplete: () => void) {
        this.onComplete = onComplete
    }

    public start() {
        this.incompleteCount = 0
    }

    public cellStart = () => {
        this.incompleteCount++
    }
    public cellComplete = () => {
        this.incompleteCount--
        if (this.incompleteCount === 0) {
            this.onComplete()
        }
    }
}

export default Board
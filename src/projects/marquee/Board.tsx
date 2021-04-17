import React from 'react'
import SplitFlap from './SplitFlap'
import { Layout } from './layout'

const duplicate = (x: (i: number) => React.ReactNode, n: number) => Array.from(new Array(n), (_, i) => x(i))

interface IProps {
    messageLayout: Layout
    onComplete: () => void
}
const Board = ({ messageLayout, onComplete }: IProps) => {
    const completion = React.useMemo(() => new CompletionTracker(onComplete), [onComplete])

    React.useMemo(() => {
        completion.start()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [completion, messageLayout])


    const height = messageLayout.length
    const width = messageLayout[0].length

    const center = Math.floor(width / 2)
    return <div>
        {duplicate((row: number) => (
            <div key={`row-${row}`} style={{ display: 'flex' }}>
                {duplicate((column: number) => (
                    <SplitFlap
                        key={`column-${column}`}
                        delay={Math.abs(center - column) * 5}
                        character={messageLayout[row][column]}
                        onStart={completion.cellStart}
                        onComplete={completion.cellComplete}
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
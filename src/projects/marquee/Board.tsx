import React from 'react'
import SplitFlap from './SplitFlap'
import { getLayout } from './layout'

const duplicate = (x: (i: number) => React.ReactNode, n: number) => Array.from(new Array(n), (_, i) => x(i))

interface IProps {
    message: string
    width: number
    height: number
}
const Board = ({ message, width, height }: IProps) => {
    const layout = React.useMemo(() => getLayout(message, width, height), [message, width, height])
    const center = Math.floor(width / 2)
    return <div>
        {duplicate((row: number) => (
            <div key={`row-${row}`} style={{ display: 'flex' }}>
                {duplicate((column: number) => (
                    <SplitFlap
                        key={`column-${column}`}
                        distanceFromCenter={Math.abs(center - column)}
                        character={layout[`${row}-${column}`] ?? ' '}
                    />
                ), width)}
            </div>), height)}</div>
}

export default Board
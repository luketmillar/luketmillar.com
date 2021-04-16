import React from 'react'
import SplitFlap from './SplitFlap'

const duplicate = (x: (i: number) => React.ReactNode, n: number) => Array.from(new Array(n), (_, i) => x(i))

interface IProps {
    message: string
    width: number
    height: number
}
const Board = ({ message, width, height }: IProps) => {
    const characters = getCharacterPositions(message, width, height)
    console.log(characters)
    return <div>
        {duplicate((row: number) => (
            <div style={{ display: 'flex' }}>
                {duplicate((column: number) => (
                    <SplitFlap character={`${characters.find(character => character.row === row && character.column === column)?.character ?? ' '}`} />
                ), width)}
            </div>), height)}</div>
}

const getCharacterPositions = (message: string, width: number, height: number) => {
    const row = Math.floor((height - 1) / 2)
    const columnStart = Math.floor((width - message.length) / 2)
    return message.split('').map((character, i) => {
        return { character, row, column: columnStart + i }
    })
}

export default Board
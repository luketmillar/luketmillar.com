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
    return <div>
        {duplicate((row: number) => (
            <div style={{ display: 'flex' }}>
                {duplicate((column: number) => (
                    <SplitFlap character={`${characters.find(character => character.row === row && character.column === column)?.character ?? ' '}`} />
                ), width)}
            </div>), height)}</div>
}

const getCharacterPositions = (message: string, width: number, height: number) => {
    if (message.length > width) {
        const middleSpace = findClosestSpace(message, Math.floor(message.length / 2))
        const lines = [message.slice(0, middleSpace).trim(), message.slice(middleSpace + 1).trim()]
        const rowStart = Math.floor((height - lines.length) / 2)
        return lines.map((line, i) => {
            const row = rowStart + i
            const columnStart = Math.floor((width - line.length) / 2)
            return line.split('').map((character, i) => {
                return { character, row, column: columnStart + i }
            })
        }).reduce((result, line) => ([...result, ...line]), [])
    } else {
        const row = Math.floor((height - 1) / 2)
        const columnStart = Math.floor((width - message.length) / 2)
        return message.split('').map((character, i) => {
            return { character, row, column: columnStart + i }
        })
    }
}

const findClosestSpace = (message: string, index: number, distance: number = 0): number => {
    const character = message[index]
    if (character === ' ') {
        return index
    }

    const leftIndex = index - distance
    const rightIndex = index + distance
    if (leftIndex < 0 && rightIndex >= message.length) {
        return -1
    }

    const leftCharacter = message[leftIndex]
    if (leftCharacter === ' ') {
        return leftIndex
    }

    const rightCharacter = message[rightIndex]
    if (rightCharacter === ' ') {
        return rightIndex
    }
    return findClosestSpace(message, index, distance + 1)
}


export default Board
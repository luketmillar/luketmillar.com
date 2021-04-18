import React from 'react'
import styled from 'styled-components'
import { getIndex, characterList } from "./characters"
import Colors from 'colors'

const Flap = styled.div<{ width: number, height: number }>`
    position: relative;

    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: 3px;
    background-color: #111;

    width: ${props => props.width}px;
    height: ${props => props.height}px;

    font-family: 'PT Sans Narrow';
    font-size: ${props => Math.min(props.width, props.height)}px;;
    font-weight: 300;

    margin-bottom: 10px;
    margin-right: 4px;

    ::after {
        content: '';
        position: absolute;
        bottom: calc(50% - 1px);
        width: 100%;
        height: 1px;
        background-color: #000;
    }

    border: 1px solid transparent;
    :focus, :active {
        border-color: ${Colors.aqua};
        outline: none;
    }
`

interface IProps {
    character: string
    row: number
    column: number
    onStart: () => void
    onComplete: () => void
    size: { width: number, height: number }
    selectable?: boolean
    onKeyDown?: React.KeyboardEventHandler
    onClick?: React.MouseEventHandler
    delay: number
}

const SplitFlap = ({ character, row, column, size, onStart, onComplete, onClick, delay, selectable, onKeyDown }: IProps) => {
    character = character.toLocaleUpperCase()
    const [displayCharacter, setDisplayCharacter] = React.useState(character)
    const displayCharacterRef = React.useRef(displayCharacter)

    React.useEffect(() => {
        let canceled = false
        const destinationIndex = getIndex(character)
        const goToNextCharacter = () => {
            if (canceled) {
                return
            }
            const currentIndex = getIndex(displayCharacterRef.current)
            const nextIndex = (currentIndex + 1) % characterList.length
            const nextCharacter = characterList[nextIndex]
            setDisplayCharacter(nextCharacter)
            if (nextIndex === destinationIndex) {
                onComplete()
            } else {
                skipFrames(2, goToNextCharacter)
            }
        }
        const currentIndex = getIndex(displayCharacterRef.current)
        if (currentIndex !== destinationIndex) {
            onStart()
            skipFrames(delay, goToNextCharacter)
        }
        return () => {
            canceled = true
        }
    }, [character, delay, onComplete, onStart])

    displayCharacterRef.current = displayCharacter
    return <Flap id={`${row}-${column}`} onKeyDown={onKeyDown} tabIndex={selectable ? 0 : undefined} width={size.width} height={size.height} onClick={onClick}>{displayCharacter}</Flap>
}

const skipFrames = (n: number, fn: () => void) => {
    if (n === 0) {
        return fn()
    }
    requestAnimationFrame(() => skipFrames(n - 1, fn))
}

export default React.memo(SplitFlap)
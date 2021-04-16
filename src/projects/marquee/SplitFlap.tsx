import React from 'react'
import styled from 'styled-components'
import { getIndex, characterList } from "./characters"

const Flap = styled.div`
    position: relative;

    display: flex;
    align-items: center;
    justify-content: center;

    border: 1px solid #222;
    border-radius: 3px;

    width: 50px;
    height: 75px;

    font-family: 'PT Sans Narrow';
    font-size: 3rem;
    font-weight: 700;

    margin-bottom: 4px;
    margin-right: 4px;
    

    ::after {
        content: '';
        position: absolute;
        bottom: calc(50% - 1px);
        width: 100%;
        height: 1px;
        background-color: #222;
    }
`

interface IProps {
    character: string
    onClick?: React.MouseEventHandler
}

const SplitFlap = ({ character, onClick }: IProps) => {
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
            if (nextIndex !== destinationIndex) {
                requestAnimationFrame(goToNextCharacter)
            }
        }
        const currentIndex = getIndex(displayCharacterRef.current)
        if (currentIndex !== destinationIndex) {
            requestAnimationFrame(goToNextCharacter)
        }
        return () => {
            canceled = true
        }
    }, [character])

    displayCharacterRef.current = displayCharacter
    return <Flap onClick={onClick}>{displayCharacter}</Flap>
}

export default SplitFlap
import React from 'react'
import { Position } from './types'
import * as Coordinates from './Coordinates'
import styled from 'styled-components'

const FullScreen = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
`

interface IProps {
    onClick: (position: Position) => void
    onMouseMove: (position: Position) => void
}
const InputHandler = ({ onClick, onMouseMove }: IProps) => {
    const handleClick = React.useCallback((e: React.MouseEvent) => {
        const position = Coordinates.screenToWorld({ x: e.clientX, y: e.clientY })
        onClick(position)
    }, [onClick])
    const handleMove = React.useCallback((e: React.MouseEvent) => {
        const position = Coordinates.screenToWorld({ x: e.clientX, y: e.clientY })
        onMouseMove(position)
    }, [onMouseMove])
    return <FullScreen onClick={handleClick} onMouseMove={handleMove} />
}

export default InputHandler
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
    onMouseUp?: (position: Position) => void
    onMouseDown?: (position: Position) => void
}
const InputHandler = ({ onClick, onMouseMove, onMouseUp, onMouseDown }: IProps) => {
    const handleClick = React.useCallback((e: React.MouseEvent) => {
        const position = Coordinates.screenToWorld({ x: e.clientX, y: e.clientY })
        onClick(position)
    }, [onClick])
    const handleMouseDown = React.useCallback((e: React.MouseEvent) => {
        const position = Coordinates.screenToWorld({ x: e.clientX, y: e.clientY })
        onMouseDown?.(position)
    }, [onMouseDown])
    React.useEffect(() => {
        const handleUp = (e: MouseEvent) => {
            const position = Coordinates.screenToWorld({ x: e.clientX, y: e.clientY })
            onMouseUp?.(position)
        }
        window.addEventListener('mouseup', handleUp)
        return () => window.removeEventListener('mouseup', handleUp)
    }, [onMouseUp])
    React.useEffect(() => {
        const handleMove = (e: MouseEvent) => {
            const position = Coordinates.screenToWorld({ x: e.clientX, y: e.clientY })
            onMouseMove(position)
        }
        window.addEventListener('mousemove', handleMove)
        return () => window.removeEventListener('mouseup', handleMove)
    }, [onMouseMove])
    return <FullScreen onClick={handleClick} onMouseDown={handleMouseDown} />
}

export default InputHandler
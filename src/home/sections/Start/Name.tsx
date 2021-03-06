import React from 'react'
import styled from 'styled-components'
import useFrameTime from '../../../hooks/useFrameTime'
import { WidescreenSelect } from '../../utils'
import Colors from '../../../colors'

const Name = styled.div<{ highlighted?: boolean, color: string }>`
  font-weight: 900;
  font-style: italic;
  font-size: 3rem;
  text-align: center;
  line-height: .9em;
  padding: 0 10px;

  color: ${props => props.highlighted ? props.color : 'white'};

  ${WidescreenSelect} {
    font-size: 8rem;
  }
`

const Shadow = styled(Name)`
    color: transparent;
    -webkit-text-stroke-width: 1px;
    -webkit-text-stroke-color: ${props => props.highlighted ? props.color : 'white'};
`

const AnimatedName = ({ onComplete }: { onComplete: (bottom: number) => void }) => {
    const parentRef = React.useRef<HTMLDivElement>(null)
    const centerRef = React.useRef<HTMLDivElement>(null)
    const [centerRect, setCenterRect] = React.useState<DOMRect | undefined>(undefined)
    React.useLayoutEffect(() => {
        const rect = centerRef.current!.getBoundingClientRect()
        setCenterRect(rect)
    }, [])
    const [isComplete, setComplete] = React.useState(false)
    const handleComplete = () => {
        setComplete(true)
        const parentRect = parentRef.current!.parentElement!.getBoundingClientRect()
        const rect = centerRef.current!.getBoundingClientRect()
        onComplete(rect.bottom - parentRect.top)
    }
    return (
        <div ref={parentRef} style={{ position: 'relative' }}>
            <Name color={'white'} style={{ visibility: isComplete ? 'visible' : 'hidden' }} ref={centerRef}>Luke Millar</Name>
            {centerRect && !isComplete && <ShadowTrail height={centerRect.height} onComplete={handleComplete} />}
        </div>
    )
}

const start = Colors.hexToRgb(Colors.orange)
const end = Colors.hexToRgb(Colors.purple)
const diff = [end[0] - start[0], end[1] - start[1], end[2] - start[2]]

const getColor = (percent: number) => {
    const h = start[0] + diff[0] * percent
    const s = start[1] + diff[1] * percent
    const v = start[2] + diff[2] * percent
    return Colors.rgbToHex([h, s, v])
}

const ShadowTrail = ({ height, onComplete }: { height: number, onComplete: () => void }) => {
    const trailCount = Math.floor(window.innerHeight / height / 2) + 1
    const positions = React.useMemo(() => {
        return getPositions(trailCount, height)
    }, [trailCount, height])
    const startTime = React.useMemo(() => performance.now(), []) + 500
    const frameTime = useFrameTime()
    const startRenderIndex = Math.floor((frameTime - startTime) / 50)
    const endRenderIndex = Math.floor((frameTime - positions.length * 50 - startTime) / 50)
    const complete = endRenderIndex > (trailCount * 2) + 2
    React.useEffect(() => {
        if (complete) {
            onComplete()
        }
    }, [complete, onComplete])
    const shadows: React.ReactNode[] = positions.map((position, i) => {
        const visible = i <= startRenderIndex && (i >= endRenderIndex || !position.isShadow)
        const highlighted = i === startRenderIndex
        const color = getColor(Math.min(i / (positions.length - 3), 1))
        if (position.isShadow) {
            return <Shadow key={i} color={color} highlighted={highlighted} style={{ opacity: visible ? 1 : 0, position: 'absolute', transform: `translateY(${position.y}px)` }}>Luke Millar</Shadow>
        } else {
            return <Name key={i} color={color} highlighted={highlighted} style={{ opacity: visible ? 1 : 0, position: 'absolute', transform: `translateY(${position.y}px)` }}>Luke Millar</Name>
        }
    })
    return <>
        {shadows}
    </>
}

type PositionProps = { y: number, isShadow: boolean }
const getPositions = (trailCount: number, height: number) => {
    const positions: PositionProps[] = []
    const firstPosition = -((trailCount + 1) * height)
    for (let i = 0; i < trailCount; i++) {
        const yPosition = firstPosition + height * i
        positions.push({ y: yPosition, isShadow: true })
    }
    positions.push({ y: -height, isShadow: false })
    for (let i = 0; i < trailCount; i++) {
        const yPosition = height * i
        positions.push({ y: yPosition, isShadow: true })
    }
    return positions
}

export default AnimatedName

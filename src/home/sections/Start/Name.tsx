import React from 'react'
import styled from 'styled-components'
import useFrameTime from '../../../hooks/useFrameTime'
import { WidescreenSelect } from '../../utils'

const Name = styled.div<{ highlighted?: boolean }>`
  font-weight: 900;
  font-style: italic;
  font-size: 3rem;
  text-align: center;
  line-height: .9em;

  color: ${props => props.highlighted ? 'orange' : 'white'};

  ${WidescreenSelect} {
    font-size: 8rem;
  }
`

const Shadow = styled(Name)`
    color: transparent;
    -webkit-text-stroke-width: 1px;
    -webkit-text-stroke-color: ${props => props.highlighted ? 'orange' : 'white'};
`

const AnimatedName = ({ onComplete }: { onComplete: (rect: DOMRect) => void }) => {
    const centerRef = React.useRef<HTMLDivElement>(null)
    const [centerRect, setCenterRect] = React.useState<DOMRect | undefined>(undefined)
    React.useLayoutEffect(() => {
        const rect = centerRef.current!.getBoundingClientRect()
        setCenterRect(rect)
    }, [])
    const [isComplete, setComplete] = React.useState(false)
    const handleComplete = () => {
        setComplete(true)
        onComplete(centerRect!)
    }
    return (
        <div style={{ position: 'relative' }}>
            <Name style={{ visibility: isComplete ? 'visible' : 'hidden' }} ref={centerRef}>Luke Millar</Name>
            {centerRect && !isComplete && <ShadowTrail height={centerRect.height} onComplete={handleComplete} />}
        </div>
    )
}

const ShadowTrail = ({ height, onComplete }: { height: number, onComplete: () => void }) => {
    const trailCount = Math.floor(window.innerHeight / height / 2) + 1
    const positions = React.useMemo(() => {
        return getPositions(trailCount, height)
    }, [trailCount, height])
    const frameTime = useFrameTime()
    const startRenderIndex = Math.floor((frameTime - 1000) / 50)
    const endRenderIndex = Math.floor((frameTime - positions.length * 50 - 1000) / 50)
    const complete = endRenderIndex > (trailCount * 2) + 2
    React.useEffect(() => {
        if (complete) {
            onComplete()
        }
    }, [complete, onComplete])
    const shadows: React.ReactNode[] = positions.map((position, i) => {
        const visible = i <= startRenderIndex && (i >= endRenderIndex || !position.isShadow)
        const highlighted = i === startRenderIndex
        if (position.isShadow) {
            return <Shadow key={i} highlighted={highlighted} style={{ visibility: visible ? 'visible' : 'hidden', position: 'absolute', transform: `translateY(${position.y}px)` }}>Luke Millar</Shadow>
        } else {
            return <Name key={i} highlighted={highlighted} style={{ visibility: visible ? 'visible' : 'hidden', position: 'absolute', transform: `translateY(${position.y}px)` }}>Luke Millar</Name>
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

import React from 'react'
import styled, { keyframes } from 'styled-components'
import { WidescreenSelect } from '../../utils'
import Colors from '../../../colors'

const textReveal = keyframes`
  from {
    clip-path: inset(0 100% 0 0);
  }
  to {
    clip-path: inset(0 0 0 0);
  }
`

const cursor = keyframes`
from {
    left: 0;
    width: 10px;
  }
  to {
    left: calc(100% + 20px);
    width: 400px;
  }
`
const CaptionText = styled.div<{ color: string }>`
  text-transform: uppercase;
  letter-spacing: 0.5em;
  margin-left: 0;
  font-size: 1rem;
  position: relative;
  color: ${props => props.color};

  animation: ${textReveal} 300ms ease-in;
  animation-fill-mode: forwards;
  overflow: hidden;
  ::after {
      content: '';
      display: inline-block;
      position: absolute;
      top: 0; left: 0; bottom: 0;
      background-color: #fff;
      animation: ${cursor} 400ms ease-in;
      animation-delay: 20ms;
      animation-fill-mode: forwards;
  }

  ${WidescreenSelect} {
        font-size: 2rem;
        margin-left: -200px;
  }
`

const captions = [
  'Engineer.',
  'Designer.',
  'Podcaster.'
]
const colors = [
  Colors.aqua,
  Colors.pink,
  Colors.purple,
]
const Caption = ({ onComplete }: { onComplete: () => void }) => {
  const [index, setIndex] = React.useState(0)
  React.useEffect(() => {
    const interval = setInterval(() => {
      setIndex(i => {
        const next = (i + 1) % captions.length
        if (next === 0) {
          requestAnimationFrame(() => {
            onComplete()
          })
          return i
        }
        return next
      })
    }, 2000)
    return () => {
      clearInterval(interval)
    }
  }, [onComplete])
  return <CaptionText color={colors[index]} key={index}>{captions[index]}</CaptionText>
}

export default Caption

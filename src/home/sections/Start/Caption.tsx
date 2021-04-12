import React from 'react'
import styled, { keyframes } from 'styled-components'
import { WidescreenSelect } from '../../utils'

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
    width: 0;
  }
  to {
    left: calc(100% + 20px);
    width: 400px;
  }
`
const CaptionText = styled.div`
  text-transform: uppercase;
  letter-spacing: 0.5em;
  margin-left: 0;
  font-size: 1rem;
  position: relative;

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
    'Diet Coke.',
    'Human.',
]
const Caption = () => {
    const [index, setIndex] = React.useState(0)
    React.useEffect(() => {
        const interval = setInterval(() => {
            setIndex(i => (i + 1) % captions.length)
        }, 2000)
        return () => {
            clearInterval(interval)
        }
    }, [])
    return <CaptionText key={index}>{captions[index]}</CaptionText>
}

export default Caption

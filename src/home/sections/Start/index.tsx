import React from 'react'
import Name from './Name'
import Container from '../container'
import Caption from './Caption'
import Explore from './Explore'
import styled from 'styled-components'

const StartContainer = styled(Container)`
  will-change: transform, opacity;
`

const Start = ({ scrollY }: { scrollY: number }) => {
  const ref = React.useRef<HTMLDivElement>(null)
  const [nameBottom, setNameBottom] = React.useState<number | undefined>(undefined)
  const [captionComplete, setCaptionComplete] = React.useState(false)

  const progress = scrollY / window.innerHeight
  const translateY = -scrollY * 0.5
  const scale = 1 + progress * 1.5
  const opacity = Math.max(1 - progress * 1.5, 0)

  return (
    <StartContainer
      ref={ref}
      style={{
        transform: `translateY(${translateY}px) scale(${scale})`,
        transformOrigin: 'center center',
        opacity,
      }}
    >
      <Name onComplete={setNameBottom} />
      {nameBottom && !captionComplete && <div style={{ position: 'absolute', top: nameBottom }}><Caption onComplete={() => setCaptionComplete(true)} /></div>}
      {captionComplete && <div style={{ position: 'absolute', bottom: 150 }}><Explore /></div>}
    </StartContainer>
  )
}

export default Start

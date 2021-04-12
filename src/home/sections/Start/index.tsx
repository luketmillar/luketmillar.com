import React from 'react'
import Name from './Name'
import Container from '../container'
import Caption from './Caption'
import Explore from './Explore'
import styled from 'styled-components'

const StartContainer = styled(Container)`
`

const Start = () => {
  const ref = React.useRef<HTMLDivElement>(null)
  const [nameRect, setNameRect] = React.useState<DOMRect | undefined>(undefined)
  const [captionComplete, setCaptionComplete] = React.useState(false)
  return (
    <StartContainer ref={ref}>
      <Name onComplete={setNameRect} />
      {nameRect && !captionComplete && <div style={{ position: 'absolute', top: nameRect.bottom - ref.current!.getBoundingClientRect().top }}><Caption onComplete={() => setCaptionComplete(true)} /></div>}
      {captionComplete && <div style={{ position: 'absolute', bottom: 150 }}><Explore /></div>}
    </StartContainer>
  )
}

export default Start

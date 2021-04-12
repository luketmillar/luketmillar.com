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
  const [nameBottom, setNameBottom] = React.useState<number | undefined>(undefined)
  const [captionComplete, setCaptionComplete] = React.useState(false)
  console.log(nameBottom)
  return (
    <StartContainer ref={ref}>
      <Name onComplete={setNameBottom} />
      {nameBottom && !captionComplete && <div style={{ position: 'absolute', top: nameBottom }}><Caption onComplete={() => setCaptionComplete(true)} /></div>}
      {captionComplete && <div style={{ position: 'absolute', bottom: 150 }}><Explore /></div>}
    </StartContainer>
  )
}

export default Start

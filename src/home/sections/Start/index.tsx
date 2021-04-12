import React from 'react'
import styled from 'styled-components'
import Name from './Name'
import Caption from './Caption'
import Explore from './Explore'

const Container = styled.section`
  height: 100vh;
  margin: 0 auto;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`

const Start = () => {
  const [nameRect, setNameRect] = React.useState<DOMRect | undefined>(undefined)
  const [captionComplete, setCaptionComplete] = React.useState(false)
  return (
    <>
      <Container>
        <Name onComplete={setNameRect} />
        {nameRect && !captionComplete && <div style={{ position: 'absolute', top: nameRect.bottom }}><Caption onComplete={() => setCaptionComplete(true)} /></div>}
        {captionComplete && <div style={{ position: 'absolute', bottom: 50 }}><Explore /></div>}
      </Container>
    </>
  )
}

export default Start

import React from 'react'
import styled from 'styled-components'
import Name from './Name'
import Caption from './Caption'

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
  return (
    <>
      <Container>
        <Name onComplete={setNameRect} />
        {nameRect && <div style={{ position: 'absolute', top: nameRect.bottom }}><Caption /></div>}
      </Container>
    </>
  )
}

export default Start

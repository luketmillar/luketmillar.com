import React from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import './App.css'

const Name = styled.div`
  font-weight: 900;
  font-style: italic;
  font-size: 6rem;
  text-align: center;
  line-height: .9em;
`
const Caption = styled.div`
  font-weight: 400;
  text-transform: uppercase;
  fontSize: 1rem;
  text-align: center;
  letter-spacing: 6px;
`

const GlobalStyle = createGlobalStyle`
  @media screen and (min-width: 900px) {
    ${Name} {
      font-size: 8rem;
    };
    ${Caption} {
      letter-spacing: 16px;
    }
  }
`

const App = () => {
  return (
    <>
      <GlobalStyle />
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
        <Name>Luke Millar</Name>
        <Caption>Code · Games · Design · Teach</Caption>
      </div>
    </>
  )
}

export default App

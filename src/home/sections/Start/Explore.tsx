import React from 'react'
import styled, { keyframes } from 'styled-components'

const slideUp = keyframes`
    0% {
        transform: translateY(100px);
    }
    100% {
        transform: translateY(0px);
    }
`
const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    animation: ${slideUp} 500ms cubic-bezier(0.1, 0.78, 0.58, 1.27);
`

const slide = keyframes`
    0% { opacity:0; transform: translateY(-10px) rotate(-135deg); }	
   20% { opacity:1; transform: translateY(-6px) rotate(-135deg); }	
   80% { opacity:1; transform: translateY(6px) rotate(-135deg); }	
  100% { opacity:0; transform: translateY(10px) rotate(-135deg); }	
`

const Arrow = styled.div`
    width: 20px;
    height: 20px;
    border: 2px solid;
    border-color: white transparent transparent white;
    opacity: 0;
 
    position: absolute;
    animation: ${slide} 1.5s linear infinite;
`

const ArrowContainer = styled.div`
    height: 50px;
    width: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
`

const Label = styled.div`
    font-size: 1rem;
    text-transform: uppercase;
    letter-spacing: 0.5em;
`

const Explore = () => {
    return <Container>
        <Label>Let's go</Label>
        <ArrowContainer>
            <Arrow style={{ animationDelay: '0s' }} />
            <Arrow style={{ animationDelay: '0.75s' }} />
        </ArrowContainer>
    </Container>
}


export default Explore
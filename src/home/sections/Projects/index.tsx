import React from 'react'
import styled, { keyframes } from 'styled-components'
import Container from '../container'

const ProjectsContainer = styled(Container)`
    text-align: center;
`

const move = keyframes`
    %0 {
        transform: translate(-50%, 50%);
    }
    33% {
        transform: translate(-50%, 30%);
    }
    67% {
        transform: translate(-20%, 50%);
    }
    100% {
        transform: translate(-50%, 50%);
    }
`

const duration = 30

const GradientBlob = styled.div<{ color: string, size: number }>`
    position: absolute;
    bottom: 0;
    left: 0;
    width: ${props => props.size}vmax;
    height: ${props => props.size}vmax;
    transform: translate(-50%, 50%);

    animation: ${move} ${duration}s linear infinite;

    z-index: -1;

    background: radial-gradient(${props => props.color}, rgba(0,0,0,0) 60%);
`

const ProjectsSection = () => {
    return <ProjectsContainer>
        <GradientBlob size={110} color={"rgba(255,255,255,1)"} style={{ animationDelay: `${2 * duration / 3}s` }} />
        <GradientBlob size={120} color={"#9013fe"} />
        <GradientBlob size={140} color={"#D11DE1"} style={{ animationDelay: `${duration / 3}s` }} />
        <h1 style={{ lineHeight: '0.9em', fontWeight: 900, fontStyle: 'italic' }}>More coming soon</h1>
    </ProjectsContainer>
}

export default ProjectsSection
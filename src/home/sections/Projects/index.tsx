import React from 'react'
import styled, { keyframes } from 'styled-components'
import Container from '../container'
import Colors from '../../../colors'

const ProjectsContainer = styled(Container)`
    text-align: center;
`

const move = keyframes`
    %0, 100% {
        transform: translate(-50%, 50%);
    }
    33% {
        transform: translate(-50%, 30%);
    }
    67% {
        transform: translate(-20%, 50%);
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
        <GradientBlob size={100} color={'rgba(255,255,255,0.5)'} style={{ animationDelay: `-${duration / 4}s` }} />
        <GradientBlob size={110} color={Colors.aqua} style={{ animationDelay: `-${3 * duration / 4}s` }} />
        <GradientBlob size={120} color={Colors.purple} />
        <GradientBlob size={140} color={Colors.pink} style={{ animationDelay: `-${2 * duration / 4}s` }} />
        <h1 style={{ lineHeight: '0.9em', fontWeight: 900, fontStyle: 'italic' }}>Coming soon.</h1>
    </ProjectsContainer>
}

export default ProjectsSection
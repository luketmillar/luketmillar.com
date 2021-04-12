import React from 'react'
import styled from 'styled-components'
import Container from '../container'

const ProjectsContainer = styled(Container)`
    background: linear-gradient(to right top, #000, #9013fe);
    text-align: center;
`

const ProjectsSection = () => {
    return <ProjectsContainer>
        <h1 style={{ lineHeight: '0.9em', fontWeight: 900, fontStyle: 'italic' }}>More coming soon</h1>
    </ProjectsContainer>
}

export default ProjectsSection
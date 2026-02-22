import PageContainer from './PageContainer'
import styled from 'styled-components'

const Title = styled.h1`
    font-size: 2rem;
    font-weight: 800;
    margin-bottom: 12px;
`

const Subtitle = styled.p`
    color: var(--text-tertiary);
    font-size: 1rem;
`

const PlaceholderPage = ({ title }: { title: string }) => {
    return (
        <PageContainer>
            <Title>{title}</Title>
            <Subtitle>Coming soon.</Subtitle>
        </PageContainer>
    )
}

export default PlaceholderPage

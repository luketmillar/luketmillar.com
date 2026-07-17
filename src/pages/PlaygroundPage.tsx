import styled from 'styled-components'
import { Link } from 'react-router-dom'
import PageContainer from './PageContainer'
import Colors from '../colors'
import { WidescreenSelect } from '../breakpoints'

const Title = styled.h1`
    font-size: 2rem;
    font-weight: 800;
    margin-bottom: 24px;
`

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
    width: 100%;

    ${WidescreenSelect} {
        grid-template-columns: repeat(3, 1fr);
        gap: 12px;
    }
`

const itemStyles = `
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 12px 14px;
    border: 1px solid var(--border);
    border-radius: 10px;
    color: var(--text);
    text-decoration: none;
    font-size: 0.8rem;
    font-weight: 500;
    transition: border-color 200ms, background 200ms;
    background: var(--card-bg);

    @media screen and (min-width: 900px) {
        padding: 14px 18px;
        border-radius: 12px;
        font-size: 0.9rem;
        gap: 12px;
    }

    &:hover {
        border-color: rgba(26, 26, 26, 0.25);
        background: var(--card-bg-hover);
    }
`

const InternalLink = styled(Link)`${itemStyles}`

const ExternalLink = styled.a`${itemStyles}`

const Dot = styled.span<{ $color: string }>`
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${props => props.$color};
    flex-shrink: 0;
`

type Demo = {
    name: string
    color: string
} & ({ path: string } | { href: string })

const demos: Demo[] = [
    { name: 'Graffiti Wall', path: '/project/graffiti', color: Colors.pink },
    { name: 'Split-Flap', path: '/project/split-flap', color: Colors.aqua },
    { name: 'Minesweeper', path: '/project/minesweeper', color: Colors.pink },
    { name: 'Golf', path: '/project/golf', color: Colors.orange },
    { name: 'Piano Vibes', href: 'https://pianovibes.netlify.app', color: '#a78bfa' },
    { name: 'Amazed.fun', href: 'https://silly-agnesi-5e0876.netlify.app', color: '#60a5fa' },
    { name: 'The Logo Quiz', href: 'https://competent-bohr-540067.netlify.app', color: '#f59e0b' },
    { name: 'Bouncing Balls', path: '/project/bouncing-balls', color: Colors.purple },
    { name: 'Falling Balls', path: '/project/falling-balls', color: Colors.aqua },
    { name: 'Color Palette', path: '/project/color-palette', color: Colors.orange },
]

const PlaygroundPage = () => {
    return (
        <PageContainer>
            <Title>Playground</Title>
            <Grid>
                {demos.map((demo) =>
                    'path' in demo ? (
                        <InternalLink key={demo.name} to={demo.path}>
                            <Dot $color={demo.color} />
                            {demo.name}
                        </InternalLink>
                    ) : (
                        <ExternalLink key={demo.name} href={demo.href} target="_blank" rel="noopener noreferrer">
                            <Dot $color={demo.color} />
                            {demo.name}
                        </ExternalLink>
                    )
                )}
            </Grid>
        </PageContainer>
    )
}

export default PlaygroundPage

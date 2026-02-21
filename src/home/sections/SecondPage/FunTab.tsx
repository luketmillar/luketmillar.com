import React from 'react'
import styled, { keyframes } from 'styled-components'
import { Link } from 'react-router-dom'
import Colors from '../../../colors'
import { WidescreenSelect } from '../../utils'

const move = keyframes`
    0%, 100% {
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

const GradientBlob = styled.div<{ $color: string; $size: number }>`
    position: absolute;
    bottom: 0;
    left: 0;
    width: ${props => props.$size}vmax;
    height: ${props => props.$size}vmax;
    transform: translate(-50%, 50%);
    animation: ${move} ${duration}s linear infinite;
    z-index: -1;
    background: radial-gradient(${props => props.$color}, rgba(0, 0, 0, 0) 60%);
`

const Wrapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    max-width: 700px;
    width: 100%;
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
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 10px;
    color: white;
    text-decoration: none;
    font-size: 0.8rem;
    font-weight: 500;
    transition: border-color 200ms, background 200ms;
    background: rgba(0, 0, 0, 0.2);

    @media screen and (min-width: 900px) {
        padding: 14px 18px;
        border-radius: 12px;
        font-size: 0.9rem;
        gap: 12px;
    }

    &:hover {
        border-color: rgba(255, 255, 255, 0.4);
        background: rgba(255, 255, 255, 0.06);
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

const FunTab = () => {
    return (
        <Wrapper>
            <GradientBlob $size={100} $color={'rgba(255,255,255,0.5)'} style={{ animationDelay: `-${duration / 4}s` }} />
            <GradientBlob $size={110} $color={Colors.aqua} style={{ animationDelay: `-${(3 * duration) / 4}s` }} />
            <GradientBlob $size={120} $color={Colors.purple} />
            <GradientBlob $size={140} $color={Colors.pink} style={{ animationDelay: `-${(2 * duration) / 4}s` }} />
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
        </Wrapper>
    )
}

export default FunTab

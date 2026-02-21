import React from 'react'
import styled from 'styled-components'
import { WidescreenSelect } from '../../utils'

const Wrapper = styled.div`
    max-width: 900px;
    width: 100%;
`

const Grid = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;

    ${WidescreenSelect} {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 24px;
    }
`

const Card = styled.a`
    display: block;
    position: relative;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    padding: 20px;
    background: rgba(255, 255, 255, 0.03);
    text-decoration: none;
    color: inherit;
    transition: border-color 200ms, background 200ms;

    ${WidescreenSelect} {
        border-radius: 16px;
        padding: 36px;
    }

    &:hover {
        border-color: rgba(255, 255, 255, 0.25);
        background: rgba(255, 255, 255, 0.06);
    }
`

const StatusPill = styled.span<{ $live: boolean }>`
    position: absolute;
    top: 12px;
    right: 12px;
    font-size: 0.65rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    padding: 3px 8px;
    border-radius: 100px;
    color: ${props => props.$live ? '#4caf50' : 'rgba(255, 255, 255, 0.35)'};
    border: 1px solid ${props => props.$live ? 'rgba(76, 175, 80, 0.3)' : 'rgba(255, 255, 255, 0.1)'};

    ${WidescreenSelect} {
        top: 16px;
        right: 16px;
        font-size: 0.7rem;
        padding: 4px 10px;
    }
`

const AppIcon = styled.div<{ $color: string }>`
    width: 48px;
    height: 48px;
    border-radius: 10px;
    background: ${props => props.$color};
    margin-bottom: 14px;
    overflow: hidden;

    ${WidescreenSelect} {
        width: 64px;
        height: 64px;
        border-radius: 14px;
        margin-bottom: 20px;
    }

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`

const AppName = styled.h3`
    font-size: 1.1rem;
    font-weight: 700;
    margin: 0 0 6px 0;
    color: white;

    ${WidescreenSelect} {
        font-size: 1.4rem;
        margin: 0 0 8px 0;
    }
`

const AppDescription = styled.p`
    font-size: 0.85rem;
    line-height: 1.5;
    color: rgba(255, 255, 255, 0.7);
    margin: 0;

    ${WidescreenSelect} {
        font-size: 0.95rem;
        line-height: 1.6;
    }
`

const apps = [
    {
        name: 'Nine',
        description: 'Ur friends on ur home screen. A 3×3 photo widget that keeps your closest friends visible at a glance. No feeds, no algorithms, no DMs.',
        color: '#D4E157',
        href: 'https://getnine.app',
        icon: '/nine-icon.png',
        live: true,
    },
    {
        name: 'Keon Design',
        description: 'A simple, beautiful graphing tool. Create clean, elegant charts and graphs with ease.',
        color: '#222',
        href: 'https://keon.design',
        icon: '/keon-icon.png',
        live: true,
    },
    {
        name: 'Blocko',
        description: 'A minimalist puzzle game with 90 uniquely crafted levels. Navigate a red block through a maze to reach the blue block.',
        color: '#e8e8e8',
        href: 'https://galacticthumb.com/blocko',
        icon: '/blocko-icon.png',
        live: false,
    },
    {
        name: 'Jump Jim',
        description: 'A simple but challenging Android game. Jump over as many rocks as you can without getting tripped up.',
        color: '#8BC34A',
        icon: '/jump-jim-icon.png',
        live: false,
    },
]

const AppsTab = () => {
    return (
        <Wrapper>
            <Grid>
                {apps.map((app) => (
                    <Card key={app.name} href={'href' in app ? app.href : undefined} target={'href' in app ? '_blank' : undefined} rel={'href' in app ? 'noopener noreferrer' : undefined} as={'href' in app ? 'a' : 'div'} style={app.live ? { borderColor: 'rgba(76, 175, 80, 0.3)' } : undefined}>
                        <StatusPill $live={app.live}>{app.live ? 'Live' : 'Retired'}</StatusPill>
                        <AppIcon $color={app.color}>
                            {app.icon && <img src={app.icon} alt={app.name} />}
                        </AppIcon>
                        <AppName>{app.name}</AppName>
                        <AppDescription>{app.description}</AppDescription>
                    </Card>
                ))}
            </Grid>
        </Wrapper>
    )
}

export default AppsTab

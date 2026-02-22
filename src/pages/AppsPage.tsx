import styled from 'styled-components'
import { SidebarHidden, SidebarVisible } from '../breakpoints'

const Container = styled.div`
    min-height: 100vh;
    min-height: 100dvh;
    padding: 0 clamp(32px, 6vw, 80px);

    ${SidebarHidden} {
        padding-top: 56px;
    }
`

const Intro = styled.p`
    font-size: clamp(1.1rem, 2.2vw, 1.5rem);
    line-height: 1.5;
    color: var(--text-secondary);
    max-width: 640px;
    padding: 48px 0 clamp(32px, 5vw, 48px);
`

const List = styled.div`
    display: flex;
    flex-direction: column;
    border-radius: 20px;
    overflow: hidden;
`

const cardStyles = `
    display: flex;
    flex-direction: column;
    overflow: hidden;
`

const Card = styled.a<{ $bg: string }>`
    ${cardStyles}
    text-decoration: none;
    color: inherit;
    background: ${props => props.$bg};
    transition: background 200ms ease;

    ${SidebarVisible} {
        flex-direction: row;
    }
`

const CardDiv = styled.div<{ $bg: string }>`
    ${cardStyles}
    background: ${props => props.$bg};

    ${SidebarVisible} {
        flex-direction: row;
    }
`

const IconSide = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: clamp(20px, 3vw, 32px);

    ${SidebarVisible} {
        width: 30%;
        flex-shrink: 0;
    }
`

const Icon = styled.img`
    width: clamp(80px, 16vw, 140px);
    height: clamp(80px, 16vw, 140px);
    border-radius: clamp(18px, 3vw, 32px);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
`

const TextSide = styled.div<{ $dark: boolean }>`
    padding: 0 clamp(24px, 4vw, 40px) clamp(28px, 5vw, 44px);

    ${SidebarVisible} {
        padding: clamp(32px, 5vw, 48px) clamp(32px, 4vw, 48px);
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    color: ${props => props.$dark ? '#fff' : 'var(--text)'};
`

const TopRow = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 12px;
`

const AppName = styled.h2`
    font-size: clamp(1.6rem, 4vw, 2.4rem);
    font-weight: 900;
    margin: 0;
    letter-spacing: -0.03em;
`

const Status = styled.span<{ $live: boolean; $dark: boolean }>`
    font-size: 0.6rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    padding: 3px 10px;
    border-radius: 100px;
    color: ${props => props.$live
        ? (props.$dark ? '#a5d6a7' : '#2e7d32')
        : (props.$dark ? 'rgba(255,255,255,0.5)' : 'var(--text-tertiary)')};
    border: 1px solid ${props => props.$live
        ? (props.$dark ? 'rgba(165,214,167,0.3)' : 'rgba(46,125,50,0.25)')
        : (props.$dark ? 'rgba(255,255,255,0.2)' : 'var(--border)')};
`

const Description = styled.p<{ $dark: boolean }>`
    font-size: clamp(0.9rem, 1.8vw, 1.05rem);
    line-height: 1.6;
    margin: 0;
    color: ${props => props.$dark ? 'rgba(255,255,255,0.75)' : 'var(--text-secondary)'};
`

const apps = [
    {
        name: 'Nine',
        description: 'Ur friends on ur home screen. A 3\u00d73 photo widget that keeps your closest friends visible at a glance. No feeds, no algorithms, no DMs.',
        bg: '#C8E04D',
        href: 'https://getnine.app',
        icon: '/nine-icon.png',
        live: true,
        dark: false,
    },
    {
        name: 'Keon Design',
        description: 'A simple, beautiful graphing tool. Create clean, elegant charts and graphs with ease.',
        bg: '#1A1A1A',
        href: 'https://keon.design',
        icon: '/keon-icon.png',
        live: true,
        dark: true,
    },
    {
        name: 'Blocko',
        description: 'A minimalist puzzle game with 90 uniquely crafted levels. Navigate a red block through a maze to reach the blue block.',
        bg: '#E8E8E8',
        href: 'https://galacticthumb.com/blocko',
        icon: '/blocko-icon.png',
        live: false,
        dark: false,
    },
    {
        name: 'Jump Jim',
        description: 'Jump over as many rocks as you can without getting tripped up.',
        bg: '#C0392B',
        icon: '/jump-jim-icon.png',
        live: false,
        dark: true,
    },
]

const AppsPage = () => {
    return (
        <Container>
            <Intro>A few apps I've built</Intro>
            <List>
                {apps.map((app) => {
                    const inner = (
                        <>
                            <IconSide>
                                <Icon src={app.icon} alt={app.name} />
                            </IconSide>
                            <TextSide $dark={app.dark}>
                                <TopRow>
                                    <AppName>{app.name}</AppName>
                                    <Status $live={app.live} $dark={app.dark}>
                                        {app.live ? 'Live' : 'Retired'}
                                    </Status>
                                </TopRow>
                                <Description $dark={app.dark}>{app.description}</Description>
                            </TextSide>
                        </>
                    )

                    return app.href ? (
                        <Card key={app.name} $bg={app.bg} href={app.href} target="_blank" rel="noopener noreferrer">
                            {inner}
                        </Card>
                    ) : (
                        <CardDiv key={app.name} $bg={app.bg}>
                            {inner}
                        </CardDiv>
                    )
                })}
            </List>
        </Container>
    )
}

export default AppsPage

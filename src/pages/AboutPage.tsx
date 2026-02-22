import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { SidebarHidden } from '../breakpoints'

const Container = styled.div`
    min-height: 100vh;
    min-height: 100dvh;
    padding: 48px clamp(32px, 6vw, 80px);

    ${SidebarHidden} {
        padding-top: 80px;
    }
`

const Content = styled.div`
    max-width: 640px;
`

const Prose = styled.p`
    font-size: clamp(1.1rem, 2.2vw, 1.5rem);
    line-height: 1.5;
    color: var(--text-secondary);
    margin: 0;
    font-weight: 400;

    & + & {
        margin-top: clamp(20px, 3vw, 36px);
    }
`

const Hl = styled.span`
    color: var(--text);
    font-weight: 500;
`

const linkStyles = `
    color: var(--text);
    font-weight: 500;
    text-decoration: underline;
    &:hover { text-decoration: underline; }
`

const HlExt = styled.a`${linkStyles}`
const HlInt = styled(Link)`${linkStyles}`

const Sup = styled.sup`
    font-size: 0.6em;
    color: var(--text-tertiary);
`

const Divider = styled.hr`
    border: none;
    border-top: 1px solid var(--border);
    margin: clamp(32px, 5vw, 56px) 0 clamp(16px, 2vw, 24px);
`

const Footnotes = styled.div`
    font-size: clamp(0.75rem, 1.4vw, 0.85rem);
    line-height: 1.6;
    color: var(--text-tertiary);

    p {
        margin: 0;
    }

    p + p {
        margin-top: 6px;
    }
`

const AboutPage = () => {
    return (
        <Container>
            <Content>
                <Prose>
                    Hi, I'm <Hl>Luke Millar</Hl>, an{' '}
                    <HlExt href="https://linkedin.com/in/luketmillar" target="_blank" rel="noopener noreferrer">engineering leader</HlExt>,{' '}
                    <HlInt to="/apps">builder</HlInt>, and <Hl>dad</Hl> of five from Northern California<Sup>1</Sup>.
                </Prose>
                <Prose>
                    I love making things. <HlInt to="/playground">Coding</HlInt> feels like
                    pure creation. Even more so with Claude Code<Sup>2</Sup>.
                    I'm always working on some side project.
                </Prose>
                <Prose>
                    I'm a die-hard <Hl>Sacramento Kings</Hl> fan<Sup>3</Sup>.
                    Summer boating is the best, I do weekly{' '}
                    <HlInt to="/playing">game night</HlInt> with friends,
                    and host a podcast called{' '}
                    <HlExt href="https://podcasts.apple.com/us/podcast/taste-buds/id1843026333?i=1000741092078" target="_blank" rel="noopener noreferrer">Taste Buds</HlExt> where
                    we eat and review foods.
                </Prose>
                <Prose>
                    I'm the best<Sup>4</Sup> <HlInt to="/playing">Mario Kart World</HlInt> player.
                    I hold the #52 world record in{' '}
                    <HlInt to="/playing">Link's Awakening</HlInt> speed runs. I am a huge fan of{' '}
                    <HlInt to="/watching">Back to the Future</HlInt>,{' '}
                    <HlInt to="/watching">LOST</HlInt>,{' '}
                    <HlInt to="/watching">Survivor</HlInt>,
                    and anything <HlInt to="/watching">Idris Elba</HlInt> does.
                </Prose>
                <Divider />
                <Footnotes>
                    <p>1. Pleasanton, Coarsegold, El Dorado Hills.</p>
                    <p>2. I have some real conflicting opinions about this. It's both incredible and existentially threatening.</p>
                    <p>3. I love suffering. My wife says that at least it shows I'm loyal.</p>
                    <p>4. Best in my house.</p>
                </Footnotes>
            </Content>
        </Container>
    )
}

export default AboutPage

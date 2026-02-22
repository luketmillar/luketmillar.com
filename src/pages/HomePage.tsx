import styled from 'styled-components'
import { SidebarHidden } from '../breakpoints'

/* ── Desktop: fixed-ratio frame with layered text + photo ── */

const Container = styled.div`
    height: 100vh;
    height: 100dvh;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;

    ${SidebarHidden} {
        padding-top: 56px;
        align-items: flex-start;
    }
`

const Frame = styled.div`
    position: relative;
    aspect-ratio: 5 / 3;
    width: 100%;
    max-height: 100%;

    ${SidebarHidden} {
        aspect-ratio: auto;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
    }
`

const TextLayer = styled.div`
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 2%;
    z-index: 1;

    ${SidebarHidden} {
        position: relative;
        inset: auto;
        flex: 0 0 auto;
        justify-content: flex-end;
        padding: 24px 20px 0;
        text-align: center;
    }
`

const Name = styled.h1`
    font-size: 12cqi;
    font-weight: 900;
    text-transform: uppercase;
    line-height: 0.85;
    letter-spacing: -0.03em;
    color: var(--text);
    margin: 0;

    ${SidebarHidden} {
        font-size: 16vw;
    }
`

const Subtitle = styled.p`
    font-size: 1.3cqi;
    text-transform: uppercase;
    letter-spacing: 0.3em;
    color: var(--text-tertiary);
    margin-top: 1%;
    margin-left: 1em;
    font-weight: 600;

    ${SidebarHidden} {
        font-size: 2.5vw;
        margin-left: 0;
        margin-top: 12px;
    }
`

const PhotoLayer = styled.div`
    position: absolute;
    right: 0;
    bottom: 0;
    width: 50%;
    height: 95%;
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    z-index: 2;

    ${SidebarHidden} {
        position: relative;
        width: 100%;
        height: auto;
        flex: 0 1 auto;
        justify-content: flex-start;
        align-items: flex-end;
    }
`

const Photo = styled.img`
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    display: block;
`

const HomePage = () => {
    return (
        <Container>
            <Frame>
                <TextLayer>
                    <Name>Luke<br />Millar</Name>
                    <Subtitle>Engineer &middot; Designer &middot; Podcaster</Subtitle>
                </TextLayer>
                <PhotoLayer>
                    <Photo src="/luke-clean.png" alt="Luke Millar" />
                </PhotoLayer>
            </Frame>
        </Container>
    )
}

export default HomePage

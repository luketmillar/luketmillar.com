import React from 'react'
import styled from 'styled-components'
import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from './Sidebar'
import MobileHeader from './MobileHeader'
import { SidebarVisible, SidebarHidden } from '../breakpoints'

const SIDEBAR_WIDTH = 220

const Shell = styled.div`
    min-height: 100vh;
    min-height: 100dvh;
`

const SidebarContainer = styled.aside<{ $open: boolean }>`
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    width: ${SIDEBAR_WIDTH}px;
    background: var(--bg);
    border-right: 1px solid var(--border);
    z-index: 100;
    overflow-y: auto;

    ${SidebarHidden} {
        transform: translateX(${props => props.$open ? '0' : '-100%'});
        transition: transform 250ms ease;
    }
`

const Overlay = styled.div<{ $visible: boolean }>`
    display: none;

    ${SidebarHidden} {
        display: block;
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.3);
        z-index: 99;
        opacity: ${props => props.$visible ? 1 : 0};
        pointer-events: ${props => props.$visible ? 'auto' : 'none'};
        transition: opacity 250ms ease;
    }
`

const Main = styled.main`
    ${SidebarVisible} {
        margin-left: ${SIDEBAR_WIDTH}px;
    }
`

const AppShell = () => {
    const [drawerOpen, setDrawerOpen] = React.useState(false)
    const location = useLocation()

    // Close drawer on route change
    React.useEffect(() => {
        setDrawerOpen(false)
    }, [location.pathname])

    // Close drawer on Escape
    React.useEffect(() => {
        if (!drawerOpen) return
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setDrawerOpen(false)
        }
        document.addEventListener('keydown', handleKey)
        return () => document.removeEventListener('keydown', handleKey)
    }, [drawerOpen])

    // Lock body scroll when drawer open
    React.useEffect(() => {
        if (drawerOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }
        return () => { document.body.style.overflow = '' }
    }, [drawerOpen])

    return (
        <Shell>
            <MobileHeader onMenuClick={() => setDrawerOpen(true)} />
            <Overlay $visible={drawerOpen} onClick={() => setDrawerOpen(false)} />
            <SidebarContainer $open={drawerOpen}>
                <Sidebar onNavigate={() => setDrawerOpen(false)} />
            </SidebarContainer>
            <Main>
                <Outlet />
            </Main>
        </Shell>
    )
}

export default AppShell

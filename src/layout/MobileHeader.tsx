import styled from 'styled-components'
import { SidebarVisible } from '../breakpoints'

const Header = styled.header`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 16px;
    background: var(--bg);
    z-index: 90;
    border-bottom: 1px solid var(--border);

    ${SidebarVisible} {
        display: none;
    }
`

const MenuButton = styled.button`
    background: none;
    border: none;
    padding: 8px;
    cursor: pointer;
    color: var(--text);
    display: flex;
    align-items: center;
    justify-content: center;
`

const Logo = styled.span`
    font-size: 0.85rem;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: var(--text);
`

interface MobileHeaderProps {
    onMenuClick: () => void
}

const MobileHeader = ({ onMenuClick }: MobileHeaderProps) => {
    return (
        <Header>
            <MenuButton onClick={onMenuClick} aria-label="Open menu">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
            </MenuButton>
            <Logo>Luke Millar</Logo>
        </Header>
    )
}

export default MobileHeader

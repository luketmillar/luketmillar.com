import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

const Nav = styled.nav`
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 32px 0;
`

const Logo = styled(NavLink)`
    font-size: 1rem;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: var(--text);
    text-decoration: none;
    padding: 0 24px 32px;
`

const NavItems = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2px;
    padding: 0 12px;
`

const SectionLabel = styled.div`
    font-size: 0.65rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: var(--text-tertiary);
    padding: 20px 12px 6px;
`

const StyledNavLink = styled(NavLink)`
    display: block;
    padding: 8px 12px;
    border-radius: 8px;
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--text-secondary);
    text-decoration: none;
    transition: background 150ms, color 150ms;

    &:hover {
        background: var(--card-bg-hover);
        color: var(--text);
    }

    &.active {
        background: var(--card-bg-hover);
        color: var(--text);
        font-weight: 600;
    }
`

interface SidebarProps {
    onNavigate?: () => void
}

const Sidebar = ({ onNavigate }: SidebarProps) => {
    return (
        <Nav>
            <Logo to="/" onClick={onNavigate}>Luke Millar</Logo>
            <NavItems>
                <StyledNavLink to="/" end onClick={onNavigate}>Home</StyledNavLink>
                <StyledNavLink to="/about" onClick={onNavigate}>About</StyledNavLink>
                <StyledNavLink to="/apps" onClick={onNavigate}>Apps</StyledNavLink>
                <StyledNavLink to="/work" onClick={onNavigate}>Work</StyledNavLink>
                <StyledNavLink to="/playground" onClick={onNavigate}>Playground</StyledNavLink>
            </NavItems>
            <SectionLabel>Coming Soon</SectionLabel>
            <NavItems>
                <StyledNavLink to="/watching" onClick={onNavigate}>Watching</StyledNavLink>
                <StyledNavLink to="/playing" onClick={onNavigate}>Playing</StyledNavLink>
            </NavItems>
        </Nav>
    )
}

export default Sidebar

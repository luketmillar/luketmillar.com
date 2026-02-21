import React from 'react'
import styled from 'styled-components'
import Container from '../container'
import { WidescreenSelect } from '../../utils'
import FunTab from './FunTab'
import AboutTab from './AboutTab'
import WorkTab from './WorkTab'
import AppsTab from './AppsTab'

const tabList = [
    { id: 'about', label: 'About' },
    { id: 'apps', label: 'Apps' },
    { id: 'work', label: 'Work' },
    { id: 'playground', label: 'Playground' },
]

const PageContainer = styled(Container)`
    justify-content: flex-start;
    padding: 0;
    overflow: visible;
`

const Nav = styled.nav`
    display: flex;
    gap: 0;
    padding: 20px 16px 0;
    width: 100%;
    justify-content: center;
    flex-shrink: 0;

    ${WidescreenSelect} {
        gap: 8px;
        padding: 40px 40px 0;
    }
`

const NavItem = styled.button<{ $active: boolean }>`
    background: none;
    border: none;
    color: ${props => props.$active ? 'white' : 'rgba(255, 255, 255, 0.4)'};
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    padding: 10px 14px;
    cursor: pointer;
    position: relative;
    transition: color 200ms;
    white-space: nowrap;

    ${WidescreenSelect} {
        font-size: 1rem;
        letter-spacing: 0.15em;
        padding: 12px 24px;
    }

    &:hover {
        color: ${props => props.$active ? 'white' : 'rgba(255, 255, 255, 0.7)'};
    }

    &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        width: ${props => props.$active ? '24px' : '0'};
        height: 2px;
        background: white;
        transition: width 200ms;
    }
`

const TabContent = styled.div`
    flex: 1;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    width: 100%;
    padding: 24px 20px;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;

    ${WidescreenSelect} {
        padding: 0 40px;
        align-items: center;
    }
`

interface SecondPageProps {
    activeTab: string
    onTabChange: (tab: string) => void
}

const SecondPage = ({ activeTab, onTabChange }: SecondPageProps) => {
    return (
        <PageContainer>
            <Nav>
                {tabList.map((tab) => (
                    <NavItem
                        key={tab.id}
                        $active={activeTab === tab.id}
                        onClick={() => onTabChange(tab.id)}
                    >
                        {tab.label}
                    </NavItem>
                ))}
            </Nav>
            <TabContent>
                {activeTab === 'playground' && <FunTab />}
                {activeTab === 'about' && <AboutTab />}
                {activeTab === 'work' && <WorkTab />}
                {activeTab === 'apps' && <AppsTab />}
            </TabContent>
        </PageContainer>
    )
}

export default SecondPage

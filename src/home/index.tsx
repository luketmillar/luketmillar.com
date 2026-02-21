import React from 'react'
import styled from 'styled-components'
import { useLocation, useNavigate } from 'react-router-dom'
import Start from './sections/Start'
import SecondPage from './sections/SecondPage'

const validTabs = ['playground', 'about', 'work', 'apps']

const getTabFromHash = (hash: string) => {
    const h = hash.replace('#', '').toLowerCase()
    return validTabs.includes(h) ? h : null
}

const ScrollWrapper = styled.div`
    overflow-y: auto;
    overflow-x: hidden;
    height: 100vh;
    height: 100dvh;
`

const Home = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const scrollRef = React.useRef<HTMLDivElement>(null)
    const [scrollY, setScrollY] = React.useState(0)

    const [activeTab, setActiveTab] = React.useState<string>(() => {
        return getTabFromHash(window.location.hash) ?? 'about'
    })

    // Scroll listener
    React.useEffect(() => {
        const el = scrollRef.current
        if (!el) return
        const handleScroll = () => setScrollY(el.scrollTop)
        el.addEventListener('scroll', handleScroll, { passive: true })
        return () => el.removeEventListener('scroll', handleScroll)
    }, [])

    // On mount: instant-scroll to second page if hash present
    React.useEffect(() => {
        if (getTabFromHash(window.location.hash) && scrollRef.current) {
            scrollRef.current.scrollTop = window.innerHeight
        }
    }, [])

    // Sync on back/forward navigation (popstate)
    const isInitial = React.useRef(true)
    React.useEffect(() => {
        if (isInitial.current) {
            isInitial.current = false
            return
        }
        const tab = getTabFromHash(location.hash)
        if (tab) {
            setActiveTab(tab)
            if (scrollRef.current && scrollRef.current.scrollTop < window.innerHeight * 0.5) {
                scrollRef.current.scrollTop = window.innerHeight
            }
        } else if (!location.hash && scrollRef.current) {
            scrollRef.current.scrollTop = 0
        }
    }, [location.key])

    // Update URL hash based on scroll position via replaceState
    const atSecondPage = scrollY > window.innerHeight * 0.5
    React.useEffect(() => {
        const currentHash = window.location.hash.replace('#', '')
        if (atSecondPage) {
            if (currentHash !== activeTab) {
                window.history.replaceState(window.history.state, '', `#${activeTab}`)
            }
        } else if (currentHash) {
            window.history.replaceState(window.history.state, '', window.location.pathname)
        }
    }, [atSecondPage, activeTab])

    // Tab change handler — pushes history entry
    const handleTabChange = (tab: string) => {
        setActiveTab(tab)
        navigate({ hash: tab })
    }

    return (
        <ScrollWrapper ref={scrollRef}>
            <Start scrollY={scrollY} />
            <SecondPage activeTab={activeTab} onTabChange={handleTabChange} />
        </ScrollWrapper>
    )
}

export default Home

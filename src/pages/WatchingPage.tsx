import React, { useState, useRef, useMemo } from 'react'
import styled from 'styled-components'
import { Film, Tv, Trophy } from 'lucide-react'
import { SidebarHidden } from '../breakpoints'
import watchHistory from './watching/watchHistory.json'
import currentlyWatching from './watching/currentlyWatching.json'
import needToWatch from './watching/needToWatch.json'

// --- Types ---

type FlexDate =
    | { year: number; month: number; day: number }
    | { year: number; month: number }
    | { year: number }

interface Person {
    id: string
    name: string
    color: string
}

type EntryType = 'movie' | 'tv' | 'sports' | 'other'

interface Entry {
    title: string
    detail?: string
    date: FlexDate
    type: EntryType
    stars?: number
    watchedWith?: string[]
}

// --- Types & People ---

const typeConfig: Record<EntryType, { label: string; color: string; icon: typeof Film }> = {
    movie:  { label: 'Movies',  color: '#e07a5f', icon: Film },
    tv:     { label: 'TV',      color: '#3d85c6', icon: Tv },
    sports: { label: 'Sports',  color: '#2d6a4f', icon: Trophy },
    other:  { label: 'Other',   color: '#8b8b8b', icon: Film },
}

const people: Record<string, Person> = {
    lisa: { id: 'lisa', name: 'Lisa', color: '#e07a5f' },
    maddie: { id: 'maddie', name: 'Maddie', color: '#81b29a' },
    claire: { id: 'claire', name: 'Claire', color: '#3d85c6' },
    annalise: { id: 'annalise', name: 'Annalise', color: '#f2cc8f' },
    caroline: { id: 'caroline', name: 'Caroline', color: '#a78bfa' },
    jake: { id: 'jake', name: 'Jake', color: '#f87171' },
}

// --- Data ---

const entries: Entry[] = watchHistory as Entry[]

// --- Date Helpers ---

const MONTH_NAMES = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
]
const MONTH_SHORT = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
]

const flexDateToDate = (d: FlexDate): Date => {
    if ('day' in d) return new Date(d.year, d.month - 1, d.day)
    if ('month' in d) return new Date(d.year, d.month - 1, 1)
    return new Date(d.year, 0, 1)
}

const formatFlexDate = (d: FlexDate): string => {
    if ('day' in d) return `${MONTH_SHORT[d.month - 1]} ${d.day}`
    if ('month' in d) return `${MONTH_NAMES[d.month - 1]} ${d.year}`
    return `${d.year}`
}

const dateToGroupKey = (d: FlexDate): string => {
    if ('month' in d) return `${d.year}-${String(d.month).padStart(2, '0')}`
    return `${d.year}`
}

const dateToGroupLabel = (d: FlexDate): string => {
    if ('month' in d) return `${MONTH_NAMES[d.month - 1]} ${d.year}`
    return `${d.year}`
}

// --- Grouping ---

const groupEntries = (items: Entry[]) => {
    const groups: { key: string; label: string; entries: Entry[] }[] = []
    let current: { key: string; label: string; entries: Entry[] } | null = null

    for (const entry of items) {
        const key = dateToGroupKey(entry.date)
        const label = dateToGroupLabel(entry.date)
        if (!current || current.key !== key) {
            current = { key, label, entries: [] }
            groups.push(current)
        }
        current.entries.push(entry)
    }

    return groups
}

// --- Heatmap Logic ---

const buildHeatmapData = () => {
    const counts = new Map<string, number>()

    for (const entry of entries) {
        const d = flexDateToDate(entry.date)
        const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
        counts.set(key, (counts.get(key) || 0) + 1)
    }

    // Build ~26 weeks (6 months) of days ending at today
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    // Find the Saturday of the current week
    const endSaturday = new Date(today)
    endSaturday.setDate(endSaturday.getDate() + (6 - endSaturday.getDay()))

    // Go back 26 weeks
    const startSunday = new Date(endSaturday)
    startSunday.setDate(startSunday.getDate() - 26 * 7 + 1)
    startSunday.setDate(startSunday.getDate() - startSunday.getDay())

    const numWeeks = Math.ceil((endSaturday.getTime() - startSunday.getTime()) / (7 * 86400000)) + 1
    const weeks: { date: Date; count: number }[][] = []
    const cursor = new Date(startSunday)

    for (let w = 0; w < numWeeks; w++) {
        const week: { date: Date; count: number }[] = []
        for (let d = 0; d < 7; d++) {
            const key = `${cursor.getFullYear()}-${String(cursor.getMonth() + 1).padStart(2, '0')}-${String(cursor.getDate()).padStart(2, '0')}`
            week.push({ date: new Date(cursor), count: counts.get(key) || 0 })
            cursor.setDate(cursor.getDate() + 1)
        }
        weeks.push(week)
    }

    // Find month label positions
    const monthLabels: { label: string; col: number }[] = []
    let lastMonth = -1
    for (let w = 0; w < weeks.length; w++) {
        const firstDay = weeks[w][0]
        const m = firstDay.date.getMonth()
        if (m !== lastMonth) {
            monthLabels.push({ label: MONTH_SHORT[m], col: w })
            lastMonth = m
        }
    }

    return { weeks, monthLabels }
}

// --- Styles ---

const Container = styled.div`
    min-height: 100vh;
    min-height: 100dvh;
    padding: 48px clamp(32px, 6vw, 80px);

    ${SidebarHidden} {
        padding-top: 80px;
    }
`

const Title = styled.h1`
    font-size: clamp(1.1rem, 2.2vw, 1.5rem);
    font-weight: 400;
    color: var(--text-secondary);
    margin-bottom: clamp(24px, 4vw, 40px);
`

const Feed = styled.div`
    max-width: 640px;
`

const HeatmapWrapper = styled.div`
    max-width: 640px;
    margin-bottom: 24px;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
`

const FilterBar = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 32px;
    max-width: 640px;
`

const FilterPill = styled.button<{ $color: string; $active: boolean }>`
    padding: 4px 12px;
    border-radius: 999px;
    border: 1.5px solid ${(p) => (p.$active ? p.$color : 'var(--border)')};
    background: ${(p) => (p.$active ? p.$color + '18' : 'transparent')};
    color: ${(p) => (p.$active ? p.$color : 'var(--text-secondary)')};
    font-size: 0.75rem;
    font-weight: 600;
    cursor: pointer;
    transition: border-color 150ms, background 150ms, color 150ms;

    &:hover {
        border-color: ${(p) => p.$color};
        color: ${(p) => p.$color};
    }
`

const MonthLabel = styled.h2`
    font-size: 0.65rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: var(--text-tertiary);
    margin: 0 0 12px;
    padding-top: 32px;

    &:first-child {
        padding-top: 0;
    }
`

const LogList = styled.div`
    display: flex;
    flex-direction: column;
`

const LogEntry = styled.div`
    padding: 10px 0;
    border-bottom: 1px solid var(--border);

    &:first-child {
        border-top: 1px solid var(--border);
    }
`

const LogTitleRow = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
`

const TypeIcon = styled.span<{ $color: string }>`
    color: ${(p) => p.$color};
    flex-shrink: 0;
    display: flex;
`

const LogTitle = styled.span`
    font-size: 0.9rem;
    font-weight: 600;
    color: var(--text);
`

const LogDetail = styled.span`
    font-size: 0.9rem;
    font-weight: 400;
    color: var(--text-tertiary);
    margin-left: 4px;
`

const LogMeta = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 3px;
    flex-wrap: wrap;
`

const LogDate = styled.span`
    font-size: 0.75rem;
    color: var(--text-tertiary);
`

const Stars = styled.span`
    font-size: 0.75rem;
    letter-spacing: 1px;
    color: var(--text-tertiary);
`

const PersonPill = styled.button<{ $color: string }>`
    padding: 2px 8px;
    border-radius: 999px;
    border: 1px solid ${(p) => p.$color}40;
    background: ${(p) => p.$color}14;
    color: ${(p) => p.$color};
    font-size: 0.65rem;
    font-weight: 600;
    cursor: pointer;
    transition: background 150ms, border-color 150ms;

    &:hover {
        background: ${(p) => p.$color}28;
        border-color: ${(p) => p.$color};
    }
`

const HeroSection = styled.div`
    max-width: 640px;
    margin-bottom: 32px;
`

const SectionLabel = styled.h2`
    font-size: 0.65rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: var(--text-tertiary);
    margin: 0 0 10px;
`

const CurrentlyGrid = styled.div`
    display: flex;
    gap: 10px;

    ${SidebarHidden} {
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
    }
`

const CurrentlyCard = styled.div<{ $src: string }>`
    flex: 1;
    position: relative;
    aspect-ratio: 3 / 2;
    border-radius: 10px;
    overflow: hidden;
    background: url(${(p) => p.$src}) center / cover no-repeat;

    ${SidebarHidden} {
        flex: none;
        width: 260px;
    }
`

const CurrentlyOverlay = styled.div`
    position: absolute;
    inset: 0;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    padding: 12px 14px;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.75) 0%, rgba(0, 0, 0, 0.3) 50%, transparent 100%);
`

const CurrentlyInfo = styled.div``

const CurrentlyTitle = styled.div`
    font-size: 0.95rem;
    font-weight: 600;
    color: #fff;
`

const CurrentlyDetail = styled.div`
    font-size: 0.8rem;
    color: rgba(255, 255, 255, 0.75);
    margin-top: 1px;
`

const CurrentlyWithPill = styled.span`
    padding: 2px 8px;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.2);
    color: rgba(255, 255, 255, 0.85);
    font-size: 0.65rem;
    font-weight: 600;
    flex-shrink: 0;
    align-self: flex-end;
`

const NeedToWatchGrid = styled.div`
    display: flex;
    gap: 10px;
    max-width: 640px;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
`

const NeedToWatchCard = styled.div<{ $src: string }>`
    flex-shrink: 0;
    width: 120px;
    position: relative;
    aspect-ratio: 1 / 1;
    border-radius: 8px;
    overflow: hidden;
    background: url(${(p) => p.$src}) center / cover no-repeat;
`

const NeedToWatchOverlay = styled.div`
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 10px 12px;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.75) 0%, rgba(0, 0, 0, 0.3) 45%, transparent 100%);
`

const NeedToWatchTitle = styled.div`
    font-size: 0.8rem;
    font-weight: 600;
    color: #fff;
`

const NeedToWatchDetail = styled.div`
    font-size: 0.7rem;
    color: rgba(255, 255, 255, 0.65);
    margin-top: 1px;
`

// --- Sub-Components ---

const renderStars = (count: number) => '★'.repeat(count) + '☆'.repeat(5 - count)

const CELL_SIZE = 10
const CELL_GAP = 2
const CELL_STEP = CELL_SIZE + CELL_GAP
const DAY_LABEL_WIDTH = 28
const HEADER_HEIGHT = 16

const Heatmap: React.FC<{ onMonthClick: (monthKey: string) => void }> = ({ onMonthClick }) => {
    const { weeks, monthLabels } = useMemo(buildHeatmapData, [])

    const gridWidth = weeks.length * CELL_STEP
    const svgWidth = gridWidth + DAY_LABEL_WIDTH
    const svgHeight = HEADER_HEIGHT + 7 * CELL_STEP

    const getColor = (count: number) => {
        if (count === 0) return 'var(--border)'
        if (count === 1) return '#4a90d9'
        if (count === 2) return '#2563eb'
        if (count === 3) return '#1d4ed8'
        if (count === 4) return '#1e3a8a'
        return '#172554'
    }

    const dayLabels = [
        { label: 'Mon', row: 1 },
        { label: 'Wed', row: 3 },
        { label: 'Fri', row: 5 },
    ]

    return (
        <HeatmapWrapper>
            <svg width={svgWidth} height={svgHeight} style={{ display: 'block' }}>
                {/* Month labels */}
                {monthLabels.map((m, i) => {
                    const monthDate = weeks[m.col][0].date
                    const key = `${monthDate.getFullYear()}-${String(monthDate.getMonth() + 1).padStart(2, '0')}`
                    return (
                        <text
                            key={i}
                            x={m.col * CELL_STEP}
                            y={11}
                            fontSize={9}
                            fill="var(--text-tertiary)"
                            style={{ cursor: 'pointer' }}
                            onClick={() => onMonthClick(key)}
                        >
                            {m.label}
                        </text>
                    )
                })}

                {/* Day labels (right side) */}
                {dayLabels.map((d) => (
                    <text
                        key={d.label}
                        x={gridWidth + 6}
                        y={HEADER_HEIGHT + d.row * CELL_STEP + CELL_SIZE - 1}
                        fontSize={9}
                        fill="var(--text-tertiary)"
                    >
                        {d.label}
                    </text>
                ))}

                {/* Cells */}
                {weeks.map((week, w) =>
                    week.map((day, d) => (
                        <rect
                            key={`${w}-${d}`}
                            x={w * CELL_STEP}
                            y={HEADER_HEIGHT + d * CELL_STEP}
                            width={CELL_SIZE}
                            height={CELL_SIZE}
                            rx={2}
                            fill={getColor(day.count)}
                        />
                    ))
                )}
            </svg>
        </HeatmapWrapper>
    )
}

// --- Main Component ---

const WatchingPage = () => {
    const [typeFilter, setTypeFilter] = useState<EntryType | null>(null)
    const groupRefs = useRef<Record<string, HTMLDivElement | null>>({})

    const filteredEntries = useMemo(() => {
        if (!typeFilter) return entries
        return entries.filter((e) => e.type === typeFilter)
    }, [typeFilter])

    const groups = useMemo(() => groupEntries(filteredEntries), [filteredEntries])

    const handleMonthClick = (monthKey: string) => {
        const el = groupRefs.current[monthKey]
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' })
        }
    }

    const handleTypeClick = (type: EntryType) => {
        setTypeFilter((prev) => (prev === type ? null : type))
    }

    return (
        <Container>
            <Title>What I'm watching</Title>

            <HeroSection>
                <SectionLabel>Currently Watching</SectionLabel>
                <CurrentlyGrid>
                    {currentlyWatching.map((show) => (
                        <CurrentlyCard key={show.title} $src={show.image}>
                            <CurrentlyOverlay>
                                <CurrentlyInfo>
                                    <CurrentlyTitle>{show.title}</CurrentlyTitle>
                                    {show.detail && <CurrentlyDetail>{show.detail}</CurrentlyDetail>}
                                </CurrentlyInfo>
                                {show.with && <CurrentlyWithPill>{show.with}</CurrentlyWithPill>}
                            </CurrentlyOverlay>
                        </CurrentlyCard>
                    ))}
                </CurrentlyGrid>
            </HeroSection>

            <HeroSection>
                <SectionLabel>Need to Watch</SectionLabel>
                <NeedToWatchGrid>
                    {needToWatch.map((show) => (
                        <NeedToWatchCard key={show.title} $src={show.image}>
                            <NeedToWatchOverlay>
                                <NeedToWatchTitle>{show.title}</NeedToWatchTitle>
                                {show.detail && <NeedToWatchDetail>{show.detail}</NeedToWatchDetail>}
                            </NeedToWatchOverlay>
                        </NeedToWatchCard>
                    ))}
                </NeedToWatchGrid>
            </HeroSection>

            <Heatmap onMonthClick={handleMonthClick} />

            <FilterBar>
                <FilterPill
                    $color="var(--text)"
                    $active={typeFilter === null}
                    onClick={() => setTypeFilter(null)}
                >
                    All
                </FilterPill>
                {(['movie', 'tv', 'sports'] as EntryType[]).map((type) => (
                    <FilterPill
                        key={type}
                        $color={typeConfig[type].color}
                        $active={typeFilter === type}
                        onClick={() => handleTypeClick(type)}
                    >
                        {typeConfig[type].label}
                    </FilterPill>
                ))}
            </FilterBar>

            <Feed>
                {groups.map((group) => (
                    <div
                        key={group.key}
                        ref={(el) => {
                            groupRefs.current[group.key] = el
                        }}
                    >
                        <MonthLabel>{group.label}</MonthLabel>
                        <LogList>
                            {group.entries.map((entry, i) => (
                                <LogEntry key={`${entry.title}-${entry.detail ?? ''}-${i}`}>
                                    <LogTitleRow>
                                        <TypeIcon $color={typeConfig[entry.type].color}>
                                            {React.createElement(typeConfig[entry.type].icon, { size: 14 })}
                                        </TypeIcon>
                                        <LogTitle>{entry.title}</LogTitle>
                                        {entry.detail && <LogDetail>{entry.detail}</LogDetail>}
                                    </LogTitleRow>
                                    <LogMeta>
                                        <LogDate>{formatFlexDate(entry.date)}</LogDate>
                                        {entry.stars && (
                                            <Stars>{renderStars(entry.stars)}</Stars>
                                        )}
                                        {entry.watchedWith?.map((pid) => {
                                            const person = people[pid]
                                            if (!person) return null
                                            return (
                                                <PersonPill
                                                    key={pid}
                                                    $color={person.color}
                                                >
                                                    {person.name}
                                                </PersonPill>
                                            )
                                        })}
                                    </LogMeta>
                                </LogEntry>
                            ))}
                        </LogList>
                    </div>
                ))}
            </Feed>
        </Container>
    )
}

export default WatchingPage

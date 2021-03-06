import React from 'react'
import { Route, Switch, useHistory } from 'react-router'
import Creator from './Creator'
import Board from './Board'
import { getRandomLayout, Layout } from './layout'
import { useWindowSize } from './ResizeListener'
import { desktopStartData, mobileStartData, layout4 } from './startLayoutData'
import moment from 'moment'
import Button from './Creator/Button'

const Marquee = () => {
    const history = useHistory()
    const windowSize = useWindowSize()
    const wideScreen = windowSize.width > 900
    const [layouts, setLayouts] = React.useState<Layout[]>(wideScreen ? desktopStartData : mobileStartData)
    const [index, setIndex] = React.useState(-1)
    const nextMessage = (delay = 2000) => {
        window.setTimeout(() => {
            setIndex(index => {
                const nextIndex = index + 1
                if (nextIndex === layouts.length) {
                    return -1
                } else {
                    return nextIndex
                }
            })
        }, delay)
    }
    React.useEffect(() => {
        setIndex(0)
    }, [])
    const onCreate = (layouts: Layout[]) => {
        setLayouts(layouts)
        setIndex(-1)
        nextMessage(0)
        history.push('/project/split-flap')
    }
    const rows = layouts[0].length
    const columns = layouts[0][0].length
    let layout = layouts[index] ?? getRandomLayout(columns, rows)
    if (layout === layout4) {
        const time = moment().format('LT')
        layout = layout.map(line => line.replace('10:30 PM', time.length === 8 ? time : `0${time}`))
    }

    const boardSize = React.useMemo(() => ({ width: windowSize.width - 20, height: windowSize.height - 200 }), [windowSize])
    const isDemoData = desktopStartData === layouts || mobileStartData === layouts
    return <Switch>
        <Route path="/project/split-flap/create">
            <Creator onCreate={onCreate} initialLayouts={isDemoData ? undefined : layouts} />
        </Route>
        <Route>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
                {wideScreen && <div style={{ position: 'absolute', top: 30, right: 50 }}><Button onClick={() => history.push('/project/split-flap/create')}>{isDemoData ? 'Create' : 'Edit'}</Button></div>}
                <Board messageLayout={layout} onComplete={nextMessage} screenSize={boardSize} />
                {/* <CreateButton to="/project/split-flap/create">Create</CreateButton> */}
            </div>
        </Route>
    </Switch>
}


export default Marquee
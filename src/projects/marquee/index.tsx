import React from 'react'
import { Route, Switch } from 'react-router'
import Creator from './Creator'
import Board from './Board'
import { getRandomLayout, Layout } from './layout'
import { useWindowSize } from './ResizeListener'
import startData, { layout4 } from './startLayoutData'
import moment from 'moment'

const Marquee = () => {
    const [layouts, setLayouts] = React.useState<Layout[]>(startData)
    const [index, setIndex] = React.useState(-1)
    const nextMessage = () => {
        window.setTimeout(() => {
            setIndex(index => {
                const nextIndex = index + 1
                if (nextIndex === layouts.length) {
                    return -1
                } else {
                    return nextIndex
                }
            })
        }, 2000)
    }
    React.useEffect(() => {
        setIndex(0)
    }, [])
    // const onCreate = (messages: string[]) => {
    //     setMessages(messages)
    //     setIndex(-1)
    //     history.push('/project/split-flap')
    // }
    let layout = layouts[index] ?? getRandomLayout(40, 15)
    if (layout === layout4) {
        const time = moment().format('LT')
        layout = layout.map(line => line.replace('10:30 PM', time.length === 8 ? time : `0${time}`))
    }
    const windowSize = useWindowSize()
    const boardSize = React.useMemo(() => ({ width: windowSize.width - 20, height: windowSize.height - 200 }), [windowSize])
    return <Switch>
        <Route path="/project/split-flap/create">
            <Creator onCreate={setLayouts} />
        </Route>
        <Route>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
                <Board messageLayout={layout} onComplete={nextMessage} screenSize={boardSize} />
                {/* <CreateButton to="/project/split-flap/create">Create</CreateButton> */}
            </div>
        </Route>
    </Switch>
}


export default Marquee
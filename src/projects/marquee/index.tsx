import React from 'react'
import { Route, Switch, useHistory } from 'react-router'
import Creator from './Creator'
import Board from './Board'
import { getLayout, getRandomLayout } from './layout'
import { useWindowSize } from './ResizeListener'

const testMessages = [
    'This is a Split Flap board',
    'This was made by @ltm',
    'Make your own.                   Coming soon.',
]

const Marquee = () => {
    const history = useHistory()
    const [messages, setMessages] = React.useState<string[]>(testMessages)
    const [index, setIndex] = React.useState(-1)
    const nextMessage = () => {
        window.setTimeout(() => {
            setIndex(index => {
                const nextIndex = index + 1
                if (nextIndex === messages.length) {
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
    const onCreate = (messages: string[]) => {
        setMessages(messages)
        setIndex(-1)
        history.push('/project/split-flap')
    }
    const message = messages[index]
    const layout = message ? getLayout(message, 40, 15) : getRandomLayout(40, 15)
    const windowSize = useWindowSize()
    const boardSize = React.useMemo(() => ({ width: windowSize.width - 20, height: windowSize.height - 200 }), [windowSize])
    return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <Switch>
            <Route path="/project/split-flap/create">
                <Creator onCreate={onCreate} />
            </Route>
            <Route>
                <Board messageLayout={layout} onComplete={nextMessage} screenSize={boardSize} />
                {/* <CreateButton to="/project/split-flap/create">Create</CreateButton> */}
            </Route>
        </Switch>
    </div>
}


export default Marquee
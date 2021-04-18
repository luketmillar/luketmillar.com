import React from 'react'
import { Route, Switch, useHistory } from 'react-router'
import Creator from './Creator'
import Board from './Board'
// import { Link } from 'react-router-dom'
// import styled from 'styled-components'
import { getLayout, getRandomLayout } from './layout'

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
    return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <Switch>
            <Route path="/project/split-flap/create">
                <Creator onCreate={onCreate} />
            </Route>
            <Route>
                <Board messageLayout={layout} onComplete={nextMessage} screenSize={{ width: 1200, height: 1125 }} />
                {/* <CreateButton to="/project/split-flap/create">Create</CreateButton> */}
            </Route>
        </Switch>
    </div>
}

// const CreateButton = styled(Link)`
//     position: absolute;
//     top: 20px;
//     right: 20px;
//     color: white;
//     text-decoration: none;
//     font-weight: 900;
//     font-size: 2rem;
// `

export default Marquee
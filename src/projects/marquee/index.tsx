import React from 'react'
import { Route, Switch, useHistory } from 'react-router'
import Creator from './Creator'
import Board from './Board'
// import { Link } from 'react-router-dom'
// import styled from 'styled-components'
import { getLayout, getRandomLayout } from './layout'

const testMessages = [
    'This is a Split Flap board',
    'You can make your own',
    'This was made by @ltm',
]

const Marquee = () => {
    const history = useHistory()
    const [messages, setMessages] = React.useState<string[]>(testMessages)
    const [index, setIndex] = React.useState(-1)
    const nextMessage = () => {
        window.setTimeout(() => {
            setIndex(index => (index + 1) % messages.length)
        }, 2000)
    }
    React.useEffect(() => {
        if (index === -1) {
            setIndex(0)
        }
    }, [index])
    const onCreate = (messages: string[]) => {
        setMessages(messages)
        setIndex(-1)
        history.push('/project/split-flap')
    }
    const message = messages[index]
    const layout = message ? getLayout(message, 40, 15) : getRandomLayout(40, 15)
    return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }} onClick={nextMessage}>
        <Switch>
            <Route path="/project/split-flap/create">
                <Creator onCreate={onCreate} />
            </Route>
            <Route>
                <Board messageLayout={layout} onComplete={nextMessage} />
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
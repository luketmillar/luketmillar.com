import React from 'react'
import { Route, Switch, useHistory } from 'react-router'
import Creator from './Creator'
import Board from './Board'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const testMessages = [
    'This is a Split Flap board',
    'You can make your own',
    'click create In the top right',
]

const Marquee = () => {
    const history = useHistory()
    const [messages, setMessages] = React.useState<string[]>(testMessages)
    const [index, setIndex] = React.useState(-1)
    React.useEffect(() => {
        const interval = window.setInterval(() => {
            setIndex(index => (index + 1) % messages.length)
        }, 5000)
        return () => {
            window.clearInterval(interval)
        }
    }, [messages.length])
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
    return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <Switch>
            <Route path="/project/split-flap/create">
                <Creator onCreate={onCreate} />
            </Route>
            <Route>
                <Board message={message} width={20} height={7} />
                <CreateButton to="/project/split-flap/create">Create</CreateButton>
            </Route>
        </Switch>
    </div>
}

const CreateButton = styled(Link)`
    position: absolute;
    top: 20px;
    right: 20px;
    color: white;
    text-decoration: none;
    font-weight: 900;
    font-size: 2rem;
`

export default Marquee
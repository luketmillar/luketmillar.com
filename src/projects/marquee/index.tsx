import React from 'react'
import Board from './Board'

const messages = [
    "Good Afternoon",
    "What's up dummies?",
    "Buy Doge",
]

const Marquee = () => {
    const [message, setMessage] = React.useState('')
    const nextMessage = () => {
        const index = messages.indexOf(message)
        setMessage(messages[(index + 1) % messages.length])
    }
    return <div onClick={nextMessage} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <Board message={message} width={20} height={7} />
    </div>
}

export default Marquee
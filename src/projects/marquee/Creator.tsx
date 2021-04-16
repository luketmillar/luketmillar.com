import React from 'react'

const duplicate = (x: (i: number) => React.ReactNode, n: number) => Array.from(new Array(n), (_, i) => x(i))

interface IProps {
    onCreate: (messages: string[]) => void
}
const Creator = ({ onCreate }: IProps) => {
    const [count, setCount] = React.useState(1)
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.target as HTMLFormElement)
        const messages: string[] = []
        for (let i = 0; i < count; i++) {
            const message = formData.get(`message-${i}`)?.toString()
            if (message) {
                messages.push(message)
            }
        }
        if (messages.length > 0) {
            onCreate(messages)
        }
    }
    return <form onSubmit={handleSubmit}>
        <h1>Creator</h1>
        {duplicate(i => <div><input name={`message-${i}`} key={i} /></div>, count)}
        <h1 onClick={() => setCount(i => i - 1)}>-</h1>
        <h1 onClick={() => setCount(i => i + 1)}>+</h1>
        <button type="submit">Save</button>
    </form>
}

export default Creator
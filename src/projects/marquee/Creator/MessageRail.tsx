import React from 'react'
import styled from 'styled-components'
import { Layout } from '../layout'

interface IProps {
    layouts: Layout[]
    index: number
    selectLayout: (index: number) => void
}

const MessageRail = ({ layouts, index, selectLayout }: IProps) => {
    return <div style={{ height: 200, display: 'flex', alignItems: 'center', padding: '0 150px' }}>
        {layouts.map((message, i) => <MessageBox selected={index === i}>{message.join('')}</MessageBox>)}
    </div>
}

const MessageBox = styled.div<{ selected: boolean }>`
    ${props => props.selected && 'border: 1px solid white;'}
    background-color: #111;
    border-radius: 10px;

    height: 150px;
    width: 150px;
    padding: 10px;
    font-size: 10px;
`

export default MessageRail
import React from 'react'
import styled from 'styled-components'
import { Layout } from '../layout'
import Colors from 'colors'

interface IProps {
    layouts: Layout[]
    index: number
    selectLayout: (index: number) => void
    addLayout: () => void
    removeLayout: (index: number) => void
}

const MessageRail = ({ layouts, index, selectLayout, addLayout, removeLayout }: IProps) => {

    const onFocus = (i: number) => {
        selectLayout(i)
    }

    const handleKeyDown = (e: React.KeyboardEvent, i: number) => {
        if (e.key === "Backspace") {
            removeLayout(i)
        }
    }

    React.useEffect(() => {
        if (document.activeElement?.id !== `layout-${index}`) {
            document.getElementById(`layout-${index}`)?.focus()
        }
    }, [index])

    return <div style={{ height: 200, display: 'flex', alignItems: 'center', overflowX: 'auto' }}>
        <Spacer style={{ width: 150 }} />
        {layouts.map((message, i) => (
            <React.Fragment key={`message-box-${i}`}>
                {i > 0 && <Spacer />}
                <MessageBox id={`layout-${i}`} onFocus={() => onFocus(i)} onKeyDown={e => handleKeyDown(e, i)} tabIndex={0} selected={index === i}>{message.join('')}</MessageBox>
            </React.Fragment>
        ))}
        <Spacer />
        <AddNew onClick={addLayout}>+</AddNew>
        <Spacer style={{ width: 150 }} />
    </div>
}

const Spacer = styled.div`
    height: 16px;
    width: 16px;
    flex-shrink: 0;
`

const MessageBox = styled.div<{ selected?: boolean }>`
    ${props => props.selected ? 'border: 1px solid white;' : 'border: 1px solid transparent;'}
    background-color: #111;
    border-radius: 10px;

    flex-shrink: 0;

    height: 150px;
    width: 150px;
    padding: 10px;
    font-size: 10px;

    :hover {
        background-color: #222;
    }

    :focus {
        border-color: ${Colors.purple};
        outline: none;
    }
`

const AddNew = styled(MessageBox)`
    font-size: 48px;
    font-weight: 900;
    display: flex;
    align-items: center;
    justify-content: center;

    
`

export default MessageRail
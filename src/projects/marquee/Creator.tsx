import React from 'react'
import styled from 'styled-components'
import Board from './Board'
import * as generator from './generator'
import FocusManager from './FocusManager'
import LayoutManager from './LayoutManager'
import { useWindowSize } from './ResizeListener'

const onComplete = () => null

interface IProps {
    onCreate: (messages: string[]) => void
}
const Creator = ({ onCreate }: IProps) => {
    const layoutManager = React.useMemo(() => new LayoutManager(generator.emptyLayout(20, 10)), [])
    const focusManager = React.useMemo(() => new FocusManager(layoutManager.rows, layoutManager.columns), [layoutManager])
    const [layout, setLayout] = React.useState(layoutManager.layout)

    React.useEffect(() => {
        focusManager.sizeChanged(layoutManager.rows, layoutManager.columns)
    }, [focusManager, layoutManager.rows, layoutManager.columns])

    const handleCharacterChange = React.useCallback((row: number, column: number, character: string) => {
        if (character === 'Backspace') {
            setLayout(layoutManager.replaceCharacter(row, column, ' '))
            focusManager.goLeft()
        } else {
            setLayout(layoutManager.replaceCharacter(row, column, character))
            focusManager.goRight()
        }
    }, [focusManager, layoutManager])

    const addRow = (index: number) => setLayout(layoutManager.addRow(index))
    const addColumn = (index: number) => setLayout(layoutManager.addColumn(index))
    const subtractRow = (index: number) => setLayout(layoutManager.subtractRow(index))
    const subtractColumn = (index: number) => setLayout(layoutManager.subtractColumn(index))
    const reset = () => setLayout(layoutManager.reset())
    const windowSize = useWindowSize()
    const boardSize = React.useMemo(() => ({ width: windowSize.width - 300, height: windowSize.height - 400 }), [windowSize])

    return <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <Button onClick={reset}>Reset</Button>
        <div style={{ height: 12 }} />
        <AddSubtract onAdd={() => addRow(0)} onSubtract={() => subtractRow(0)} />
        <div style={{ height: 12 }} />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <AddSubtract onAdd={() => addColumn(0)} onSubtract={() => subtractColumn(0)} style={{ flexDirection: 'column' }} />
            <div style={{ width: 12 }} />
            <div>
                <Board editor onChangeMessage={handleCharacterChange} onKeyboardNavigation={focusManager.handleKeyboardEvent} messageLayout={layout} screenSize={boardSize} onComplete={onComplete} />
            </div>
            <div style={{ width: 12 }} />
            <AddSubtract onAdd={() => addColumn(layoutManager.columns)} onSubtract={() => subtractColumn(layoutManager.columns - 1)} style={{ flexDirection: 'column' }} />
        </div>
        <div style={{ height: 12 }} />
        <AddSubtract onAdd={() => addRow(layoutManager.rows)} onSubtract={() => subtractRow(layoutManager.rows - 1)} />
    </div>
}

const AddSubtract = ({ onAdd, onSubtract, style }: { onAdd: () => void, onSubtract: () => void, style?: React.CSSProperties }) => (
    <div style={{ display: 'flex', ...style }}>
        <Add onClick={onAdd} />
        <div style={{ width: 8, height: 8 }} />
        <Subtract onClick={onSubtract} />
    </div>)

const Add = ({ onClick }: { onClick: () => void }) => <AddPlusButton onClick={onClick}>+</AddPlusButton>
const Subtract = ({ onClick }: { onClick: () => void }) => <AddPlusButton onClick={onClick}>-</AddPlusButton>

const Button = styled.button`
    background-color: #111;
    border: none;
    border-radius: 5px;
    color: white;

    padding: 10px 18px;

    font-size: 18px;
    font-weight: 700;
    
    :hover {
        background-color: #222;
    }
`

const AddPlusButton = styled(Button)`
    font-size: 36px;
    font-weight: 900;
`

export default Creator
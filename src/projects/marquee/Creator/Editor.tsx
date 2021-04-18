import React from 'react'
import styled from 'styled-components'
import Board from '../Board'
import FocusManager from './FocusManager'
import LayoutManager from '../LayoutManager'
import { useWindowSize } from '../ResizeListener'
import { Layout } from '../layout'
import Button from './Button'

const useBoardSize = () => {
    const windowSize = useWindowSize()
    return React.useMemo(() => ({ width: windowSize.width - 300, height: windowSize.height - 400 }), [windowSize])
}

const onComplete = () => null

interface IProps {
    onChange: (layout: Layout) => void
    layout: Layout
    save: () => void
}
const Editor = ({ onChange, layout, save }: IProps) => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const layoutManager = React.useMemo(() => new LayoutManager(layout), [])
    const focusManager = React.useMemo(() => new FocusManager(layoutManager.rows, layoutManager.columns), [layoutManager])
    React.useEffect(() => {
        layoutManager.replaceLayout(layout)
    }, [layoutManager, layout])
    React.useEffect(() => {
        layoutManager.setOnChange(onChange)
    }, [layoutManager, onChange])

    React.useEffect(() => {
        focusManager.sizeChanged(layoutManager.rows, layoutManager.columns)
    }, [focusManager, layoutManager.rows, layoutManager.columns])

    const handleCharacterChange = React.useCallback((row: number, column: number, character: string) => {
        if (character === 'Backspace') {
            layoutManager.replaceCharacter(row, column, ' ')
            focusManager.goLeft()
        } else {
            layoutManager.replaceCharacter(row, column, character)
            focusManager.goRight()
        }
    }, [focusManager, layoutManager])

    const addRow = (index: number) => layoutManager.addRow(index)
    const addColumn = (index: number) => layoutManager.addColumn(index)
    const subtractRow = (index: number) => layoutManager.subtractRow(index)
    const subtractColumn = (index: number) => layoutManager.subtractColumn(index)
    const reset = () => layoutManager.reset()
    const boardSize = useBoardSize()

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start' }}>
            <div style={{ display: 'flex' }}>
                <Button onClick={save}>Save</Button>
                <div style={{ width: 12 }} />
                <Button onClick={reset}>Reset</Button>
            </div>
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
    )
}

const AddSubtract = ({ onAdd, onSubtract, style }: { onAdd: () => void, onSubtract: () => void, style?: React.CSSProperties }) => (
    <div style={{ display: 'flex', ...style }}>
        <Add onClick={onAdd} />
        <div style={{ width: 8, height: 8 }} />
        <Subtract onClick={onSubtract} />
    </div>)

const Add = ({ onClick }: { onClick: () => void }) => <AddPlusButton onClick={onClick}>+</AddPlusButton>
const Subtract = ({ onClick }: { onClick: () => void }) => <AddPlusButton onClick={onClick}>-</AddPlusButton>

const AddPlusButton = styled(Button)`
    font-size: 36px;
    font-weight: 900;
`

export default Editor
import React from 'react'
import { Layout } from '../layout'
import Editor from './Editor'
import MessageRail from './MessageRail'
import * as generator from '../generator'

const needToAdjustSize = (layouts: Layout[], rows: number, columns: number) => {
    return !layouts.every(layout => layout.length === rows && layout[0].length === columns)
}
const adjustSize = (layouts: Layout[], rows: number, columns: number) => {
    // need to implement
    return layouts
}

interface IProps {
    onCreate: (layout: Layout[]) => void
}
const Creator = ({ onCreate }: IProps) => {
    const [layouts, setLayouts] = React.useState<Layout[]>([generator.emptyLayout(40, 15)])
    const [index, setIndex] = React.useState(0)
    const currentLayout = layouts[index]

    const handleEditorChange = React.useCallback((layout: Layout) => {
        setLayouts(layouts => {
            const rows = layout.length
            const columns = layout[0].length
            if (needToAdjustSize(layouts, rows, columns)) {
                const adjustedLayouts = adjustSize(layouts, rows, columns)
                return ([...adjustedLayouts.slice(0, index), layout, ...adjustedLayouts.slice(index + 1)])
            }
            return ([...layouts.slice(0, index), layout, ...layouts.slice(index + 1)])
        })
    }, [index])

    return <div>
        <MessageRail layouts={layouts} index={index} selectLayout={setIndex} />
        <Editor layout={currentLayout} onChange={handleEditorChange} />
    </div>
}

export default Creator
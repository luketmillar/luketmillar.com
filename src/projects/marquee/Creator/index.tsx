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

    const addLayout = () => {
        setLayouts(layouts => {
            const rows = layouts[0].length
            const columns = layouts[0][0].length
            return [...layouts, generator.emptyLayout(columns, rows)]
        })
        setIndex(layouts.length)
    }

    const removeLayout = (index: number) => {
        setLayouts(layouts => {
            const rows = layouts[0].length
            const columns = layouts[0][0].length
            if (layouts.length === 1) {
                // deleted the last one so just replace the list with a single empty
                return [generator.emptyLayout(columns, rows)]
            }
            return [...layouts.slice(0, index), ...layouts.slice(index + 1)]
        })
        setIndex(Math.max(0, index - 1))
    }

    return <div>
        <MessageRail layouts={layouts} index={index} selectLayout={setIndex} addLayout={addLayout} removeLayout={removeLayout} />
        <Editor key={index} layout={currentLayout} onChange={handleEditorChange} />
    </div>
}

export default Creator
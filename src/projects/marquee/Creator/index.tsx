import React from 'react'
import { Layout } from '../layout'
import Editor from './Editor'
import MessageRail from './MessageRail'
import * as generator from '../generator'
import { duplicate } from '../utils'

const needToAdjustSize = (layouts: Layout[], rows: number, columns: number) => {
    return !layouts.every(layout => layout.length === rows && layout[0].length === columns)
}
const adjustSize = (layouts: Layout[], rows: number, columns: number) => {
    return layouts.map(layout => {
        const currentRows = layout.length
        const currentColumns = layout[0].length
        if (currentRows !== rows) {
            while (layout.length < rows) {
                // add rows to make the same length
                layout.push(duplicate(() => ' ', currentColumns).join(''))
            }
            // remove rows to make the same length
            layout = layout.slice(0, rows)
        }
        if (currentColumns < columns) {
            const stringToAdd = duplicate(() => ' ', columns - currentColumns).join('')
            layout = layout.map(line => line + stringToAdd)
        } else if (currentColumns > columns) {
            layout = layout.map(line => line.slice(0, columns))
        }
        return layout
    })
}

interface IProps {
    onCreate: (layout: Layout[]) => void
    initialLayouts: Layout[] | undefined
}
const Creator = ({ onCreate, initialLayouts }: IProps) => {
    const [layouts, setLayouts] = React.useState<Layout[]>(initialLayouts ?? [generator.emptyLayout(30, 10)])
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
        <Editor key={index} layout={currentLayout} onChange={handleEditorChange} save={() => onCreate(layouts)} />
    </div>
}

export default Creator
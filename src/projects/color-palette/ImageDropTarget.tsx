import React from 'react'
import FileDropTarget from 'common/FileDragDrop'

type Ready = {
    type: 'ready',
    src: string
}
type Loading = {
    type: 'loading'
}
type Error = {
    type: 'error',
    err: any
}
export type State = Ready | Loading | Error

interface IProps {
    onChange: (state: State) => void
    children: React.ReactNode
}

const ImageDropTarget = ({ onChange, children }: IProps) => {
    const handleDrop = React.useCallback((files: File[]) => {
        const file = files[0]
        if (!file) {
            // no file?
            return
        }
        onChange({ type: 'loading' })
        readDataUrl(file).then(src => {
            onChange({ type: 'ready', src })
        }, err => {
            onChange({ type: 'error', err })
        })
    }, [onChange])
    return <FileDropTarget style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onFilesDropped={handleDrop}>
        {children}
    </FileDropTarget>
}

const readDataUrl = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        var fr = new FileReader()
        fr.onload = function () {
            if (typeof fr.result === 'string') {
                return resolve(fr.result)
            }
            return reject('this didnt work')
        }
        fr.onerror = function () {
            return reject('error')
        }
        fr.readAsDataURL(file)
    })
}

export default ImageDropTarget
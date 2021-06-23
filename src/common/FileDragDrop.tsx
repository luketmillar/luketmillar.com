import React from 'react'

const styles = {
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 999999
    },
    onDrag: {
        borderWidth: 5,
        borderStyle: 'dashed',
        borderColor: 'white',
        zIndex: 999999
    }
} as const

interface IProps {
    style?: React.CSSProperties
    children?: React.ReactNode
    onFilesDropped: (files: File[]) => void
}

interface IState {
    isDragging: boolean
}

export default class FileDropTarget extends React.Component<IProps, IState> {
    public _containerRef = React.createRef<HTMLDivElement>()
    public state = { isDragging: false }

    public render() {
        const { style, children } = this.props
        return (
            <div
                style={style}
                onDragEnter={this._handleDragEnter}
                onDrop={this._handleDrop}
                onDragOver={this._handleDragOver}
                ref={this._containerRef}
            >
                {this.state.isDragging ? (
                    <div onDragLeave={this._handleDragLeave} style={{ ...styles.container, ...styles.onDrag }} />
                ) : null}
                {children}
            </div>
        )
    }

    private _handleDragEnter = (e: any) => {
        if (!this.state.isDragging) {
            this.setState({ isDragging: true })
        }
    }

    private _handleDragLeave = (e: any) => {
        this.setState({ isDragging: false })
    }

    private _handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        if (e.dataTransfer.files.length) {
            this.props.onFilesDropped(Array.from(e.dataTransfer.files))
        }
        this.setState({ isDragging: false })
    }

    private _handleDragOver = (e: any) => {
        e.preventDefault()
    }
}

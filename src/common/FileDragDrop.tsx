import React, { useState, useRef } from 'react'

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

export default function FileDropTarget({ style, children, onFilesDropped }: IProps) {
    const [isDragging, setIsDragging] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)

    const handleDragEnter = (e: React.DragEvent) => {
        if (!isDragging) {
            setIsDragging(true)
        }
    }

    const handleDragLeave = (e: React.DragEvent) => {
        setIsDragging(false)
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        if (e.dataTransfer.files.length) {
            onFilesDropped(Array.from(e.dataTransfer.files))
        }
        setIsDragging(false)
    }

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault()
    }

    return (
        <div
            style={style}
            onDragEnter={handleDragEnter}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            ref={containerRef}
        >
            {isDragging ? (
                <div onDragLeave={handleDragLeave} style={{ ...styles.container, ...styles.onDrag }} />
            ) : null}
            {children}
        </div>
    )
}

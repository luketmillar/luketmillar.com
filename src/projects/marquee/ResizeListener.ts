import React from 'react'

const getSize = () => ({ width: window.innerWidth, height: window.innerHeight })

export const useWindowSize = () => {
    const [size, setSize] = React.useState(getSize())
    React.useEffect(() => {
        const onResize = () => {
            setSize(getSize())
        }
        window.addEventListener('resize', onResize)
        onResize()
        return () => {
            window.removeEventListener('resize', onResize)
        }
    }, [])
    return size
}
import React from 'react'

export const getWindowSize = () => ({ width: window.innerWidth, height: window.innerHeight })

export const useWindowSize = () => {
    const [size, setSize] = React.useState(getWindowSize())
    React.useEffect(() => {
        const onResize = () => {
            setSize(getWindowSize())
        }
        window.addEventListener('resize', onResize)
        onResize()
        return () => {
            window.removeEventListener('resize', onResize)
        }
    }, [])
    return size
}
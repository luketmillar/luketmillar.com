import React from 'react'

export const getWindowSize = () => ({ width: window.innerWidth, height: window.innerHeight })

const useWindowSize = () => {
    const [size, setSize] = React.useState(getWindowSize())
    React.useEffect(() => {
        const onResize = () => setSize(getWindowSize())
        window.addEventListener('resize', onResize)
        return () => window.removeEventListener('resize', onResize)
    }, [])
    return size
}

export default useWindowSize
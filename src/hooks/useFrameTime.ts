import React from 'react'

const useFrameTime = () => {
    const [frameTime, setFrameTime] = React.useState(performance.now())
    React.useEffect(() => {
        let frameId: number | undefined
        const frame = (time: number) => {
            setFrameTime(time)
            frameId = requestAnimationFrame(frame)
        }
        requestAnimationFrame(frame)
        return () => {
            if (frameId) {
                cancelAnimationFrame(frameId)
            }
        }
    }, [])
    return frameTime
}

export default useFrameTime
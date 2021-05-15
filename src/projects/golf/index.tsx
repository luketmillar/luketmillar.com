import { useWindowSize } from 'projects/marquee/ResizeListener'
import React from 'react'
import Controller from './Controller'

const Golf = () => {
    const ref = React.useRef<HTMLCanvasElement>(null)
    React.useEffect(() => {
        const controller = new Controller(ref.current!)
        controller.start()
        return () => controller.stop()
    }, [])
    return <FullScreenCanvas ref={ref} />
}

const FullScreenCanvas = React.forwardRef((_, ref: React.ForwardedRef<HTMLCanvasElement>) => {
    const size = useWindowSize()
    return <canvas ref={ref} width={size.width * window.devicePixelRatio} height={size.height * window.devicePixelRatio} style={{ width: size.width, height: size.height }} />
})

export default Golf
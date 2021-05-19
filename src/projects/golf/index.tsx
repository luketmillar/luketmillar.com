import React from 'react'
import { useSizes } from 'projects/canvasScene/Coordinates'
import InputHandler from 'projects/canvasScene/InputHandler'
import World from './World'
import View from './View'
import Controller from './Controller'


const world = new World()
const view = new View()
const controller = new Controller(world, view)
const worldSize = { width: 1080, height: 1920 }

const Golf = () => {
    const ref = React.useRef<HTMLCanvasElement>(null)
    React.useEffect(() => {
        view.canvas = ref.current!
        controller.start()
        return () => controller.stop()
    }, [])

    return <>
        <FullScreenCanvas ref={ref} />
        <InputHandler onMouseDown={controller.onMouseDown} onMouseMove={controller.onMouseMove} onMouseUp={controller.onMouseUp} />
    </>
}


const FullScreenCanvas = React.forwardRef((_, ref: React.ForwardedRef<HTMLCanvasElement>) => {
    const { screenSize } = useSizes()
    const screenAspectRatio = screenSize.width / screenSize.height
    const worldAspectRatio = worldSize.width / worldSize.height
    const canvasSize = { width: 0, height: 0 }
    if (worldAspectRatio < screenAspectRatio) {
        canvasSize.height = worldSize.height
        canvasSize.width = worldSize.height * screenAspectRatio
    } else {
        canvasSize.width = worldSize.width
        canvasSize.height = worldSize.width / screenAspectRatio
    }
    React.useEffect(() => {
        view.gutter = { left: (canvasSize.width - worldSize.width) / 2, top: (canvasSize.height - worldSize.height) / 2 }
    }, [canvasSize.width, canvasSize.height])
    return <canvas ref={ref} width={canvasSize.width} height={canvasSize.height} style={{ width: screenSize.width, height: screenSize.height }} />
})


export default Golf
import React from 'react'
import FullScreenCanvas from 'projects/canvasScene/FullscreenCanvas'
import InputHandler from 'projects/canvasScene/InputHandler'
import World from './World'
import View from './View'
import Controller from './Controller'


const world = new World()
const view = new View()
const controller = new Controller(world, view)

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


export default Golf
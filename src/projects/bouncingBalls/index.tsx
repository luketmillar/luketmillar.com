import React from 'react'
import Controller from './Controller'
import World from './World'
import InputHandler from 'projects/canvasScene/InputHandler'
import FullscreenCanvas from 'projects/canvasScene/FullscreenCanvas'

const useController = (ref: React.RefObject<HTMLCanvasElement>) => {
    const [controller, setController] = React.useState<Controller | undefined>()
    React.useEffect(() => {
        const controller = new Controller(ref.current!, new World())
        setController(controller)
        controller.start()
        return () => controller.stop()
    }, [setController, ref])
    return controller
}

const BouncingBalls = () => {
    const ref = React.useRef<HTMLCanvasElement>(null)
    const controller = useController(ref)
    React.useEffect(() => {
        if (controller) {
            setTimeout(() => {
                controller?.drop()
            }, 2000)
        }
    }, [controller])
    return <>
        <FullscreenCanvas ref={ref} />
        {controller && <InputHandler onClick={controller.onClick} onMouseMove={controller.onMouseMove} />}
    </>
}


export default BouncingBalls
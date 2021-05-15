import { useSizes } from './Coordinates'
import React from 'react'
import Controller from './Controller'
import InputHandler from './InputHandler'

const useController = (ref: React.RefObject<HTMLCanvasElement>) => {
    const [controller, setController] = React.useState<Controller | undefined>()
    React.useEffect(() => {
        const controller = new Controller(ref.current!)
        setController(controller)
        controller.start()
        return () => controller.stop()
    }, [setController, ref])
    return controller
}

const Golf = () => {
    const ref = React.useRef<HTMLCanvasElement>(null)
    const controller = useController(ref)
    return <>
        <FullScreenCanvas ref={ref} />
        {controller && <InputHandler onClick={controller.onClick} onMouseMove={controller.onMouseMove} />}
    </>
}

const FullScreenCanvas = React.forwardRef((_, ref: React.ForwardedRef<HTMLCanvasElement>) => {
    const { screenSize, worldSize } = useSizes()
    return <canvas ref={ref} width={worldSize.width} height={worldSize.height} style={{ width: screenSize.width, height: screenSize.height }} />
})

export default Golf
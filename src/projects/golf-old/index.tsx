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

const Golf = () => {
    usePreventBodyScroll()
    const ref = React.useRef<HTMLCanvasElement>(null)
    const controller = useController(ref)
    return <>
        <FullscreenCanvas ref={ref} />
        {controller && <InputHandler onClick={controller.onClick} onMouseMove={controller.onMouseMove} onMouseDown={controller.onMouseDown} onMouseUp={controller.onMouseUp} />}
    </>
}

const usePreventBodyScroll = () => {
    React.useEffect(() => {
        let timeout: number | undefined
        const scrollY = window.scrollY
        const bodyWidth = document.body.style.width
        timeout = window.setTimeout(() => {
            timeout = undefined
            document.body.style.position = 'fixed'
            document.body.style.top = `-${scrollY}px`
            document.body.style.width = '100%'
        }, 100)
        return () => {
            if (timeout) {
                window.clearTimeout(timeout)
            } else {
                document.body.style.position = ''
                document.body.style.top = ''
                window.scrollTo(0, scrollY)
                document.body.style.width = bodyWidth
            }
        }
    }, [])
}


export default Golf
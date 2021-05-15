import Model from "./Model"
import View from "./View"

export default class Controller {
    private readonly view: View
    private readonly model: Model
    private running: boolean = false
    private startTime: number = 0
    constructor(canvas: HTMLCanvasElement) {
        this.model = new Model()
        this.view = new View(canvas)
    }

    public start() {
        this.running = true
        this.startTime = performance.now()
        this.queueFrame()
    }

    public stop() {
        this.running = false
    }

    private loop = (frameTime: number) => {
        if (!this.running) {
            return
        }
        this.queueFrame()
        const time = frameTime - this.startTime
        this.model.update(time)
        this.view.render(this.model)
    }

    private queueFrame() {
        requestAnimationFrame(this.loop)
    }
}
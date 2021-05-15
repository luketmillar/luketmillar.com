import * as Model from "./Model"
import View from "./View"

export default class Controller {
    protected readonly view: View
    protected readonly world: Model.World
    private running: boolean = false
    private startTime: number = 0
    private lastFrameTime: number = 0
    constructor(canvas: HTMLCanvasElement, world: Model.World) {
        this.world = world
        this.view = new View(canvas)
    }

    public start() {
        this.running = true
        this.startTime = this.now
        this.lastFrameTime = this.startTime
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
        const delta = frameTime - this.lastFrameTime
        this.world.update(time, delta)
        this.view.render(this.world)
        this.lastFrameTime = frameTime
    }

    private queueFrame() {
        requestAnimationFrame(this.loop)
    }

    protected get runTime() {
        return this.now - this.startTime
    }

    protected get now() {
        return performance.now()
    }
}
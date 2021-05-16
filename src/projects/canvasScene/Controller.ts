import * as Model from "./Model"
import View from "./View"

export default class Controller<W extends Model.World> {
    protected readonly view: View
    protected readonly world: W
    private running: boolean = false
    private startTime: number = 0
    private lastFrameTime: number = 0
    constructor(canvas: HTMLCanvasElement, world: W) {
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
        if (delta > 500) {
            this.startTime += delta
            this.lastFrameTime = frameTime
            return
        }
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
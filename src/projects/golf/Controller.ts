import * as Model from "./Model"
import { Position } from "./types"
import View from "./View"

export default class Controller {
    private readonly view: View
    private readonly world: Model.World
    private running: boolean = false
    private startTime: number = 0
    private lastFrameTime: number = 0
    constructor(canvas: HTMLCanvasElement) {
        this.world = new Model.World()
        this.view = new View(canvas)
    }

    public start() {
        this.running = true
        this.startTime = this.time
        this.lastFrameTime = this.startTime
        this.queueFrame()
    }

    public stop() {
        this.running = false
    }

    public onClick = (position: Position) => {
        const shape = this.world.getShape(position)
        shape?.startForces(this.time)
    }

    public onMouseMove = (position: Position) => {
        const shape = this.world.getShape(position)
        shape?.startForces(this.time)
    }

    private loop = (frameTime: number) => {
        if (!this.running) {
            return
        }
        this.queueFrame()
        const time = frameTime - this.startTime
        const delta = frameTime - this.lastFrameTime
        this.world.update(time, delta, this.view.size)
        this.view.render(this.world)
        this.lastFrameTime = frameTime
    }

    private queueFrame() {
        requestAnimationFrame(this.loop)
    }

    private get time() {
        return performance.now()
    }
}
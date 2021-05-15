import * as Model from "../Model"
import { drawCircle } from './Circle'

export default class View {
    private readonly canvas: HTMLCanvasElement
    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas
    }

    public get size() {
        return { width: this.width, height: this.height }
    }

    public render(world: Model.World) {
        this.ctx.clearRect(0, 0, this.width, this.height)
        world.shapes.forEach(shape => this.renderShape(shape))
    }

    private renderShape(shape: Model.Shape) {
        if (shape instanceof Model.Circle) {
            drawCircle(shape, this.ctx)
        }
    }

    private get ctx() {
        return this.canvas.getContext('2d')!
    }

    private get width() {
        return this.canvas.width
    }

    private get height() {
        return this.canvas.height
    }
}
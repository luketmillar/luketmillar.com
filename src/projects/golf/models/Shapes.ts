import { IBodyRenderOptions } from 'matter-js'
import { Position } from 'projects/canvasScene/types'

export abstract class Shape {
    public options: IBodyRenderOptions
    constructor(options?: IBodyRenderOptions) {
        this.options = options ?? {}
    }

    public render(ctx: CanvasRenderingContext2D) {
        ctx.save()
        this.draw(ctx)
        ctx.restore()
    }
    protected abstract draw(ctx: CanvasRenderingContext2D): void
}

export class Circle extends Shape {
    public position: Position
    public radius: number
    constructor(position: Position, radius: number, options?: IBodyRenderOptions) {
        super(options)
        this.position = position
        this.radius = radius
    }

    public draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath()
        ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI)
        if (this.options.fillStyle) {
            ctx.fillStyle = this.options.fillStyle
            ctx.fill()
        }
        if (this.options.strokeStyle) {
            ctx.strokeStyle = this.options.strokeStyle
            ctx.lineWidth = this.options.lineWidth ?? 1
            ctx.stroke()
        }
    }
}

export class Line extends Shape {
    public a: Position
    public b: Position
    constructor(a: Position, b: Position, options?: IBodyRenderOptions) {
        super(options)
        this.a = a
        this.b = b
    }

    public draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath()
        ctx.lineWidth = this.options.lineWidth ?? 1
        ctx.strokeStyle = this.options.strokeStyle ?? '#000'
        ctx.beginPath()
        ctx.moveTo(this.a.x, this.a.y)
        ctx.lineTo(this.b.x, this.b.y)
        ctx.stroke()
    }
}
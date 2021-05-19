import { Body } from 'matter-js'
import { IView, IWorld } from './BaseController'
import * as Shapes from './models/Shapes'

export default class View implements IView {
    private _canvas: HTMLCanvasElement | undefined
    public get canvas() {
        return this._canvas!
    }
    public set canvas(value: HTMLCanvasElement) {
        this._canvas = value
    }
    private _gutter: { left: number, top: number } = { left: 0, top: 0 }
    public set gutter(value: { left: number, top: number }) {
        this._gutter = value
    }
    public get gutter() {
        return this._gutter
    }

    public render = (world: IWorld) => {
        const ctx = this.ctx
        ctx.save()
        ctx.clearRect(0, 0, this.width, this.height)

        ctx.save()
        ctx.transform(1, 0, 0, 1, this.gutter.left, this.gutter.top)
        ctx.fillStyle = '#000'
        ctx.fillRect(0, 0, 1080, 1920)
        this.renderBodies(ctx, world.allBodies())
        this.renderShapes(ctx, world.allShapes())
        ctx.restore()

        ctx.fillStyle = '#111'
        ctx.fillRect(0, 0, this.gutter.left, this.height)
        ctx.fillRect(1080 + this.gutter.left, 0, this.gutter.left, this.height)

        ctx.restore()
    }

    private renderBodies = (ctx: CanvasRenderingContext2D, bodies: Body[]) => {
        bodies.forEach(body => {
            ctx.save()
            ctx.fillStyle = body.render.fillStyle ?? '#fff'
            ctx.beginPath()
            ctx.moveTo(body.vertices[0].x, body.vertices[0].y)
            body.vertices.slice(1).forEach(vertex => ctx.lineTo(vertex.x, vertex.y))
            ctx.fill()
            ctx.restore()
        })
    }

    private renderShapes = (ctx: CanvasRenderingContext2D, shapes: Shapes.Shape[]) => {
        shapes.forEach(shape => shape.render(ctx))
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
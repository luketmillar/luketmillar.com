import { Color, Position, Stroke } from "../types"
import Shape, { ForceOptions } from './Shape'
import { createBounds } from "../Bounds"

export type RectangleOptions = {
    position: Position
    width: number
    height: number
    fill?: Color
    stroke?: Stroke
}

export default class Rectangle extends Shape {
    public width: number
    public height: number
    public fill?: Color
    public stroke?: Stroke
    constructor(options: RectangleOptions, forces?: ForceOptions) {
        super(options.position, forces)
        this.width = options.width
        this.height = options.height
        this.fill = options.fill
        this.stroke = options.stroke
    }

    public intersects(position: Position) {
        const bounds = this.bounds()
        if (position.x < bounds.left) {
            return false
        }
        if (position.x > bounds.right) {
            return false
        }
        if (position.y < bounds.top) {
            return false
        }
        if (position.y > bounds.bottom) {
            return false
        }
        return true
    }

    public bounds() {
        return createBounds({
            middle: this.position.y,
            center: this.position.x,
            height: this.height,
            width: this.width,
        })
    }
}
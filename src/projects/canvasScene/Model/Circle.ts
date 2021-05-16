import { Color, Position, Stroke } from "../types"
import Shape, { ForceOptions } from './Shape'
import * as Coordinates from '../Coordinates'
import { createBounds } from "../Bounds"

export type CircleOptions = {
    position: Position
    radius: number
    fill?: Color
    stroke?: Stroke
}

export default class Circle extends Shape {
    public radius: number
    public fill?: Color
    public stroke?: Stroke
    constructor(options: CircleOptions, forces?: ForceOptions) {
        super(options.position, forces)
        this.radius = options.radius
        this.fill = options.fill
        this.stroke = options.stroke
    }

    public intersects(position: Position) {
        const distanceToCenter = Coordinates.distance(position, this.position)
        return distanceToCenter < this.radius
    }

    public bounds() {
        return createBounds({
            top: this.position.y - this.radius,
            bottom: this.position.y + this.radius,
            left: this.position.x - this.radius,
            right: this.position.x + this.radius,
        })
    }
}
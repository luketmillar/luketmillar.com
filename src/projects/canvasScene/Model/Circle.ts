import { Color, Position, Stroke } from "../types"
import Shape from './Shape'
import * as Coordinates from '../Coordinates'
import { Force } from "./Forces"

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
    constructor(options: CircleOptions, forces?: Force[]) {
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
        return {
            top: this.position.y - this.radius,
            bottom: this.position.y + this.radius,
            left: this.position.x - this.radius,
            right: this.position.x + this.radius,
        }
    }
}
import { Color, Position, Stroke } from "../types"
import Shape from './Shape'

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
    constructor(options: CircleOptions) {
        super(options.position)
        this.radius = options.radius
        this.fill = options.fill
        this.stroke = options.stroke
    }
}
import { Circle } from "."
import { Position, Size } from "../types"
import { Gravity, Velocity } from './Forces'
import Shape from './Shape'

export default class World {
    public readonly shapes: Shape[] = []
    constructor() {
        const ball = new Circle({ position: { x: 200, y: 2000 }, radius: 50, fill: '#0ff' })
        ball.forces = [new Velocity({ x: 2000, y: -2000 }), new Gravity({ x: 0, y: 100 })]
        this.shapes.push(ball)

        const ball2 = new Circle({ position: { x: 3000, y: 1000 }, radius: 100, fill: '#fff' })
        ball2.forces = [new Velocity({ x: -800, y: -2000 }), new Gravity({ x: 0, y: 100 })]
        this.shapes.push(ball2)

    }
    public update(time: number, delta: number, size: Size) {
        this.shapes.forEach(shape => shape.update(time, delta))
    }

    public start(time: number) {
        this.shapes.forEach(shape => shape.forces.forEach(force => force.start(time)))
    }

    public getShape(position: Position) {
        const shape = this.shapes.find(shape => shape.intersects(position))
        return shape
    }
}
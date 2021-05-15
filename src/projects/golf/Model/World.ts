import { Circle } from "."
import { Size } from "../types"
import { Gravity, Velocity } from './Forces'
import Shape from './Shape'

export default class World {
    public readonly shapes: Shape[] = []
    constructor() {
        const gravity = new Gravity({ x: 0, y: 50 })

        const ball = new Circle({ position: { x: 200, y: 2000 }, radius: 50, fill: '#0ff' })
        ball.forces = [new Velocity({ x: 1000, y: -2000 }), gravity]
        this.shapes.push(ball)

        const ball2 = new Circle({ position: { x: 3000, y: 2000 }, radius: 100, fill: '#fff' })
        ball2.forces = [new Velocity({ x: -500, y: -3000 }), gravity]
        this.shapes.push(ball2)

    }
    public update(time: number, delta: number, size: Size) {
        this.shapes.forEach(shape => shape.update(time, delta))
    }
}
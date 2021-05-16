import { World, Circle } from "../canvasScene/Model"

export default class GolfWorld extends World {
    constructor() {
        const ball = new Circle({ position: { x: 200, y: 2000 }, mass: 1, radius: 50, fill: '#0ff' })
        // ball.forces = [new Forces.Velocity({ x: 2000, y: -2000 }), new Forces.Gravity({ x: 0, y: 100 })]

        const ball2 = new Circle({ position: { x: 3000, y: 1000 }, mass: 1, radius: 100, fill: '#fff' })
        // ball2.forces = [new Forces.Velocity({ x: -800, y: -2000 }), new Forces.Gravity({ x: 0, y: 100 })]

        super([ball, ball2])
    }
}
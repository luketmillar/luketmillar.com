import { getWorldSize } from "projects/canvasScene/Coordinates"
import { World, Circle, Shape, Rectangle } from "../canvasScene/Model"

const colors = ['#005f73', '#0a9396', '#94d2bd', '#e9d8a6', '#ee9b00', '#ca6702', '#bb3e03', '#ae2012', '#9b2226']

const minRadius = 30
const maxRadius = 80

const createBalls = (n: number) => {
    const worldSize = getWorldSize()
    const shapes: Shape[] = []
    for (let i = 0; i < n; i++) {
        const r = Math.round(Math.random() * maxRadius - minRadius) + minRadius
        const x = Math.round(Math.random() * (worldSize.width - r * 2)) + r
        const y = Math.round(Math.random() * (worldSize.height - r * 2)) + r
        const color = colors[Math.round(Math.random() * colors.length)]
        const velocity = -(Math.random() * 1000)
        const circle = new Circle({ position: { x, y }, radius: r, fill: color }, { velocity: { x: 0, y: velocity } })
        shapes.push(circle)
    }
    return shapes
}

const createFloor = () => {
    const worldSize = getWorldSize()
    return new Rectangle({ position: { x: worldSize.width / 2, y: worldSize.height - 10 }, width: worldSize.width, height: 20, fill: '#fff' })
}

export default class BouncingBallsWorld extends World {
    public readonly balls: Shape[]
    public readonly floor: Shape
    constructor() {
        const balls = createBalls(1000)
        const floor = createFloor()
        super([...balls, floor])
        this.balls = balls
        this.floor = floor
    }

    protected afterUpdate() {
        const floorBounds = this.floor.bounds()
        const landedBalls = this.balls.filter(ball => {
            const velocity = ball.velocity
            if (velocity.y <= 0) {
                return false
            }
            return ball.bounds().bottom >= floorBounds.top
        })
        landedBalls.forEach(ball => {
            const velocity = ball.velocity
            if (velocity.y < 40) {
                ball.gravity = { x: 0, y: 0 }
                ball.velocity = { x: 0, y: 0 }
                return
            }

            ball.velocity = { x: velocity.x, y: -(velocity.y * 0.5) }
        })
    }
}
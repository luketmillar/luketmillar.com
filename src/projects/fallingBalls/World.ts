import { getWorldSize } from "projects/canvasScene/Coordinates"
import { World, Circle, Shape, Rectangle } from "../canvasScene/Model"

const colors = ['#005f73', '#0a9396', '#94d2bd', '#e9d8a6', '#ee9b00', '#ca6702', '#bb3e03', '#ae2012', '#9b2226']

const minRadius = 10
const maxRadius = 80

const createBalls = (n: number) => {
    const worldSize = getWorldSize()
    const circles: Circle[] = []
    for (let i = 0; i < n; i++) {
        const r = Math.round(Math.random() * (maxRadius - minRadius)) + minRadius
        const x = Math.round(Math.random() * (worldSize.width - r * 2)) + r
        const y = Math.round(Math.random() * (worldSize.height - r * 2)) + r
        const color = colors[Math.round(Math.random() * colors.length)]
        const velocity = -(Math.random() * 1000)
        const circle = new Circle({ position: { x, y }, mass: 1, radius: r, fill: color }, { velocity: { x: 0, y: velocity } })
        circles.push(circle)
    }
    return circles
}

const createFloor = () => {
    const worldSize = getWorldSize()
    return new Rectangle({ position: { x: worldSize.width / 2, y: worldSize.height - 10 }, mass: 1, width: worldSize.width, height: 20, fill: '#fff' })
}

export default class FallingBallsWorld extends World {
    public readonly balls: Circle[]
    public readonly floor: Shape
    constructor() {
        const balls = createBalls(100)
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
            const boundVelocity = -(velocity.y * 0.7)
            ball.position.y = floorBounds.top - ball.radius
            if (boundVelocity > -40) {
                ball.gravity = { x: 0, y: 0 }
                ball.velocity = { x: velocity.x, y: 0 }
                return
            }
            ball.velocity = { x: velocity.x, y: boundVelocity }
        })
    }
}
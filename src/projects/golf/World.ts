import { getWorldSize } from "projects/canvasScene/Coordinates"
import { World, Circle, Rectangle, Shape } from "../canvasScene/Model"
import * as Collision from 'projects/canvasScene/Model/Collision'


const createWalls = () => {
    const worldSize = getWorldSize()
    const floor = new Rectangle({ position: { x: worldSize.width / 2, y: worldSize.height + 50 }, mass: Infinity, width: worldSize.width, height: 100, fill: '#222' })
    const ceiling = new Rectangle({ position: { x: worldSize.width / 2, y: - 50 }, mass: Infinity, width: worldSize.width, height: 100, fill: '#222' })
    const leftWall = new Rectangle({ position: { x: -50, y: worldSize.height / 2 }, mass: Infinity, width: 100, height: worldSize.height, fill: '#222' })
    const rightWall = new Rectangle({ position: { x: worldSize.width + 50, y: worldSize.height / 2 }, mass: Infinity, width: 100, height: worldSize.height, fill: '#222' })
    return [floor, ceiling, leftWall, rightWall]
}

export default class GolfWorld extends World {
    public readonly ball: Circle
    public readonly floor: Shape
    public readonly ceiling: Shape
    public readonly leftWall: Shape
    public readonly rightWall: Shape
    constructor() {
        const [floor, ceiling, leftWall, rightWall] = createWalls()
        const ball = new Circle({ position: { x: 500, y: 1500 }, mass: 1, radius: 50, fill: '#0ff' })
        super([ball, floor, ceiling, leftWall, rightWall])
        this.ball = ball
        this.floor = floor
        this.ceiling = ceiling
        this.leftWall = leftWall
        this.rightWall = rightWall
    }


    protected afterUpdate() {
        const ball = this.ball
        const velocity = ball.velocity

        if (Collision.intersect(ball, this.ceiling)) {
            ball.velocity.y = -velocity.y * 0.75
            ball.velocity.x *= 0.95
            ball.position.y = this.ceiling.bounds().bottom + ball.radius
            if (Math.abs(ball.velocity.y) < 40) {
                ball.velocity.y = 0
            }
        }
        if (Collision.intersect(ball, this.floor)) {
            ball.velocity.y = -velocity.y * 0.75
            ball.velocity.x *= 0.95
            ball.position.y = this.floor.bounds().top - ball.radius
            if (Math.abs(ball.velocity.y) < 40) {
                ball.velocity.y = 0
            }
        }
        if (Collision.intersect(ball, this.leftWall)) {
            ball.velocity.x = -velocity.x * 0.75
            ball.velocity.y *= 0.95
            ball.position.x = this.leftWall.bounds().right + ball.radius
            if (Math.abs(ball.velocity.x) < 40) {
                ball.velocity.x = 0
            }
        }
        if (Collision.intersect(ball, this.rightWall)) {
            ball.velocity.x = -velocity.x * 0.75
            ball.velocity.y *= 0.95
            ball.position.x = this.rightWall.bounds().left - ball.radius
        }
        if (Math.abs(ball.velocity.x) < 40) {
            ball.velocity.x = 0
        }
    }
}
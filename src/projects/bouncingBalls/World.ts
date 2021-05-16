import { getWorldSize } from "projects/canvasScene/Coordinates"
import { World, Circle, Shape, Rectangle } from "../canvasScene/Model"
import * as Collision from 'projects/canvasScene/Model/Collision'

const colors = ['#005f73', '#0a9396', '#94d2bd', '#e9d8a6', '#ee9b00', '#ca6702', '#bb3e03', '#ae2012', '#9b2226']

const minRadius = 20
const maxRadius = 80

const randomNegation = (value: number) => {
    const rand = Math.round(Math.random() * 2)
    if (rand === 0) {
        return value * -1
    }
    return value
}

const createBalls = (n: number) => {
    const worldSize = getWorldSize()
    const circles: Circle[] = []
    for (let i = 0; i < n; i++) {
        const r = Math.round(Math.random() * (maxRadius - minRadius)) + minRadius
        const x = Math.round(Math.random() * (worldSize.width - r * 2)) + r
        const y = Math.round(Math.random() * (worldSize.height - r * 2)) + r
        const color = colors[Math.round(Math.random() * colors.length)]
        const yVelocity = randomNegation(Math.random() * 1000)
        const xVelocity = randomNegation(Math.random() * 1000)
        const circle = new Circle({ position: { x, y }, radius: r, fill: color }, { velocity: { x: xVelocity, y: yVelocity } })
        circles.push(circle)
    }
    return circles
}

const createWalls = () => {
    const worldSize = getWorldSize()
    const floor = new Rectangle({ position: { x: worldSize.width / 2, y: worldSize.height + 30 }, width: worldSize.width, height: 100, fill: '#222' })
    const ceiling = new Rectangle({ position: { x: worldSize.width / 2, y: - 30 }, width: worldSize.width, height: 100, fill: '#222' })
    const leftWall = new Rectangle({ position: { x: -30, y: worldSize.height / 2 }, width: 100, height: worldSize.height, fill: '#222' })
    const rightWall = new Rectangle({ position: { x: worldSize.width + 30, y: worldSize.height / 2 }, width: 100, height: worldSize.height, fill: '#222' })
    return [floor, ceiling, leftWall, rightWall]
}

export default class BouncingBallsWorld extends World {
    public readonly balls: Circle[]
    public readonly floor: Shape
    public readonly ceiling: Shape
    public readonly leftWall: Shape
    public readonly rightWall: Shape
    constructor() {
        const balls = createBalls(10)
        const [floor, ceiling, leftWall, rightWall] = createWalls()
        super([...balls, floor, ceiling, leftWall, rightWall])
        this.balls = balls
        this.floor = floor
        this.ceiling = ceiling
        this.leftWall = leftWall
        this.rightWall = rightWall
    }

    protected afterUpdate() {
        const processedCollisions: Record<string, boolean> = {}
        this.balls.forEach(ball => {
            const velocity = ball.velocity

            if (Collision.intersect(ball, this.ceiling)) {
                ball.velocity.y = -velocity.y
                ball.position.y = this.ceiling.bounds().bottom + ball.radius
            }
            if (Collision.intersect(ball, this.floor)) {
                ball.velocity.y = -velocity.y
                ball.position.y = this.floor.bounds().top - ball.radius
            }
            if (Collision.intersect(ball, this.leftWall)) {
                ball.velocity.x = -velocity.x
                ball.position.x = this.leftWall.bounds().right + ball.radius
            }
            if (Collision.intersect(ball, this.rightWall)) {
                ball.velocity.x = -velocity.x
                ball.position.x = this.rightWall.bounds().left - ball.radius
            }

            this.balls.forEach(b => {
                if (b === ball) {
                    return
                }
                if (Collision.intersect(ball, b)) {
                    const key = getCollisionKey(ball.id, b.id)
                    if (processedCollisions[key]) {
                        return
                    }
                    const originalY = ball.velocity.y
                    ball.velocity.y = b.velocity.y
                    b.velocity.y = originalY

                    const originalX = ball.velocity.x
                    ball.velocity.x = b.velocity.x
                    b.velocity.x = originalX

                    processedCollisions[key] = true
                }
            })

        })
    }
}

const getCollisionKey = (a: string, b: string) => {
    return [a, b].sort().join(':')
}
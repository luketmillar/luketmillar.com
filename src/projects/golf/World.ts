import { getWorldSize } from "projects/canvasScene/Coordinates"
import { World, Circle, Rectangle, Shape } from "../canvasScene/Model"
import * as Collision from 'projects/canvasScene/Model/Collision'


export default class GolfWorld extends World {
    public level!: ILevel
    constructor() {
        super([])
        this.initialize()
    }

    public get ball() {
        return this.level.ball
    }

    protected afterUpdate() {
        if (Collision.intersect(this.ball, this.level.goal)) {
            this.level.hitGoal()
        }

        this.level.obstacles().forEach(shape => {
            if (Collision.intersect(this.ball, shape)) {
                if (this.ball.velocity.x > 0) {
                    this.ball.position.x = shape.bounds().left - this.ball.radius
                } else {
                    this.ball.position.x = shape.bounds().right + this.ball.radius
                }

                this.ball.velocity.x = -this.ball.velocity.x * 0.95
            }
        })

        const worldSize = getWorldSize()
        if (this.ball.bounds().top > worldSize.height) {
            this.initialize()
        } else if (this.ball.bounds().right < 0) {
            this.initialize()
        } else if (this.ball.bounds().left > worldSize.width) {
            this.initialize()
        }
    }

    private initialize() {
        this.shapes = []
        this.level = new Level2()
        this.level.getShapes().forEach(shape => {
            this.addShape(shape)
        })
    }
}

interface ILevel {
    ball: Circle
    goal: Circle
    hitGoal: () => void
    getShapes: () => Shape[]
    obstacles: () => Shape[]
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
class Level1 implements ILevel {
    public ball: Circle
    public goal: Circle
    public wall: Rectangle
    constructor() {
        const worldSize = getWorldSize()
        this.ball = new Circle({ position: { x: worldSize.width / 6, y: worldSize.height * 0.75 }, mass: 1, radius: 50, fill: '#0ff' })
        this.goal = new Circle({ position: { x: worldSize.width * 0.8, y: worldSize.height * 0.3 }, mass: 0, radius: 50, stroke: { color: '#fff', width: 2 } })
        this.wall = new Rectangle({ position: { x: worldSize.width * 0.5, y: worldSize.height * 0.5 }, mass: Infinity, width: 20, height: worldSize.height * 0.6, fill: '#fff' })
    }

    public hitGoal() {
        this.goal.stroke = undefined
        this.goal.fill = '#fff'
    }

    public getShapes() {
        return [this.ball, this.goal, this.wall]
    }

    public obstacles() {
        return [this.wall]
    }
}

class Level2 implements ILevel {
    public ball: Circle
    public goal: Circle
    public wall: Rectangle
    constructor() {
        const worldSize = getWorldSize()
        this.ball = new Circle({ position: { x: worldSize.width / 6, y: worldSize.height * 0.75 }, mass: 1, radius: 50, fill: '#0ff' })
        this.goal = new Circle({ position: { x: worldSize.width * 0.8, y: worldSize.height * 0.3 }, mass: 0, radius: 50, stroke: { color: '#fff', width: 2 } })
        this.wall = new Rectangle({ position: { x: worldSize.width * 0.5, y: worldSize.height * 0.5 }, mass: Infinity, width: 20, height: worldSize.height * 0.6, fill: '#fff' })
    }

    public hitGoal() {
        this.goal.stroke = undefined
        this.goal.fill = '#fff'
    }

    public getShapes() {
        return [this.ball, this.goal, this.wall]
    }

    public obstacles() {
        return [this.wall]
    }
}
import { Body } from 'matter-js'
import { Position } from 'projects/canvasScene/types'
import Ball from '../models/Ball'
import Goal from '../models/Goal'
import Wall from '../models/Wall'

interface ILevel {
    ball: Position
    goal: Position
    walls: Wall[]
}

export default class Level {
    public readonly ball: Ball
    public readonly goal: Goal
    public readonly walls: Wall[]
    constructor(config: ILevel) {
        this.ball = new Ball(config.ball.x, config.ball.y)
        this.goal = new Goal(config.goal.x, config.goal.y)
        this.walls = config.walls
    }

    public getObjects() {
        return [this.goal, this.ball, ...this.walls]
    }

    public isDead() {
        return this.ball.isOutOfBounds()
    }

    public hitEnd() {
        this.goal.hit()
    }

    public testCompletion(a: Body, b: Body) {
        return (a === this.ball.body || b === this.ball.body) && (a === this.goal.body || b === this.goal.body)
    }
}


export const Levels = [
    {
        goal: { x: 2000, y: 1500 }, ball: { x: 500, y: 1500 }, walls: [
            new Wall(1000, 1500, 1000, 10, Math.PI / 2),
            new Wall(1370, 850, 800, 10, -Math.PI / 8),
            new Wall(2000, 1000, 500, 10, -Math.PI / 8),
            new Wall(1500, 1500, 500, 10, Math.PI / 8),
        ]
    },
    { goal: { x: 2500, y: 1500 }, ball: { x: 500, y: 1500 }, walls: [new Wall(1500, 1500, 2000, 10, Math.PI / 2)] },
]
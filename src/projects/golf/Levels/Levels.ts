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
        ball: { x: 540, y: 400 },
        goal: { x: 540, y: 1500 },
        walls: []
    },
    {
        ball: { x: 200, y: 960 },
        goal: { x: 880, y: 960 },
        walls: [
            new Wall(540, 960, 100, 10, Math.PI / 2)
        ]
    },
    {
        ball: { x: 200, y: 960 },
        goal: { x: 880, y: 960 },
        walls: [
            new Wall(540, 850, 300, 10, Math.PI / 2),
            new Wall(540, 700, 1080, 10, Math.PI),
            new Wall(540, 1200, 700, 10, Math.PI),
        ]
    },
    {
        ball: { x: 200, y: 1300 },
        goal: { x: 800, y: 1250 },
        walls: [
            new Wall(400, 1200, 500, 10, Math.PI / 2),
            new Wall(540, 890, 300, 10, -Math.PI / 8),
            new Wall(800, 1000, 300, 10, -Math.PI / 8),
            new Wall(600, 1300, 300, 10, Math.PI / 8),
        ]
    },

]
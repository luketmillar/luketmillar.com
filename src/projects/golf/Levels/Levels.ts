import { Body } from 'matter-js'
import { Position } from 'projects/canvasScene/types'
import Ball from '../models/Ball'
import Goal from '../models/Goal'
import Wall from '../models/Wall'
import Box from '../models/Box'

type Obstacle = Box | Wall

interface ILevel {
    ball: Position
    goal: Position
    walls: Obstacle[]
}

export default class Level {
    public readonly ball: Ball
    public readonly goal: Goal
    public readonly walls: Obstacle[]
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
        ball: { x: 540, y: 1500 },
        goal: { x: 540, y: 400 },
        walls: []
    },
    {
        ball: { x: 540, y: 400 },
        goal: { x: 880, y: 400 },
        walls: [
            new Wall(650, 400, 100, 10, Math.PI * 0.5),
        ]
    },
    {
        ball: { x: 880, y: 400 },
        goal: { x: 200, y: 400 },
        walls: [
            new Wall(540, 600, 800, 10, Math.PI),
            new Wall(540, 200, 800, 10, Math.PI),
            new Box(540, 500, 50, 50, Math.PI),
            new Box(540, 450, 50, 50, Math.PI),
            new Box(540, 400, 50, 50, Math.PI),
            new Box(540, 350, 50, 50, Math.PI),
            new Box(540, 300, 50, 50, Math.PI),
            new Box(540, 250, 50, 50, Math.PI),
            new Box(540, 200, 50, 50, Math.PI),
        ]
    },
    {
        ball: { x: 200, y: 400 },
        goal: { x: 880, y: 960 },
        walls: [
            new Wall(480, 820, 1000, 10, Math.PI * .22)
        ]
    },
    {
        ball: { x: 880, y: 960 },
        goal: { x: 200, y: 960 },
        walls: [
            new Wall(540, 850, 300, 10, Math.PI / 2),
            new Wall(540, 700, 1080, 10, Math.PI),
            new Wall(540, 1800, 700, 10, Math.PI),
        ]
    },
    {
        ball: { x: 200, y: 960 },
        goal: { x: 800, y: 1250 },
        walls: [
            new Wall(400, 1000, 900, 10, Math.PI / 2),
            new Wall(540, 500, 300, 10, -Math.PI / 8),
            new Wall(800, 600, 300, 10, -Math.PI / 8),
            new Wall(600, 800, 300, 10, Math.PI / 8),
            new Wall(800, 1000, 300, 10, -Math.PI / 8),
            new Wall(600, 1300, 300, 10, Math.PI / 8),
        ]
    },
    {
        ball: { x: 800, y: 1250 },
        goal: { x: 700, y: 1350 },
        walls: [
            new Wall(720, 1430, 200, 10, Math.PI / 6),
            new Wall(340, 1200, 200, 10, Math.PI / 6),
            new Wall(700, 1150, 700, 10, Math.PI * 0.4),
        ]
    },
]
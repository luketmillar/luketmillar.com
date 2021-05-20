import { Body } from 'matter-js'
import { Position, Vector } from 'projects/canvasScene/types'
import BaseWorld from './BaseWorld'
import Level, { Levels } from './Levels/Levels'

export default class World extends BaseWorld {
    public level: Level | undefined
    private currentLevel: number = 0
    private ballIsStoppedTimeout: number | undefined
    private lastBallPosition: Position | undefined
    public throwBall = (velocity: Vector) => {
        this.level?.ball.start(velocity)
    }
    protected createWorld = () => {
        this.level = new Level(Levels[this.currentLevel])
        this.level.getObjects().forEach(obj => this.addObject(obj))
    }

    protected onUpdate = () => {
        if (this.ball?.isRunning) {
            const currentPosition = this.ball.body.position
            console.log(this.ball.body.position, this.lastBallPosition)
            if (!positionsMatch(this.ball.body.position, this.lastBallPosition)) {
                window.clearTimeout(this.ballIsStoppedTimeout)
                this.ballIsStoppedTimeout = window.setTimeout(() => {
                    console.log(this.ball?.body.position, this.lastBallPosition)
                    if (positionsMatch(this.ball?.body.position, this.lastBallPosition))
                        this.ball?.stop()
                }, 500)
            }
            this.lastBallPosition = { x: currentPosition.x, y: currentPosition.y }
        }
        if (this.level?.isDead()) {
            this.restart()
            return
        }
        this.objects.forEach(obj => {
            if (obj.isOutOfBounds()) {
                this.removeObject(obj)
            }
        })
    }

    protected onCollision(a: Body, b: Body) {
        if (this.level?.testCompletion(a, b)) {
            this.level?.hitEnd()
            this.currentLevel++
            if (this.currentLevel >= Levels.length) {
                this.currentLevel = 0
            }
            this.restart()
        }
    }

    public get ball() {
        return this.level?.ball
    }

    public get goal() {
        return this.level?.goal
    }
}

const positionsMatch = (a: Position | undefined, b: Position | undefined) => {
    if (!a || !b) {
        return false
    }
    return positionEqual(a, b)
}

const positionEqual = (a: Position, b: Position) => {
    const round = (v: number) => Math.round(v * 10) / 10
    return round(a.x) === round(b.x) && round(a.y) === round(b.y)
}

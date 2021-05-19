import { Body } from 'matter-js'
import { Vector } from 'projects/canvasScene/types'
import BaseWorld from './BaseWorld'
import Level, { Levels } from './Levels/Levels'

export default class World extends BaseWorld {
    public level: Level | undefined
    private currentLevel: number = 0
    public throwBall = (velocity: Vector) => {
        this.level?.ball.start(velocity)
    }
    protected createWorld = () => {
        this.level = new Level(Levels[this.currentLevel])
        this.level.getObjects().forEach(obj => this.addObject(obj))
    }

    protected onUpdate = () => {
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

import BaseObject from "./Base"
import { Bodies, Body, Sleeping, Vector } from 'matter-js'

export default class Ball extends BaseObject {
    public readonly x: number
    public readonly y: number
    public body: Body
    constructor(x: number, y: number) {
        super()
        this.x = x
        this.y = y
        this.body = Bodies.circle(x, y, 30, { isSleeping: true, friction: 0, restitution: 1, render: { fillStyle: '#0ff' } })
    }

    public getBodies() {
        return [this.body]
    }

    public isOutOfBounds() {
        const bounds = this.body.bounds
        return bounds.min.y > 1920 || bounds.min.x > 1080 || bounds.max.x < 0
    }

    public start = (force: Vector) => {
        if (this.isRunning) {
            return
        }
        Sleeping.set(this.body, false)
        Body.applyForce(this.body, this.body.position, force)
    }

    public get isRunning() {
        return !this.body.isSleeping
    }
}

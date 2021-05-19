import BaseObject from "./Base"
import { Bodies, Body } from 'matter-js'

export default class Goal extends BaseObject {
    public readonly x: number
    public readonly y: number
    public body: Body
    public isReached: boolean
    constructor(x: number, y: number) {
        super()
        this.x = x
        this.y = y
        this.body = Bodies.circle(x, y, 40, { isStatic: true, isSensor: true, render: { strokeStyle: '#fff', lineWidth: 2 } })
        this.isReached = false
    }
    public getBodies() {
        return [this.body]
    }
    public onUpdate() {
    }
    public hit() {
        this.body.render.fillStyle = '#fff'
    }
    public isOutOfBounds() {
        return false
    }
}

import BaseObject from "./Base"
import { Bodies, Body } from 'matter-js'

export default class Box extends BaseObject {
    private readonly body: Body
    constructor(x: number, y: number, w: number, h: number, angle?: number) {
        super()
        this.body = Bodies.rectangle(x, y, w, h, { render: { fillStyle: '#fff' }, angle, restitution: 0, friction: 1 })
    }
    public getBodies() {
        return [this.body]
    }
}
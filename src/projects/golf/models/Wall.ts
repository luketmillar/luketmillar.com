import BaseObject from "./Base"
import { Bodies, Body } from 'matter-js'

export default class Wall extends BaseObject {
    private readonly body: Body
    constructor(x: number, y: number, w: number, h: number, angle: number) {
        super()
        this.body = Bodies.rectangle(x, y, w, h, { render: { fillStyle: '#fff' }, angle, isStatic: true })
    }
    public getBodies() {
        return [this.body]
    }
}
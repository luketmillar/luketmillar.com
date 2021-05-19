import BaseObject from "./Base"
import { Vector } from 'matter-js'
import { Position } from 'projects/canvasScene/types'
import * as Shapes from "./Shapes"

export default class Aimer extends BaseObject {
    public handle: Shapes.Circle
    public line: Shapes.Line
    constructor(position: Position, ballPosition: Position) {
        super()
        this.handle = new Shapes.Circle(position, 10, { fillStyle: '#fff' })
        this.line = new Shapes.Line(position, ballPosition, { strokeStyle: '#fff', lineWidth: 5 })
    }
    public getShapes() { return [this.handle, this.line] }
    public isOutOfBounds() {
        return false
    }
    public updatePosition = (position: Vector) => {
        this.handle.position = position
        this.line.a = position
    }
    public updateBallPosition = (position: Vector) => {
        this.line.b = position
    }
}

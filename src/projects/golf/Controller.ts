import { Circle, Line } from "projects/canvasScene/Model"
import Controller from "../canvasScene/Controller"
import { Position } from "../canvasScene/types"
import GolfWorld from "./World"

export default class GolfController extends Controller<GolfWorld> {
    private isDragging = false
    private mouseDownPosition: Position | undefined
    private handleCircle: Circle | undefined
    private handleLine: Line | undefined
    public onClick = (position: Position) => {

    }

    private get ball() {
        return this.world.ball
    }

    public onMouseMove = (position: Position) => {
        if (!this.mouseDownPosition) {
            return
        }
        const delta = { x: position.x - this.mouseDownPosition.x, y: position.y - this.mouseDownPosition.y }
        if (this.handleCircle) {
            this.handleCircle.position = position
        }
        if (this.handleLine) {
            this.handleLine.end = { x: this.handleLine.start.x + delta.x, y: this.handleLine.start.y + delta.y }
        }
    }

    public onMouseDown = (position: Position) => {
        this.mouseDownPosition = position
        this.isDragging = true
        this.handleCircle = new Circle({ position, mass: 1, radius: 10, fill: '#fff' })
        this.world.addShape(this.handleCircle)
        this.handleLine = new Line({ start: this.ball.position, mass: 1, end: this.ball.position, color: '#fff', thickness: 8 })
        this.world.addShape(this.handleLine)
    }

    public onMouseUp = (position: Position) => {
        if (!this.isDragging) {
            return
        }
        this.mouseDownPosition = undefined
        this.isDragging = false
        const shape = this.ball!
        const line = this.handleLine!
        shape.velocity = { x: (line.start.x - line.end.x) * 10, y: (line.start.y - line.end.y) * 10 }
        shape.gravity = { x: 0, y: 4000 }
        shape.startForces(this.runTime)
        if (this.handleCircle) {
            this.world.removeShape(this.handleCircle.id)
            this.handleCircle = undefined
        }
        this.world.removeShape(line.id)
        this.handleLine = undefined
    }
}
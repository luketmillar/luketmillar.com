import { Position } from "../types"
import Shape from './Shape'

export default abstract class World {
    public readonly shapes: Shape[] = []
    constructor(shapes: Shape[]) {
        this.shapes = shapes
    }

    public update(time: number, delta: number) {
        this.shapes.forEach(shape => shape.update(time, delta))
    }

    public start(time: number) {
        this.shapes.forEach(shape => shape.startForces(time))
    }

    public getShapeAtPosition(position: Position) {
        return this.shapes.slice().reverse().find(shape => shape.intersects(position))
    }
}

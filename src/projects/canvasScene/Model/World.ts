import { Position } from "../types"
import Shape from './Shape'

export default abstract class World {
    public shapes: Shape[] = []
    constructor(shapes: Shape[]) {
        this.shapes = shapes
    }

    public update(time: number, delta: number) {
        this.shapes.forEach(shape => shape.update(time, delta))
        this.afterUpdate()
    }

    public start(time: number) {
        this.shapes.forEach(shape => shape.startForces(time))
    }

    public getShapeAtPosition(position: Position) {
        return this.shapes.slice().reverse().find(shape => shape.intersects(position))
    }

    public addShape(s: Shape) {
        this.shapes.push(s)
    }

    public removeShape(id: string) {
        this.shapes = this.shapes.filter(s => s.id !== id)
    }

    protected afterUpdate() { }
}


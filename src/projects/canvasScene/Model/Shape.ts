import { Bounds, Position, Vector } from "../types"
import { Velocity } from "./Forces"
import { uuid } from 'uuidv4'

export type ShapeOptions = {
    position: Position
    mass: number
}
export type ForceOptions = { velocity?: Vector, gravity?: Vector }
export default abstract class Shape {
    public readonly id = uuid()
    public mass: number
    public position: Position
    public get velocity(): Vector {
        return this.force.velocity
    }
    public get momentum(): Vector {
        const v = this.velocity
        return { x: v.x * this.mass, y: v.y * this.mass }
    }
    public set velocity(value: Vector) {
        this.force.velocity = value
    }
    public get gravity(): Vector {
        return this.force.gravity
    }
    public set gravity(value: Vector) {
        this.force.gravity = value
    }
    public force: Velocity
    constructor(options: ShapeOptions, forces?: ForceOptions) {
        this.position = options.position
        this.mass = options.mass
        const velocity = forces?.velocity ?? { x: 0, y: 0 }
        const gravity = forces?.gravity ?? { x: 0, y: 0 }
        this.force = new Velocity(velocity, gravity)
    }

    public update(time: number, delta: number) {
        this.force.update(time, delta, this)
    }

    public startForces(time: number) {
        this.force.start(time)
    }

    public abstract intersects(position: Position): boolean
    public abstract bounds(): Bounds
}
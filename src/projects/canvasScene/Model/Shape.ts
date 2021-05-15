import { Bounds, Position } from "../types"
import { Force } from "./Forces"

export default abstract class Shape {
    public position: Position
    public forces: Force[] = []
    constructor(position: Position, forces?: Force[]) {
        this.position = position
        this.forces = forces ?? []
    }

    public update(time: number, delta: number) {
        this.forces.forEach(force => force.update(time, delta, this))
    }

    public startForces(time: number) {
        this.forces.forEach(force => force.start(time))
    }

    public abstract intersects(position: Position): boolean
    public abstract bounds(): Bounds
}
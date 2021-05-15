import type { Vector } from '../types'
import Shape from './Shape'

export abstract class Force {
    public abstract update(time: number, delta: number, shape: Shape): void
}

export class Velocity extends Force {
    public readonly value: Vector
    constructor(value: Vector) {
        super()
        this.value = value
    }
    public update(time: number, delta: number, shape: Shape) {
        shape.position.x += this.value.x * (delta / 1000)
        shape.position.y += this.value.y * (delta / 1000)
    }
}

// class Friction extends Force {
//     public update(time: number, delta: number, shape: Shape) {

//     }
// }

export class Gravity extends Force {
    private readonly value: Vector
    private readonly velocity: Velocity
    constructor(value: Vector) {
        super()
        this.value = value
        this.velocity = new Velocity({ x: 0, y: 0 })
    }
    public update(time: number, delta: number, shape: Shape) {
        this.velocity.value.x += this.value.x * time / 1000
        this.velocity.value.y += this.value.y * time / 1000
        this.velocity.update(time, delta, shape)
    }
}
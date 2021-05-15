import { getWorldSize } from '../Coordinates'
import type { Bounds, Vector } from '../types'
import Shape from './Shape'

const getMiddle = (bounds: Bounds) => {
    return (bounds.bottom - bounds.top) / 2
}

export abstract class Force {
    private running: boolean = false
    private startTime: number = 0
    public start(time: number) {
        if (this.running) {
            return
        }
        this.startTime = time
        this.running = true
    }
    public stop() {
        this.running = false
    }
    public update(time: number, delta: number, shape: Shape) {
        if (!this.running) {
            return
        }
        const timeSinceStart = time - this.startTime
        this._update(timeSinceStart, delta, shape)
    }
    public abstract _update(time: number, delta: number, shape: Shape): void
}

export class Velocity extends Force {
    public readonly value: Vector
    constructor(value: Vector) {
        super()
        this.value = value
    }
    public _update(time: number, delta: number, shape: Shape) {
        shape.position.x += this.value.x * (delta / 1000)
        shape.position.y += this.value.y * (delta / 1000)

        const worldSize = getWorldSize()
        const bounds = shape.bounds()
        if (bounds.bottom > worldSize.height) {
            shape.position.y = worldSize.height - getMiddle(bounds)
        }
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
    public start(time: number) {
        super.start(time)
        this.velocity.start(time)
    }
    public stop() {
        super.stop()
        this.velocity.stop()
    }
    public _update(time: number, delta: number, shape: Shape) {
        this.velocity.value.x += this.value.x * time / 1000
        this.velocity.value.y += this.value.y * time / 1000
        this.velocity._update(time, delta, shape)
    }
}
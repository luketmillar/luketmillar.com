import Tool from "./Tool"
import { Position } from 'projects/canvasScene/types'
import { Vector } from "matter-js"
import Aimer from '../models/Aimer'

interface IAimState {
    downPosition: Position
    delta: Vector
    aimer: Aimer
}

export default class ShooterTool extends Tool {
    private state?: IAimState

    public onMouseDown(position: Position) {
        const ball = this.controller.world.ball
        if (!ball || ball.isRunning) {
            return
        }
        this.state = {
            downPosition: position,
            delta: Vector.create(0, 0),
            aimer: new Aimer(ball.body.position, ball.body.position)
        }
        this.emit('objects-changed', { previous: [], next: [this.state.aimer] })
    }

    public onMouseUp() {
        const state = this.state
        if (!state) {
            return
        }
        this.state = undefined
        this.emit('objects-changed', { previous: [state.aimer], next: [] })
        const force = Vector.create(state.delta.x / 1000, state.delta.y / 1000)
        this.controller.world.ball?.start(force)
    }

    public onMouseMove(position: Position) {
        this.calculateDelta(position)
        const state = this.state
        const ballPosition = this.ballPosition
        if (!state || !ballPosition) {
            return
        }

        const aimerPosition = { x: ballPosition.x - state.delta.x, y: ballPosition.y - state.delta.y }
        state.aimer.updatePosition(aimerPosition)
    }

    public onUpdate() {
        // the ball might have moved so we need to update the aimer
        const ballPosition = this.ballPosition
        if (!ballPosition) {
            return
        }
        this.state?.aimer.updateBallPosition(ballPosition)
    }

    private calculateDelta = (position: Position) => {
        const state = this.state
        if (!state) {
            return
        }
        state.delta = Vector.create(state.downPosition.x - position.x, state.downPosition.y - position.y)
    }

    private get ballPosition() {
        return this.controller.world.ball?.body.position
    }
}
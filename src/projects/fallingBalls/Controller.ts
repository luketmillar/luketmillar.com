import Controller from "../canvasScene/Controller"
import { Position } from "../canvasScene/types"
import FallingBallsWorld from "./World"

export default class FallingBallsController extends Controller<FallingBallsWorld> {
    private dropped = false
    public onClick = (position: Position) => {
        this.drop()
    }

    public onMouseMove = (position: Position) => {
    }

    public start = () => {
        super.start()
        this.world.start(this.runTime)
    }

    public drop = () => {
        if (this.dropped) {
            return
        }
        this.dropped = true
        this.world.balls.forEach(ball => {
            ball.gravity = { x: 0, y: 4000 }
        })
    }
}
import Controller from "../canvasScene/Controller"
import { Position } from "../canvasScene/types"
import FallingBallsWorld from "./World"

export default class FallingBallsController extends Controller<FallingBallsWorld> {
    public onClick = (position: Position) => {
        this.world.balls.forEach(ball => {
            ball.gravity = { x: 0, y: 3000 }
        })
    }

    public onMouseMove = (position: Position) => {
    }

    public start = () => {
        super.start()
        this.world.start(this.runTime)
    }
}
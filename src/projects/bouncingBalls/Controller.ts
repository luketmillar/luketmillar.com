import Controller from "../canvasScene/Controller"
import { Position } from "../canvasScene/types"

export default class BouncingBallsController extends Controller {
    public onClick = (position: Position) => {
        this.world.start(this.time)
    }

    public onMouseMove = (position: Position) => {
    }
}
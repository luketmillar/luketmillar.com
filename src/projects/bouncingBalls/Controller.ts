import Controller from "../canvasScene/Controller"
import { Position } from "../canvasScene/types"

export default class BouncingBallsController extends Controller {
    public onClick = (position: Position) => {
    }

    public onMouseMove = (position: Position) => {
    }

    public start = () => {
        super.start()
        this.world.start(this.runTime)
    }
}
import Controller from "../canvasScene/Controller"
import { Position } from "../canvasScene/types"

export default class GolfController extends Controller {
    public onClick = (position: Position) => {
        this.world.getShapeAtPosition(position)?.startForces(this.time)
    }

    public onMouseMove = (position: Position) => {
    }
}
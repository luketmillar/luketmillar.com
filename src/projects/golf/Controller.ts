import Controller from "../canvasScene/Controller"
import { Position } from "../canvasScene/types"
import GolfWorld from "./World"

export default class GolfController extends Controller<GolfWorld> {
    public onClick = (position: Position) => {
        this.world.getShapeAtPosition(position)?.startForces(this.runTime)
    }

    public onMouseMove = (position: Position) => {
    }
}
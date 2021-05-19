import { Body } from "matter-js"
import * as Shapes from './Shapes'

export default abstract class BaseObject {
    public getBodies(): Body[] { return [] }
    public getShapes(): Shapes.Shape[] { return [] }
    public onUpdate() { }
    public isOutOfBounds(): boolean {
        return false
    }
}
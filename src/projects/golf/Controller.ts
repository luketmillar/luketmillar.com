import { Position } from 'projects/canvasScene/types'
import BaseController from './BaseController'
import World from './World'
import ToolStack from './Tools/ToolStack'
import ShooterTool from './Tools/ShooterTool'
import BaseObject from './models/Base'

export default class Controller extends BaseController<World> {
    public toolStack = new ToolStack()
    public onMouseDown = (position: Position) => {
        this.tool?.onMouseDown(position)
    }
    public onMouseMove = (position: Position) => {
        this.tool?.onMouseMove(position)
    }
    public onMouseUp = () => {
        this.tool?.onMouseUp()
    }

    protected onStart() {
        this.toolStack.on('objects-changed', this.handleToolObjectsChanged)
        this.toolStack.push(new ShooterTool(this))
    }

    private get tool() {
        return this.toolStack.top()
    }

    private handleToolObjectsChanged = ({ previous, next }: { previous: BaseObject[], next: BaseObject[] }) => {
        previous.forEach(obj => this.world.removeObject(obj))
        next.forEach(obj => this.world.addObject(obj))
    }
}
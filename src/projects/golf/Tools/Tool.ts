import EventEmitter from 'hooks/EventEmitter'
import { Position } from 'projects/canvasScene/types'
import Controller from '../Controller'
import BaseObject from '../models/Base'

export default class Tool extends EventEmitter<{ type: 'objects-changed', payload: { previous: BaseObject[], next: BaseObject[] } }> {
    protected readonly controller: Controller
    constructor(controller: Controller) {
        super()
        this.controller = controller
    }
    public initialize() { }
    public teardown() { }

    public onMouseDown(position: Position) { }
    public onMouseUp() { }
    public onMouseMove(position: Position) { }

    public getObjects(): BaseObject[] { return [] }
    public onUpdate() { }
}
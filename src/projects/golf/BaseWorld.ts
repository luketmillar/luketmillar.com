import { IWorld } from './BaseController'
import { Body, Composite, Engine, Events, IEventCollision, Runner } from 'matter-js'
import BaseObject from './models/Base'

export default abstract class BaseWorld implements IWorld {
    protected readonly engine: Engine
    protected readonly runner: Runner
    protected readonly objects: BaseObject[] = []
    constructor() {
        this.engine = Engine.create()
        this.runner = Runner.create()
        Events.on(this.engine, 'collisionStart', this.handleCollision)
    }
    public start = () => {
        this.createWorld()
        Runner.run(this.runner, this.engine)
    }
    public update = (delta: number) => {
        Engine.update(this.engine, delta)
        this.objects.forEach(obj => obj.onUpdate())
        this.onUpdate()
    }
    public allBodies = () => this.objects.flatMap(obj => obj.getBodies())
    public allShapes = () => this.objects.flatMap(obj => obj.getShapes())

    protected abstract createWorld(): void

    protected onUpdate() { }

    protected get world() {
        return this.engine.world
    }

    public addObject = (obj: BaseObject) => {
        this.objects.push(obj)
        obj.getBodies().forEach(body => {
            Composite.add(this.world, body)
        })
    }

    public removeObject = (obj: BaseObject) => {
        const index = this.objects.indexOf(obj)
        if (index > -1) {
            obj.getBodies().forEach(body => {
                Composite.remove(this.world, body)
            })
            this.objects.splice(index, 1)
        }
    }

    protected restart = () => {
        this.allBodies().forEach(body => {
            Composite.remove(this.world, body)
        })
        this.objects.length = 0
        this.createWorld()
    }

    private handleCollision = (event: IEventCollision<Engine>) => {
        event.pairs.forEach(pair => {
            this.onCollision(pair.bodyA, pair.bodyB)
        })
    }

    protected onCollision(a: Body, b: Body) { }
}
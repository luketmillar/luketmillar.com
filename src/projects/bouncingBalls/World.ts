import { getWorldSize } from "projects/canvasScene/Coordinates"
import { Gravity } from "projects/canvasScene/Model/Forces"
import { World, Circle } from "../canvasScene/Model"

const colors = ['#fff', '#f00', '#0f0', '#00f', '#0ff', '#ff0', '#f0f']

const createCircles = (n: number) => {
    const worldSize = getWorldSize()
    const circles: Circle[] = []
    for (let i = 0; i < n; i++) {
        const r = Math.round(Math.random() * 100) + 50
        const x = Math.round(Math.random() * (worldSize.width - r * 2)) + r
        const y = Math.round(Math.random() * (worldSize.height - r * 2)) + r
        const color = colors[Math.round(Math.random() * colors.length)]
        const circle = new Circle({ position: { x, y }, radius: r, fill: color })
        circle.forces.push(new Gravity({ x: 0, y: 100 }))
        circles.push(circle)
    }
    return circles
}

export default class BouncingBallsWorld extends World {
    constructor() {
        const circles = createCircles(100)
        super(circles)
    }
}
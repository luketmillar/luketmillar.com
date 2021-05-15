import { Gravity } from "projects/canvasScene/Model/Forces"
import { World, Circle } from "../canvasScene/Model"

const colors = ['#fff', '#f00', '#0f0', '#00f', '#0ff', '#ff0', '#f0f']

const createCircles = (n: number) => {
    const circles: Circle[] = []
    for (let i = 0; i < n; i++) {
        const x = Math.round(Math.random() * 3800) + 150
        const y = Math.round(Math.random() * 2000) + 150
        const r = Math.round(Math.random() * 100) + 50
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
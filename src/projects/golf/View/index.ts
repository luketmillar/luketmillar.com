import Model from "../Model"

export default class View {
    private readonly canvas: HTMLCanvasElement
    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas
    }

    public render(model: Model) {
        this.context.fillStyle = "#111"
        this.context.fillRect(40, 40, this.width - 80, this.height - 80)
    }

    private get context() {
        return this.canvas.getContext('2d')!
    }

    private get width() {
        return this.canvas.clientWidth
    }

    private get height() {
        return this.canvas.clientHeight
    }
}
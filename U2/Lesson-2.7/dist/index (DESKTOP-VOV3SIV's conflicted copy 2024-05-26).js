class ShapeController {
    context;
    constructor(context) {
        this.context = context;
        document.addEventListener("click", (event) => this.handleMouseClick(event));
    }
    handleMouseClick(event) {
        const mouseX = event.clientX;
        const mouseY = event.clientY;
        const boundingRect = Canvas.instance.canvasElement.getBoundingClientRect();
        const canvasX = boundingRect.x;
        const canvasY = boundingRect.y;
        const mousePositionX = mouseX - canvasX;
        const mousePositionY = mouseY - canvasY;
        console.log(mousePositionX, mousePositionY);
        if (this.getRandomShape() === 0) {
            this.drawRectangle(mousePositionX, mousePositionY);
        }
        else {
            this.drawCircle(mousePositionX, mousePositionY);
        }
    }
    getRandomShape() {
        return Math.floor(Math.random() * 2);
    }
    getRandomRGB() {
        return Math.floor(Math.random() * 256);
    }
    drawRectangle(x, y) {
        const color = `rgb(${this.getRandomRGB()}, ${this.getRandomRGB()}, ${this.getRandomRGB()})`;
        const [width, height] = this.calculateDimensions(x, y);
        this.context.fillStyle = color;
        this.context.fillRect(x - width, y - height, 2 * width, 2 * height);
    }
    calculateDimensions(x, y) {
        const canvasWidth = 600;
        const canvasHeight = 400;
        const width = Math.min(x, canvasWidth - x);
        const height = Math.min(y, canvasHeight - y);
        return [
            Math.floor(Math.random() * width),
            Math.floor(Math.random() * height),
        ];
    }
    drawCircle(x, y) {
        const color = `rgb(${this.getRandomRGB()}, ${this.getRandomRGB()}, ${this.getRandomRGB()})`;
        const radius = this.calculateRadius(x, y);
        this.context.fillStyle = color;
        this.context.beginPath();
        this.context.arc(x, y, radius, 0, 2 * Math.PI);
        this.context.fill();
    }
    calculateRadius(x, y) {
        const maxRadius = 75;
        return Math.floor(Math.random() * maxRadius) + 1;
    }
}
class Canvas {
    static _instance;
    _element;
    _context;
    _controller;
    constructor() {
        this._element = document.getElementById("game_screen");
        this._element.width = 600;
        this._element.height = 400;
        this._context = this._element.getContext("2d");
        this._controller = new ShapeController(this._context);
    }
    static get instance() {
        if (!Canvas._instance) {
            Canvas._instance = new Canvas();
        }
        return Canvas._instance;
    }
    get canvasElement() {
        return this._element;
    }
    get canvasContext() {
        return this._context;
    }
}
class Driver {
    constructor() {
        Canvas.instance;
    }
}
new Driver();
//# sourceMappingURL=index.js.map
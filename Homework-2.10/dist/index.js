class Circle {
    _x;
    _y;
    _radius;
    _speed;
    _moveRight;
    constructor(x, y, radius, speed) {
        this._x = x;
        this._y = y;
        this._radius = radius;
        this._speed = speed;
        this._moveRight = true;
    }
    get x() {
        return this._x;
    }
    set x(value) {
        this._x = value;
    }
    get y() {
        return this._y;
    }
    set y(value) {
        this._y = value;
    }
    get radius() {
        return this._radius;
    }
    set radius(value) {
        this._radius = value;
    }
    get speed() {
        return this._speed;
    }
    set speed(value) {
        this._speed = value;
    }
    get moveRight() {
        return this._moveRight;
    }
    set moveRight(value) {
        this._moveRight = value;
    }
    move(canvasW) {
        if (this.moveRight) {
            if (this._x < canvasW / 2) {
                this._x += this._speed;
            }
            else {
                this.moveRight = false;
            }
        }
        else {
            this.y += this.speed;
        }
    }
    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = "blue";
        ctx.fill();
        ctx.closePath();
    }
}
class Path {
    _x;
    _y;
    _width;
    _height;
    constructor(x, y, width, height) {
        this._x = x;
        this._y = y;
        this._width = width;
        this._height = height;
    }
    get x() {
        return this._x;
    }
    set x(value) {
        this._x = value;
    }
    get y() {
        return this._y;
    }
    set y(value) {
        this._y = value;
    }
    get width() {
        return this._width;
    }
    set width(value) {
        this._width = value;
    }
    get height() {
        return this._height;
    }
    set height(value) {
        this._height = value;
    }
    draw(context) {
        context.beginPath();
        context.moveTo(this.x, this.y + this._height / 2);
        context.lineTo(this.x + this._width / 2, this.y + this._height / 2);
        context.lineTo(this.x + this._width / 2, this.y + this._height);
        context.strokeStyle = "black";
        context.lineWidth = 100;
        context.stroke();
    }
}
class Game {
    spawnInterval;
    updateInterval;
    canvas;
    context;
    path;
    circles = [];
    constructor(canvas) {
        this.canvas = canvas;
        this.context = this.canvas.getContext("2d");
        this.path = new Path(0, 0, this.canvas.width, this.canvas.height);
        this.path.draw(this.context);
        const self = this;
        this.spawnInterval = setInterval(() => {
            self.spawnCircle();
        }, 2000);
        this.updateInterval = setInterval(() => {
            self.update();
        }, 16); // 1000ms / 60 frames
    }
    spawnCircle() {
        const circle = new Circle(0, this.canvas.height / 2 - 20, 20, 5);
        this.circles.push(circle);
    }
    update() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.path.draw(this.context);
        for (let i = 0; i < this.circles.length; i++) {
            const circle = this.circles[i];
            circle.move(this.canvas.width);
            circle.draw(this.context);
            if (circle.y - circle.radius > this.canvas.height) {
                this.circles.splice(i, 1);
                i--;
            }
        }
    }
}
class Driver {
    game;
    constructor() {
        const canvas = document.getElementById("game_screen");
        canvas.width = 600;
        canvas.height = 400;
        this.game = new Game(canvas);
    }
}
new Driver();
//# sourceMappingURL=index.js.map
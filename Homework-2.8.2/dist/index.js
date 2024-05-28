class MoveBallCommand {
    ball;
    dx;
    dy;
    constructor(ball, dx, dy) {
        this.ball = ball;
        this.dx = dx;
        this.dy = dy;
    }
    execute() {
        this.ball.move(this.dx, this.dy);
    }
}
class Canvas {
    static CANVAS_WIDTH = 600;
    static CANVAS_HEIGHT = 400;
    static _instance;
    _element;
    _context;
    game;
    constructor() {
        this._element = document.getElementById("game_screen");
        this._context = this._element.getContext("2d");
        this._element.width = Canvas.CANVAS_WIDTH;
        this._element.height = Canvas.CANVAS_HEIGHT;
    }
    static get instance() {
        if (!Canvas._instance) {
            Canvas._instance = new Canvas();
        }
        return Canvas._instance;
    }
    get context() {
        return this._context;
    }
    initialize() {
        this.game = new Game();
    }
}
class GameObject {
    x;
    y;
    width;
    height;
    color;
    constructor(x, y, width, height, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
    }
    draw() {
        const context = Canvas.instance.context;
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.width, this.height);
    }
}
class Ball {
    x;
    y;
    radius;
    color;
    objects;
    ballSpeed = 7.5;
    dx;
    dy;
    constructor(x, y, radius, color, objects) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.objects = objects;
        const initialDirection = this.getRandomDirection();
        this.dx = initialDirection.dx;
        this.dy = initialDirection.dy;
    }
    getRandomDirection() {
        const angle = Math.random() * Math.PI * 2;
        return { dx: Math.cos(angle), dy: Math.sin(angle) };
    }
    draw() {
        const context = Canvas.instance.context;
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        context.fillStyle = this.color;
        context.fill();
        context.closePath();
    }
    move(dx, dy) {
        this.x += dx * this.ballSpeed;
        this.y += dy * this.ballSpeed;
        this.checkCollision();
    }
    checkCollision() {
        if (this.x + this.radius > Canvas.CANVAS_WIDTH ||
            this.x - this.radius < 0) {
            this.dx = -this.dx;
            this.x = Math.max(this.radius, Math.min(this.x, Canvas.CANVAS_WIDTH - this.radius));
        }
        if (this.y + this.radius > Canvas.CANVAS_HEIGHT ||
            this.y - this.radius < 0) {
            this.dy = -this.dy;
            this.y = Math.max(this.radius, Math.min(this.y, Canvas.CANVAS_HEIGHT - this.radius));
        }
        for (const object of this.objects) {
            const nextX = this.x + this.dx * this.ballSpeed;
            const nextY = this.y + this.dy * this.ballSpeed;
            const horizontalCollision = nextX + this.radius > object.x &&
                nextX - this.radius < object.x + object.width;
            const verticalCollision = nextY + this.radius > object.y &&
                nextY - this.radius < object.y + object.height;
            if (horizontalCollision && verticalCollision) {
                const collidesTop = this.y + this.radius <= object.y && nextY + this.radius > object.y;
                const collidesBottom = this.y - this.radius >= object.y + object.height &&
                    nextY - this.radius < object.y + object.height;
                const collidesLeft = this.x + this.radius <= object.x && nextX + this.radius > object.x;
                const collidesRight = this.x - this.radius >= object.x + object.width &&
                    nextX - this.radius < object.x + object.width;
                if (collidesTop || collidesBottom)
                    this.dy = -this.dy;
                if (collidesLeft || collidesRight)
                    this.dx = -this.dx;
                if (collidesTop)
                    this.y = object.y - this.radius;
                if (collidesBottom)
                    this.y = object.y + object.height + this.radius;
                if (collidesLeft)
                    this.x = object.x - this.radius;
                if (collidesRight)
                    this.x = object.x + object.width + this.radius;
            }
        }
    }
}
class Game {
    objects = [];
    ball;
    FRAME_RATE = 60;
    timeInterval = 1000 / this.FRAME_RATE;
    constructor() {
        this.createBlocks();
        this.ball = new Ball(Canvas.CANVAS_WIDTH / 2, Canvas.CANVAS_HEIGHT / 2, 15, "black", this.objects);
        setInterval(() => this.update(), this.timeInterval);
    }
    createBlocks() {
        const firstRectX = Math.random() * (Canvas.CANVAS_WIDTH - 75);
        const firstRectY = Math.random() * (Canvas.CANVAS_HEIGHT - 40);
        const secondRectX = Math.random() * (Canvas.CANVAS_WIDTH - 200);
        const secondRectY = Math.random() * (Canvas.CANVAS_HEIGHT - 20);
        this.objects.push(new GameObject(firstRectX, firstRectY, 75, 40, "purple"));
        this.objects.push(new GameObject(secondRectX, secondRectY, 200, 20, "purple"));
    }
    update() {
        this.clearScreen();
        this.ball.move(this.ball.dx, this.ball.dy);
        this.drawEverything();
    }
    drawEverything() {
        for (const object of this.objects) {
            object.draw();
        }
        this.ball.draw();
    }
    clearScreen() {
        Canvas.instance.context.clearRect(0, 0, Canvas.CANVAS_WIDTH, Canvas.CANVAS_HEIGHT);
    }
}
class Driver {
    constructor() {
        Canvas.instance.initialize();
    }
}
new Driver();
//# sourceMappingURL=index.js.map
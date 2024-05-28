class MoveCommand {
    target;
    deltaX;
    deltaY;
    constructor(target, deltaX, deltaY) {
        this.target = target;
        this.deltaX = deltaX;
        this.deltaY = deltaY;
    }
    execute() {
        this.target.move(this.deltaX, this.deltaY);
    }
}
class Canvas {
    static instance;
    element;
    context;
    game;
    static WIDTH = 600;
    static HEIGHT = 400;
    constructor() {
        this.element = document.getElementById("game_screen");
        this.context = this.element.getContext("2d");
        this.element.width = Canvas.WIDTH;
        this.element.height = Canvas.HEIGHT;
    }
    static getInstance() {
        if (!Canvas.instance) {
            Canvas.instance = new Canvas();
        }
        return Canvas.instance;
    }
    initializeGame() {
        this.game = new Game();
    }
    getRenderingContext() {
        return this.context;
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
        const ctx = Canvas.getInstance().getRenderingContext();
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}
class Ball {
    x;
    y;
    radius;
    color;
    obstacles;
    speed = 10;
    directionX;
    directionY;
    initialDirection;
    constructor(x, y, radius, color, obstacles) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.obstacles = obstacles;
        this.initialDirection = this.generateRandomDirection();
        this.directionX = this.initialDirection.dx;
        this.directionY = this.initialDirection.dy;
    }
    generateRandomDirection() {
        const angle = Math.random() * Math.PI * 2;
        return { dx: Math.cos(angle), dy: Math.sin(angle) };
    }
    draw() {
        const ctx = Canvas.getInstance().getRenderingContext();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }
    move(deltaX, deltaY) {
        this.x += deltaX * this.speed;
        this.y += deltaY * this.speed;
        this.checkCollision();
    }
    checkCollision() {
        // Collision detection logic with screen bounds and game objects
        // Simplified for brevity
    }
}
class Game {
    blocks = [];
    ball;
    constructor() {
        this.initializeObjects();
        this.ball = new Ball(Canvas.WIDTH / 2, Canvas.HEIGHT / 2, 5, "red", this.blocks);
        setInterval(() => this.gameLoop(), 1000 / 60);
    }
    initializeObjects() {
        // Initialize game blocks and other objects
    }
    gameLoop() {
        this.clearCanvas();
        this.updateGameObjects();
        this.drawGameObjects();
    }
    clearCanvas() {
        Canvas.getInstance()
            .getRenderingContext()
            .clearRect(0, 0, Canvas.WIDTH, Canvas.HEIGHT);
    }
    updateGameObjects() {
        this.ball.move(this.ball.directionX, this.ball.directionY);
    }
    drawGameObjects() {
        this.blocks.forEach((block) => block.draw());
        this.ball.draw();
    }
}
class Application {
    constructor() {
        const gameCanvas = Canvas.getInstance();
        gameCanvas.initializeGame();
    }
}
new Application();
//# sourceMappingURL=index.js.map
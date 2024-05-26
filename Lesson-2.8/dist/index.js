class Canvas {
    static _instance;
    _element = document.getElementById("game_screen");
    _context = this._element.getContext("2d");
    game;
    static WIDTH = 600;
    static HEIGHT = 400;
    constructor() {
        this._element.width = 600;
        this._element.height = 400;
    }
    initialize() {
        this.game = new Game();
    }
    get context() {
        return this._context;
    }
    static get instance() {
        if (!Canvas._instance) {
            Canvas._instance = new Canvas();
        }
        return Canvas._instance;
    }
}
class Controller {
    hero;
    constructor(hero) {
        this.hero = hero;
        document.addEventListener("keydown", (event) => this.handleKeyDown(event));
    }
    handleKeyDown(event) {
        if (event.key === "d") {
            this.hero.moveRight();
            Canvas.instance.context.fillStyle = "white";
            Canvas.instance.context.fillRect(0, 0, Canvas.WIDTH, Canvas.HEIGHT);
            this.hero.draw();
        }
        if (event.key === "s") {
            this.hero.moveDown();
            Canvas.instance.context.fillStyle = "white";
            Canvas.instance.context.fillRect(0, 0, Canvas.WIDTH, Canvas.HEIGHT);
            this.hero.draw();
        }
    }
}
class GameObject {
    x;
    y;
    w;
    h;
    colour;
    constructor(x, y, w, h, colour) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.colour = colour;
    }
    draw() {
        console.log(this.x, this.w);
        Canvas.instance.context.fillStyle = this.colour;
        Canvas.instance.context.fillRect(this.x, this.y, this.w, this.h);
    }
}
class Hero extends GameObject {
    moveSpd = 1;
    moveRight() {
        this.x += this.moveSpd;
    }
    moveDown() {
        this.y += this.moveSpd;
    }
}
class Game {
    hero = new Hero(0, 0, 50, 50, "pink");
    controller = new Controller(this.hero);
    constructor() {
        this.hero.draw();
    }
}
class Driver {
    constructor() {
        Canvas.instance; //Finished initialize
        Canvas.instance.initialize();
    }
}
new Driver();
//# sourceMappingURL=index.js.map
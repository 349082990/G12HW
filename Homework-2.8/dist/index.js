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
class Driver {
    constructor() {
        Canvas.instance;
        Canvas.instance.initialize();
    }
}
new Driver();
//# sourceMappingURL=index.js.map
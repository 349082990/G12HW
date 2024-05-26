class Game {
    hero = new Hero(0, 0, 50, 50, "pink");
    controller = new Controller(this.hero);
    constructor() {
        this.hero.draw();
    }
}
//# sourceMappingURL=game.js.map
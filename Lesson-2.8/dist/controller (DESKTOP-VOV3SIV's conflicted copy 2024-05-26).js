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
//# sourceMappingURL=controller.js.map
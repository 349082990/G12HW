class Controller {
  constructor(private hero: Hero) {
    document.addEventListener("keydown", (event) => this.handleKeyDown(event));
  }

  private handleKeyDown(event: KeyboardEvent) {
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

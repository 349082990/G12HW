class Game {
  private objects: GameObject[] = [
    new GameObject(70, 70, 50, 50, "green"),
    new GameObject(200, 250, 30, 30, "blue"),
  ];
  private hero = new Hero(0, 0, 50, 50, "pink", this.objects);
  private controller = new Controller(
    new MoveUpCommand(this.hero),
    new MoveLeftCommand(this.hero),
    new MoveDownCommand(this.hero),
    new MoveRightCommand(this.hero)
  );
  private FPS: number = 60;
  private timeInterval: number = 1000 / this.FPS;

  constructor() {
    setInterval(() => {
      this.clearScreen();
      this.controller.inputHandler();
      this.drawEverything();
    }, this.timeInterval);
  }

  private drawEverything(): void {
    for (let object of this.objects) {
      object.draw();
    }

    this.hero.draw();
  }

  private clearScreen(): void {
    Canvas.instance.context.clearRect(0, 0, Canvas.WIDTH, Canvas.HEIGHT);
  }
}

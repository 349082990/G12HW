class Game {
  private objects: GameObject[] = [
    new GameObject(70, 70, 50, 50, "green"),
    new GameObject(200, 250, 30, 30, "blue"),
  ];

  private ball = new Ball(Canvas.WIDTH / 2, Canvas.HEIGHT / 2, 15, "black");
  private FPS: number = 60;
  private timeInterval: number = 1000 / this.FPS;

  constructor() {
    setInterval(() => {
      this.clearScreen();
      this.drawEverything();
    }, this.timeInterval);
  }

  private drawEverything(): void {
    for (let object of this.objects) {
      object.draw();
    }
    this.ball.draw();
  }

  private clearScreen(): void {
    Canvas.instance.context.clearRect(0, 0, Canvas.WIDTH, Canvas.HEIGHT);
  }
}

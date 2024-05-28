class Game {
  private objects: GameObject[] = [
    new GameObject(50, 50, 100, 100, "green"),
    new GameObject(200, 250, 100, 70, "blue"),
  ];

  private _ball: Ball = new Ball(
    Math.floor(Math.random() * (Canvas.WIDTH - 1)),
    Math.floor(Math.random() * (Canvas.HEIGHT - 1)),
    15,
    "black"
  );
  private FPS: number = 60;
  private timeInterval: number = 1000 / this.FPS;
  private deltaTime: number = 0;
  private previousTime: number = 0;

  constructor() {
    setInterval(() => {
      this.clearScreen();
      this.updateAll();
      this.drawEverything();
    }, this.timeInterval);
  }

  public get ball(): Ball {
    return this._ball;
  }

  private updateAll(): void {
    this.getDeltaTime();
    this.ball.checkBallBoundaries();
    this.ball.ballMovement(this.deltaTime);
    this.ball.checkBallBoundaries();
  }

  private drawEverything(): void {
    for (let object of this.objects) {
      object.draw();
    }
    this.ball.draw();
  }

  public getDeltaTime(): void {
    const curTime = performance.now();
    this.deltaTime = (curTime - this.previousTime) / 1000;
    this.previousTime = curTime;
  }

  private clearScreen(): void {
    Canvas.instance.context.clearRect(0, 0, Canvas.WIDTH, Canvas.HEIGHT);
  }
}

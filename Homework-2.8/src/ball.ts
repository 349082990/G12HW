class Ball {
  ballSpeedX: number = 250;
  ballSpeedY: number = 250;

  private objects: GameObject[] = [
    new GameObject(70, 70, 50, 50, "green"),
    new GameObject(200, 250, 30, 30, "blue"),
  ];

  constructor(
    private _x: number,
    private _y: number,
    private _radius: number,
    public colour: string
  ) {}

  get x(): number {
    return this._x;
  }

  set x(value) {
    this._x = value;
  }

  get y(): number {
    return this._y;
  }

  set y(value) {
    this._y = value;
  }

  get radius(): number {
    return this._radius;
  }

  set radius(value) {
    this._radius = value;
  }

  public draw(): void {
    Canvas.instance.context.fillStyle = this.colour;
    Canvas.instance.context.beginPath();
    Canvas.instance.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    Canvas.instance.context.fill();
    Canvas.instance.context.closePath();
    console.log(this.x, this.y);
  }

  public ballMovement(d): void {
    this.x += this.ballSpeedX * d;
    this.y += this.ballSpeedY * d;
    this.checkBallBoundaries();
  }

  private hasCollided(): boolean {
    for (let object of this.objects) {
      if (
        this.x <= object.x + object.w &&
        this.x + this.radius >= object.x &&
        this.y <= object.y + object.h &&
        this.y - this.radius >= object.y
      ) {
        return true;
      } else {
        return false;
      }
    }
  }

  public checkBallBoundaries(): void {
    if (
      (!this.hasCollided() && this.x <= 0) ||
      this.x >= Canvas.WIDTH - this.radius
    ) {
      this.ballSpeedX = -this.ballSpeedX;
    }

    if (
      (!this.hasCollided() && this.y <= 0) ||
      this.y >= Canvas.HEIGHT + this.radius
    ) {
      this.ballSpeedY = -this.ballSpeedY;
    }
  }
}

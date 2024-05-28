class Ball {
  ballSpeedX: number = 250;
  ballSpeedY: number = 250;

  public objects: GameObject[] = [
    new GameObject(50, 50, 100, 100, "green"),
    new GameObject(200, 250, 100, 70, "blue"),
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
  }

  public ballMovement(d): void {
    this.x += this.ballSpeedX * d;
    this.y += this.ballSpeedY * d;
    this.checkBallBoundaries();
  }

  private hasCollided(): boolean {
    for (let object of this.objects) {
      if (
        this.x - this.radius <= object.x + object.w &&
        this.x + this.radius >= object.x &&
        this.y - this.radius <= object.y + object.h &&
        this.y + this.radius >= object.y
      ) {
        return true;
      } else {
        return false;
      }
    }
  }

  public checkBallBoundaries(): void {
    if (this.hasCollided) {
      for (let object of this.objects) {
        if (this.x - this.radius <= object.x + object.w) {
          // right side
          this.x = object.x + object.w + this.radius;
          this.ballSpeedX = -this.ballSpeedX;
        } else if (this.x + this.radius >= object.x) {
          // left side
          this.x = object.x - this.radius;
          this.ballSpeedX = -this.ballSpeedX;
        } else if (this.y - this.radius <= object.y + object.h) {
          // from bottom
          this.y = object.y + object.h;
          this.ballSpeedY = -this.ballSpeedY;
        } else if (this.y + this.radius >= object.y) {
          // from top
          this.y = object.y;
          this.ballSpeedY = -this.ballSpeedY;
        }
      }
    }

    if (
      (!this.hasCollided() && this.x - this.radius <= 0) ||
      (!this.hasCollided() && this.x >= Canvas.WIDTH - this.radius)
    ) {
      this.ballSpeedX = -this.ballSpeedX;
    } else if (
      (!this.hasCollided() && this.y - this.radius <= 0) ||
      (!this.hasCollided() && this.y >= Canvas.HEIGHT - this.radius)
    ) {
      this.ballSpeedY = -this.ballSpeedY;
    }
  }
}

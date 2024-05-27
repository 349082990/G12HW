class Ball {
    ballSpeedX: number = 250,
    ballSpeedY: number = 250,
  constructor(
    private _x: number,
    private _y: number,
    private _radius: number,
    public colour: string
  ) {}

  get x(): number {
    return this._x;
  }

  set x(value): number {
    this._x = value;
  }

  get y(): number {
    return this._y;
  }

  set y(value): number {
    this._y = value;
  }

  get radius(): number {
    return this._radius;
  }

  set radius(value): number {
    this._radius = value;
  }

  public draw() {
    Canvas.instance.context.fillStyle = "black";
    Canvas.instance.context.beginPath();
    Canvas.instance.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    Canvas.instance.context.fill();
    Canvas.instance.context.closePath();
  }

  public ballMovement(d) {
    this.x += this.ballSpeedX * d;
    this.y += this.ballSpeedY * d;
    this.checkBallBoundaries(); 
  }

  public checkBallBoundaries() {
    if (this.x < 0 || this.x > Canvas.HEIGHT + this.radius / 2) {
        this.ballSpeedX = -this.ballSpeedX;
    }
    
    if (this.y < 0 || this.y > Canvas.HEIGHT - this.radius / 2) {
        this.ballSpeedY = -this.ballSpeedY;
    }
  }

  public speedChange(): void {
    this.
  }
}

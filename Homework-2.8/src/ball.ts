class Ball {
  ballSpeedX: number = 250;
  ballSpeedY: number = 250;

  private objects: GameObject[] = [
    new GameObject(70, 70, 200, 200, "green"),
    new GameObject(200, 250, 70, 30, "blue"),
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
      const closestX = Math.max(
        object.x,
        Math.min(this.x, object.x + object.w)
      );
      const closestY = Math.max(
        object.y,
        Math.min(this.y, object.y + object.h)
      );

      // Calculate the distance between the circle's center and this closest point
      const distanceX = this.x - closestX;
      const distanceY = this.y - closestY;

      // If the distance is less than the circle's radius, an intersection occurs
      const distanceSquared = distanceX * distanceX + distanceY * distanceY;
      if (distanceSquared < this.radius * this.radius) {
        console.log("collision");
        return true;
      }
    }
    return false;
  }

  public checkBallBoundaries(): void {
    if (
      this.hasCollided() ||
      (!this.hasCollided() && this.x - this.radius <= 0) ||
      (!this.hasCollided() && this.x >= Canvas.WIDTH - this.radius)
    ) {
      this.ballSpeedX = -this.ballSpeedX;
    }

    if (
      this.hasCollided() ||
      (!this.hasCollided() && this.y - this.radius <= 0) ||
      (!this.hasCollided() && this.y >= Canvas.HEIGHT - this.radius)
    ) {
      this.ballSpeedY = -this.ballSpeedY;
    }
  }
}

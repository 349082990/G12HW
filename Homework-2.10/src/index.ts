class Circle {
  private _x: number;
  private _y: number;
  private _radius: number;
  private _speed: number;
  private _moveRight: boolean;

  constructor(x: number, y: number, radius: number, speed: number) {
    this._x = x;
    this._y = y;
    this._radius = radius;
    this._speed = speed;
    this._moveRight = true;
  }

  public get x(): number {
    return this._x;
  }

  public set x(value: number) {
    this._x = value;
  }

  public get y(): number {
    return this._y;
  }

  public set y(value: number) {
    this._y = value;
  }

  public get radius(): number {
    return this._radius;
  }

  public set radius(value: number) {
    this._radius = value;
  }

  public get speed(): number {
    return this._speed;
  }

  public set speed(value: number) {
    this._speed = value;
  }

  public get moveRight(): boolean {
    return this._moveRight;
  }

  public set moveRight(value: boolean) {
    this._moveRight = value;
  }

  public move(canvasW: number) {
    if (this.moveRight) {
      if (this._x < canvasW / 2) {
        this._x += this._speed;
      } else {
        this.moveRight = false;
      }
    } else {
      this.y += this.speed;
    }
  }

  public draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = "blue";
    ctx.fill();
    ctx.closePath();
  }
}

class Path {
  private _x: number;
  private _y: number;
  private _width: number;
  private _height: number;

  constructor(x: number, y: number, width: number, height: number) {
    this._x = x;
    this._y = y;
    this._width = width;
    this._height = height;
  }

  public get x(): number {
    return this._x;
  }

  public set x(value: number) {
    this._x = value;
  }

  public get y(): number {
    return this._y;
  }

  public set y(value: number) {
    this._y = value;
  }

  public get width(): number {
    return this._width;
  }

  public set width(value: number) {
    this._width = value;
  }

  public get height(): number {
    return this._height;
  }

  public set height(value: number) {
    this._height = value;
  }

  public draw(context: CanvasRenderingContext2D) {
    context.beginPath();
    context.moveTo(this.x, this.y + this._height / 2);
    context.lineTo(this.x + this._width / 2, this.y + this._height / 2);
    context.lineTo(this.x + this._width / 2, this.y + this._height);
    context.strokeStyle = "grey";
    context.lineWidth = 100;
    context.stroke();
  }
}

class Game {
  private spawnInterval: number;
  private updateInterval: number;
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private path: Path;
  private circles: Circle[] = [];

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.context = this.canvas.getContext("2d") as CanvasRenderingContext2D;

    this.path = new Path(0, 0, this.canvas.width, this.canvas.height);
    this.path.draw(this.context);

    const self = this;
    this.spawnInterval = setInterval(() => {
      self.spawnCircle();
    }, 2000);
    this.updateInterval = setInterval(() => {
      self.update();
    }, 16); // 1000ms / 60 frames
  }

  private spawnCircle() {
    const circle = new Circle(0, this.canvas.height / 2 - 20, 20, 5);
    this.circles.push(circle);
  }

  private update() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.path.draw(this.context);

    for (let i = 0; i < this.circles.length; i++) {
      const circle = this.circles[i];
      circle.move(this.canvas.width);
      circle.draw(this.context);

      if (circle.y - circle.radius > this.canvas.height) {
        this.circles.splice(i, 1);
        i--;
      }
    }
  }
}

class Driver {
  private game: Game;

  constructor() {
    const canvas = document.getElementById("game_screen") as HTMLCanvasElement;
    canvas.width = 600;
    canvas.height = 400;

    this.game = new Game(canvas);
  }
}

new Driver();

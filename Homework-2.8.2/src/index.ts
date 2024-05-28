interface Command {
  execute(): void;
}

class MoveBallCommand implements Command {
  constructor(private ball: Ball, private dx: number, private dy: number) {}

  execute(): void {
    this.ball.move(this.dx, this.dy);
  }
}

class Canvas {
  public static readonly CANVAS_WIDTH = 600;
  public static readonly CANVAS_HEIGHT = 400;
  private static _instance: Canvas;
  private _element: HTMLCanvasElement;
  private _context: CanvasRenderingContext2D;
  private game: Game | undefined;

  private constructor() {
    this._element = document.getElementById("game_screen") as HTMLCanvasElement;
    this._context = this._element.getContext("2d") as CanvasRenderingContext2D;
    this._element.width = Canvas.CANVAS_WIDTH;
    this._element.height = Canvas.CANVAS_HEIGHT;
  }

  public static get instance(): Canvas {
    if (!Canvas._instance) {
      Canvas._instance = new Canvas();
    }
    return Canvas._instance;
  }

  public get context(): CanvasRenderingContext2D {
    return this._context;
  }

  public initialize(): void {
    this.game = new Game();
  }
}

class GameObject {
  constructor(
    public x: number,
    public y: number,
    public width: number,
    public height: number,
    protected color: string
  ) {}

  public draw(): void {
    const context = Canvas.instance.context;
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, this.width, this.height);
  }
}

class Ball {
  private ballSpeed: number = 7.5;
  public dx: number;
  public dy: number;

  constructor(
    public x: number,
    public y: number,
    public radius: number,
    private color: string,
    private objects: GameObject[]
  ) {
    const initialDirection = this.getRandomDirection();
    this.dx = initialDirection.dx;
    this.dy = initialDirection.dy;
  }

  private getRandomDirection(): { dx: number; dy: number } {
    const angle = Math.random() * Math.PI * 2;
    return { dx: Math.cos(angle), dy: Math.sin(angle) };
  }

  public draw(): void {
    const context = Canvas.instance.context;
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    context.fillStyle = this.color;
    context.fill();
    context.closePath();
  }

  public move(dx: number, dy: number): void {
    this.x += dx * this.ballSpeed;
    this.y += dy * this.ballSpeed;
    this.checkCollision();
  }

  private checkCollision(): void {
    if (
      this.x + this.radius > Canvas.CANVAS_WIDTH ||
      this.x - this.radius < 0
    ) {
      this.dx = -this.dx;
      this.x = Math.max(
        this.radius,
        Math.min(this.x, Canvas.CANVAS_WIDTH - this.radius)
      );
    }

    if (
      this.y + this.radius > Canvas.CANVAS_HEIGHT ||
      this.y - this.radius < 0
    ) {
      this.dy = -this.dy;
      this.y = Math.max(
        this.radius,
        Math.min(this.y, Canvas.CANVAS_HEIGHT - this.radius)
      );
    }

    for (const object of this.objects) {
      const nextX = this.x + this.dx * this.ballSpeed;
      const nextY = this.y + this.dy * this.ballSpeed;

      const horizontalCollision =
        nextX + this.radius > object.x &&
        nextX - this.radius < object.x + object.width;
      const verticalCollision =
        nextY + this.radius > object.y &&
        nextY - this.radius < object.y + object.height;

      if (horizontalCollision && verticalCollision) {
        const collidesTop =
          this.y + this.radius <= object.y && nextY + this.radius > object.y;
        const collidesBottom =
          this.y - this.radius >= object.y + object.height &&
          nextY - this.radius < object.y + object.height;
        const collidesLeft =
          this.x + this.radius <= object.x && nextX + this.radius > object.x;
        const collidesRight =
          this.x - this.radius >= object.x + object.width &&
          nextX - this.radius < object.x + object.width;

        if (collidesTop || collidesBottom) this.dy = -this.dy;
        if (collidesLeft || collidesRight) this.dx = -this.dx;

        if (collidesTop) this.y = object.y - this.radius;
        if (collidesBottom) this.y = object.y + object.height + this.radius;
        if (collidesLeft) this.x = object.x - this.radius;
        if (collidesRight) this.x = object.x + object.width + this.radius;
      }
    }
  }
}

class Game {
  private objects: GameObject[] = [];
  private ball: Ball;
  private readonly FRAME_RATE = 60;
  private readonly timeInterval = 1000 / this.FRAME_RATE;

  constructor() {
    this.createBlocks();
    this.ball = new Ball(
      Canvas.CANVAS_WIDTH / 2,
      Canvas.CANVAS_HEIGHT / 2,
      15,
      "black",
      this.objects
    );
    setInterval(() => this.update(), this.timeInterval);
  }

  private createBlocks(): void {
    const firstRectX = Math.random() * (Canvas.CANVAS_WIDTH - 75);
    const firstRectY = Math.random() * (Canvas.CANVAS_HEIGHT - 40);
    const secondRectX = Math.random() * (Canvas.CANVAS_WIDTH - 200);
    const secondRectY = Math.random() * (Canvas.CANVAS_HEIGHT - 20);
    this.objects.push(new GameObject(firstRectX, firstRectY, 75, 40, "purple"));
    this.objects.push(
      new GameObject(secondRectX, secondRectY, 200, 20, "purple")
    );
  }

  private update(): void {
    this.clearScreen();
    this.ball.move(this.ball.dx, this.ball.dy);
    this.drawEverything();
  }

  private drawEverything(): void {
    for (const object of this.objects) {
      object.draw();
    }
    this.ball.draw();
  }

  private clearScreen(): void {
    Canvas.instance.context.clearRect(
      0,
      0,
      Canvas.CANVAS_WIDTH,
      Canvas.CANVAS_HEIGHT
    );
  }
}

class Driver {
  constructor() {
    Canvas.instance.initialize();
  }
}

new Driver();

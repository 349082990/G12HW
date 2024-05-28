interface Command {
  execute(): void;
}

class MoveCommand implements Command {
  constructor(private ball: Ball, private dx: number, private dy: number) {}

  public execute(): void {
    this.ball.move(this.dx, this.dy);
  }
}

class Canvas {
  private static _instance: Canvas;
  private _element = document.getElementById(
    "game_screen"
  ) as HTMLCanvasElement;
  private _context = this._element.getContext("2d") as CanvasRenderingContext2D;
  private game: Game | undefined;
  public static WIDTH = 600;
  public static HEIGHT = 400;

  private constructor() {
    this._element.width = Canvas.WIDTH;
    this._element.height = Canvas.HEIGHT;
  }

  public initialize() {
    this.game = new Game();
  }

  public get context(): CanvasRenderingContext2D {
    return this._context;
  }

  public static get instance(): Canvas {
    if (!Canvas._instance) {
      Canvas._instance = new Canvas();
    }

    return Canvas._instance;
  }
}

class GameObject {
  constructor(
    public x: number,
    public y: number,
    public w: number,
    public h: number,
    protected colour: string
  ) {}

  public draw() {
    Canvas.instance.context.fillStyle = this.colour;
    Canvas.instance.context.fillRect(this.x, this.y, this.w, this.h);
  }
}

class Ball {
  private speed: number = 10;
  public dx: number;
  public dy: number;
  readonly initialDirection;

  constructor(
    public x: number,
    public y: number,
    public radius: number,
    private colour: string,
    private objects: GameObject[]
  ) {
    this.initialDirection = this.getRandomDirection();
    this.dx = this.initialDirection.dx;
    this.dy = this.initialDirection.dy;
  }

  private getRandomDirection(): { dx: number; dy: number } {
    const angle = Math.random() * Math.PI * 2;
    const dx = Math.cos(angle);
    const dy = Math.sin(angle);
    return { dx, dy };
  }

  public draw() {
    const ctx = Canvas.instance.context;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.colour;
    ctx.fill();
    ctx.closePath();
  }

  public move(dx: number, dy: number) {
    this.x += dx * this.speed;
    this.y += dy * this.speed;

    this.checkCollision();
  }

  private checkCollision() {
    if (this.x + this.radius > Canvas.WIDTH || this.x - this.radius < 0) {
      this.dx = -this.dx;
      this.x = Math.max(
        this.radius,
        Math.min(this.x, Canvas.WIDTH - this.radius)
      );
    }

    if (this.y + this.radius > Canvas.HEIGHT || this.y - this.radius < 0) {
      this.dy = -this.dy;
      this.y = Math.max(
        this.radius,
        Math.min(this.y, Canvas.HEIGHT - this.radius)
      );
    }

    for (let object of this.objects) {
      const NEXT_X = this.x + this.dx * this.speed;
      const NEXT_Y = this.y + this.dy * this.speed;

      const HORIZONTAL_COLLISION =
        NEXT_X + this.radius > object.x &&
        NEXT_X - this.radius < object.x + object.w;
      const VERTICAL_COLLISION =
        NEXT_Y + this.radius > object.y &&
        NEXT_Y - this.radius < object.y + object.h;

      if (HORIZONTAL_COLLISION && VERTICAL_COLLISION) {
        const COLLIDES_TOP: boolean =
          this.y + this.radius <= object.y && NEXT_Y + this.radius > object.y;
        const COLLIDES_BOTTOM: boolean =
          this.y - this.radius >= object.y + object.h &&
          NEXT_Y - this.radius < object.y + object.h;
        const COLLIDES_LEFT: boolean =
          this.x + this.radius <= object.x && NEXT_X + this.radius > object.x;
        const COLLIDES_RIGHT: boolean =
          this.x - this.radius >= object.x + object.w &&
          NEXT_X - this.radius < object.x + object.w;

        if (COLLIDES_TOP || COLLIDES_BOTTOM) {
          this.dy = -this.dy;
        }

        if (COLLIDES_LEFT || COLLIDES_RIGHT) {
          this.dx = -this.dx;
        }

        if (COLLIDES_TOP) this.y = object.y - this.radius;
        if (COLLIDES_BOTTOM) this.y = object.y + object.h + this.radius;
        if (COLLIDES_LEFT) this.x = object.x - this.radius;
        if (COLLIDES_RIGHT) this.x = object.x + object.w + this.radius;
      }
    }
  }
}

class Game {
  private objects: GameObject[] = [];
  private ball: Ball;
  private FPS: number = 60;
  private timeInterval: number = 1000 / this.FPS;

  constructor() {
    this.makeBlocks();
    this.ball = new Ball(
      Canvas.WIDTH / 2,
      Canvas.HEIGHT / 2,
      5,
      "red",
      this.objects
    );

    setInterval(() => {
      this.update();
    }, this.timeInterval);
  }

  private makeBlocks() {
    const rect1X = Math.random() * (Canvas.WIDTH - 100);
    const rect1Y = Math.random() * (Canvas.HEIGHT - 50);
    const rect2X = Math.random() * (Canvas.WIDTH - 100);
    const rect2Y = Math.random() * (Canvas.HEIGHT - 50);

    this.objects.push(new GameObject(rect1X, rect1Y, 100, 50, "green"));
    this.objects.push(new GameObject(rect2X, rect2Y, 100, 50, "blue"));
  }

  private update() {
    this.clearScreen();
    this.ball.move(this.ball.dx, this.ball.dy);
    this.drawEverything();
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

class Driver {
  constructor() {
    Canvas.instance;
    Canvas.instance.initialize();
  }
}

new Driver();

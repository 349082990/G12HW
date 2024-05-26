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
    this._element.width = 600;
    this._element.height = 400;
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

class Controller {
  constructor(private hero: Hero) {
    document.addEventListener("keydown", (event) => this.handleKeyDown(event));
  }

  private handleKeyDown(event: KeyboardEvent) {
    if (event.key === "d") {
      this.hero.moveRight();
      Canvas.instance.context.fillStyle = "white";
      Canvas.instance.context.fillRect(0, 0, Canvas.WIDTH, Canvas.HEIGHT);
      this.hero.draw();
    }
    if (event.key === "s") {
      this.hero.moveDown();
      Canvas.instance.context.fillStyle = "white";
      Canvas.instance.context.fillRect(0, 0, Canvas.WIDTH, Canvas.HEIGHT);
      this.hero.draw();
    }
  }
}

class GameObject {
  constructor(
    protected x: number,
    protected y: number,
    protected w: number,
    protected h: number,
    protected colour: string
  ) {}

  public draw() {
    console.log(this.x, this.w);
    Canvas.instance.context.fillStyle = this.colour;
    Canvas.instance.context.fillRect(this.x, this.y, this.w, this.h);
  }
}

class Hero extends GameObject {
  private moveSpd: number = 1;

  public moveRight() {
    this.x += this.moveSpd;
  }

  public moveDown() {
    this.y += this.moveSpd;
  }
}

class Game {
  private hero = new Hero(0, 0, 50, 50, "pink");
  private controller = new Controller(this.hero);
  constructor() {
    this.hero.draw();
  }
}

class Driver {
  constructor() {
    Canvas.instance; //Finished initialize
    Canvas.instance.initialize();
  }
}

new Driver();

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

class Driver {
  constructor() {
    Canvas.instance; //Finished initialize
    Canvas.instance.initialize();
  }
}

new Driver();

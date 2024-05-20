class Canvas {
  private static _instance: Canvas;
  private _element = document.getElementById(
    "game_screen"
  ) as HTMLCanvasElement;
  private context = this._element.getContext("2d");
  private constructor() {
    this._element.width = 600;
    this._element.height = 400;
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
    Canvas.instance;
  }
}

new Driver();

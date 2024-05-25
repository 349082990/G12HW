class Controller {
  constructor(readonly context: CanvasRenderingContext2D) {
    document.addEventListener("click", (event) => this.handleMouse(event));
    this.context = context;
  }

  private handleMouse(event: MouseEvent) {
    const mouseX = event.clientX;
    const mouseY = event.clientY;
    const boundingRect = Canvas.instance.element.getBoundingClientRect();
    const canvasX = boundingRect.x;
    const canvasY = boundingRect.y;

    const mousePositionX = mouseX - canvasX;
    const mousePositionY = mouseY - canvasY;

    console.log(mousePositionX);
    console.log(mousePositionY);

    if (this.randomShape() === 0) {
      this.drawRectangle(mousePositionX, mousePositionY);
    } else {
      this.drawCircle(mousePositionX, mousePositionY);
    }
  }

  private randomShape(): number {
    return Math.floor(Math.random() * 1000) % 2;
  }

  private randomRGB(): number {
    return Math.floor(Math.random() * 255);
  }

  private drawRectangle(x: number, y: number) {
    const COLOR: string = `rgb(${this.randomRGB()}, ${this.randomRGB()}, ${this.randomRGB()})`;

    const SIZES: number[] = this.widthAndHeight(x, y);
    this.context.fillStyle = COLOR;
    this.context.beginPath();
    this.context.fillRect(
      x - SIZES[0],
      y - SIZES[1],
      2 * SIZES[0],
      2 * SIZES[1]
    );
    this.context.closePath();
  }

  private widthAndHeight(x: number, y: number): number[] {
    let W: number = 0;
    let H: number = 0;
    if (600 - x >= x) {
      W = Math.floor(Math.random() * (x - 1) + 1);
    } else {
      W = Math.floor(Math.random() * (600 - x - 1) + 1);
    }

    if (400 - y >= y) {
      H = Math.floor(Math.random() * (y - 1) + 1);
    } else {
      H = Math.floor(Math.random() * (400 - y - 1) + 1);
    }
    return [W, H];
  }

  private drawCircle(x: number, y: number) {
    const COLOR: string = `rgb(${this.randomRGB()}, ${this.randomRGB()}, ${this.randomRGB()})`;
    const R: number = this.radius(x, y);

    this.context.fillStyle = COLOR;
    this.context.beginPath();
    this.context.arc(x, y, R, 0, 2 * Math.PI);
    this.context.fill();
    this.context.closePath();
  }

  private radius(x: number, y: number) {
    let r: number = 0;
    let max: number = 0;

    if (x > 600 - y) {
      max = 600 - x;
    } else {
      max = x;
    }

    if (y > 400 - y && 400 - y < max) {
      max = 400 - y;
    } else if (y < max) {
      max = y;
    }

    r = Math.floor(Math.random() * (max - 1) + 1);
    return r;
  }
}

class Canvas {
  private static _instance: Canvas;
  private _element: HTMLCanvasElement = document.getElementById(
    "game_screen"
  ) as HTMLCanvasElement;
  private _context = this.element.getContext("2d") as CanvasRenderingContext2D;
  private controller = new Controller(this.context);

  private constructor() {
    this._element.width = 600;
    this._element.height = 400;
  }

  public get context(): CanvasRenderingContext2D {
    return this._context;
  }

  public get element(): HTMLCanvasElement {
    return this._element;
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

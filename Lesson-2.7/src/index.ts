class ShapeController {
  private context: CanvasRenderingContext2D;

  constructor(context: CanvasRenderingContext2D) {
    this.context = context;
    document.addEventListener("click", (event) => this.handleMouseClick(event));
  }

  public handleMouseClick(event: MouseEvent): void {
    const mouseX = event.clientX;
    const mouseY = event.clientY;
    const boundingRect = Canvas.instance.canvasElement.getBoundingClientRect();
    const canvasX = boundingRect.x;
    const canvasY = boundingRect.y;
    const mousePositionX = mouseX - canvasX;
    const mousePositionY = mouseY - canvasY;

    console.log(mousePositionX, mousePositionY);

    if (this.getRandomShape() === 0) {
      this.drawRectangle(mousePositionX, mousePositionY);
    } else {
      this.drawCircle(mousePositionX, mousePositionY);
    }
  }

  public getRandomShape(): number {
    return Math.floor(Math.random() * 2);
  }

  public getRandomRGB(): number {
    return Math.floor(Math.random() * 256);
  }

  public drawRectangle(x: number, y: number): void {
    const color = `rgb(${this.getRandomRGB()}, ${this.getRandomRGB()}, ${this.getRandomRGB()})`;
    const [width, height] = this.calculateDimensions(x, y);

    this.context.fillStyle = color;
    this.context.fillRect(x - width, y - height, 2 * width, 2 * height);
  }

  public calculateDimensions(x: number, y: number): number[] {
    const canvasWidth = 600;
    const canvasHeight = 400;
    const width = Math.min(x, canvasWidth - x);
    const height = Math.min(y, canvasHeight - y);

    return [
      Math.floor(Math.random() * width),
      Math.floor(Math.random() * height),
    ];
  }

  public drawCircle(x: number, y: number): void {
    const color = `rgb(${this.getRandomRGB()}, ${this.getRandomRGB()}, ${this.getRandomRGB()})`;
    const radius = this.calculateRadius(x, y);

    this.context.fillStyle = color;
    this.context.beginPath();
    this.context.arc(x, y, radius, 0, 2 * Math.PI);
    this.context.fill();
  }

  public calculateRadius(x: number, y: number): number {
    const maxRadius = 75;
    return Math.floor(Math.random() * maxRadius) + 1;
  }
}

class Canvas {
  private static _instance: Canvas;
  private _element: HTMLCanvasElement;
  private _context: CanvasRenderingContext2D;
  private _controller: ShapeController;

  private constructor() {
    this._element = document.getElementById("game_screen") as HTMLCanvasElement;
    this._element.width = 600;
    this._element.height = 400;
    this._context = this._element.getContext("2d") as CanvasRenderingContext2D;
    this._controller = new ShapeController(this._context);
  }

  public static get instance(): Canvas {
    if (!Canvas._instance) {
      Canvas._instance = new Canvas();
    }
    return Canvas._instance;
  }

  public get canvasElement(): HTMLCanvasElement {
    return this._element;
  }

  public get canvasContext(): CanvasRenderingContext2D {
    return this._context;
  }
}

class Driver {
  constructor() {
    Canvas.instance;
  }
}

new Driver();

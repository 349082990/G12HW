const canvas = document.getElementById("game_screen") as HTMLCanvasElement;
canvas.width = 600;
canvas.height = 400;
const context = canvas.getContext("2d") as CanvasRenderingContext2D;

function start() {
  const GRASS = new Rectangle("#008000", 0, 370, 600, 30);
  const HOUSE = new Rectangle("brown", 150, 200, 300, 200);
  const DOOR = new Rectangle("black", 350, 300, 50, 100);
  const WINDOW_I = new Rectangle("#ADD8E6", 170, 250, 50, 50);
  const WINDOW_II = new Rectangle("#ADD8E6", 270, 250, 50, 50);
  const ROOF = new Triangle("orange", 300, 100, 450, 200, 150, 200);
  const SUN = new Circle("red", 500, 100, 50, 0, 2 * Math.PI);
  const CLOUDS_I = new Circle("blue", 200, 100, 20, 0, 2 * Math.PI, 20);
  const CLOUDS_II = new Circle("blue", 50, 80, 20, 0, 2 * Math.PI, 20);
  const DOOR_KNOB = new Circle("#FFFF00", 375, 333, 5, 0, 2 * Math.PI);

  GRASS.drawRectanlge();
  HOUSE.drawRectanlge();
  DOOR.drawRectanlge();
  WINDOW_I.drawRectanlge();
  WINDOW_II.drawRectanlge();
  ROOF.drawTraingle();
  SUN.drawCircle();
  CLOUDS_I.cloud();
  CLOUDS_II.cloud();
  DOOR_KNOB.drawCircle();
}

class Rectangle {
  constructor(
    readonly color: string,
    readonly x: number,
    readonly y: number,
    readonly w: number,
    readonly h: number
  ) {
    this.color = color;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  public drawRectanlge() {
    context.fillStyle = this.color;
    context.beginPath();
    context.fillRect(this.x, this.y, this.w, this.h);
    context.closePath();
  }
}

class Triangle {
  constructor(
    readonly color: string,
    readonly x: number,
    readonly y: number,
    readonly x2: number,
    readonly y2: number,
    readonly x3: number,
    readonly y3: number
  ) {
    this.color = color;
    this.x = x;
    this.y = y;
    this.x2 = x2;
    this.y2 = y2;
    this.x3 = x3;
    this.y3 = y3;
  }

  public drawTraingle() {
    context.fillStyle = this.color;
    context.beginPath();
    context.moveTo(this.x, this.y);
    context.lineTo(this.x2, this.y2);
    context.lineTo(this.x3, this.y3);
    context.fill();
    context.closePath();
  }
}

class Circle {
  private _distance: number | null = null;

  constructor(
    readonly color: string,
    readonly x: number,
    readonly y: number,
    readonly r: number,
    readonly alpha: number,
    readonly beta: number,
    distance: number | null = null
  ) {
    this.color = color;
    this.x = x;
    this.y = y;
    this.r = r;
    this.alpha = alpha;
    this.beta = beta;
    this.d = distance;
  }

  private set d(distance: number | null) {
    if (distance === null) {
      this._distance = 0;
    } else {
      this._distance = distance;
    }
  }

  private get d(): number | null {
    return this._distance;
  }

  public drawCircle() {
    context.fillStyle = this.color;
    context.beginPath();
    context.arc(this.x, this.y, this.r, this.alpha, this.beta);
    context.fill();
    context.closePath();
  }

  public cloud() {
    context.fillStyle = this.color;
    context.beginPath();

    let D: number;

    if (this.d === null) {
      D = 0;
    } else {
      D = this.d;
    }

    context.arc(this.x, this.y, this.r, this.alpha, this.beta);
    context.arc(this.x + D, this.y, this.r, this.alpha, this.beta);
    context.arc(this.x, this.y + D, this.r, this.alpha, this.beta);
    context.arc(this.x - D, this.y, this.r, this.alpha, this.beta);
    context.arc(this.x, this.y - D, this.r, this.alpha, this.beta);
    context.closePath();

    context.fill();
  }
}

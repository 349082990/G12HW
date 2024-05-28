interface Drawable {
  draw(): void;
  update(): void;
  checkCollisionWithRect(rect: Rectangle): void;
}

abstract class GameObject implements Drawable {
  constructor(
    public canvas: HTMLCanvasElement,
    public ctx: CanvasRenderingContext2D,
    public x: number,
    public y: number,
    public width: number,
    public height: number
  ) {}

  abstract draw(): void;
}

class Ball extends GameObject {
  radius: number;
  dx: number;
  dy: number;

  constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    const radius = 15;
    const x = canvas.width / 2;
    const y = canvas.height / 2;
    super(canvas, ctx, x, y, radius * 2, radius * 2);
    this.radius = radius;
    this.dx = Math.random() > 0.5 ? 1 : -1;
    this.dy = Math.random() > 0.5 ? 1 : -1;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    this.ctx.fillStyle = "black";
    this.ctx.fill();
    this.ctx.closePath();
  }

  update() {
    if (
      this.x + this.radius >= this.canvas.width ||
      this.x - this.radius <= 0
    ) {
      this.dx = -this.dx;
    }

    if (
      this.y + this.radius >= this.canvas.height ||
      this.y - this.radius <= 0
    ) {
      this.dy = -this.dy;
    }

    this.x += this.dx;
    this.y += this.dy;
  }

  checkCollisionWithRect(rect: Rectangle) {
    const ballRight = this.x + this.radius;
    const ballLeft = this.x - this.radius;
    const ballTop = this.y - this.radius;
    const ballBottom = this.y + this.radius;

    if (
      ballRight > rect.x &&
      ballLeft < rect.x + rect.width &&
      ballBottom > rect.y &&
      ballTop < rect.y + rect.height
    ) {
      const xOverlap = Math.min(
        ballRight - rect.x,
        rect.x + rect.width - ballLeft
      );
      const yOverlap = Math.min(
        ballBottom - rect.y,
        rect.y + rect.height - ballTop
      );

      if (xOverlap < yOverlap) {
        this.dx = -this.dx;
      } else {
        this.dy = -this.dy;
      }
    }
  }
}

class Rectangle extends GameObject {
  constructor(
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    private ball: Ball,
    width: number,
    height: number
  ) {
    let x, y;
    do {
      x = Math.floor(Math.random() * (canvas.width - width));
      y = Math.floor(Math.random() * (canvas.height - height));
    } while (
      x + width > ball.x - ball.radius &&
      x < ball.x + ball.radius &&
      y + height > ball.y - ball.radius &&
      y < ball.y + ball.radius
    );
    super(canvas, ctx, x, y, width, height);
  }

  draw() {
    this.ctx.fillStyle = "purple";
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

const canvas = document.createElement("canvas");
canvas.width = 600;
canvas.height = 400;
document.body.appendChild(canvas);

const ctx = canvas.getContext("2d");
if (!ctx) {
  throw new Error("Cannot get canvas context");
}

const ball = new Ball(canvas, ctx);
const rect1 = new Rectangle(canvas, ctx, ball, 100, 50);
const rect2 = new Rectangle(canvas, ctx, ball, 100, 50);

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ball.draw();
  rect1.draw();
  rect2.draw();

  ball.update();
  ball.checkCollisionWithRect(rect1);
  ball.checkCollisionWithRect(rect2);

  requestAnimationFrame(draw);
}

draw();

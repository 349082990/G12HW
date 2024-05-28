interface GameObject {
  x: number;
  y: number;
  width: number;
  height: number;
}

class Ball implements GameObject {
  x: number;
  y: number;
  radius: number;
  dx: number;
  dy: number;

  constructor(
    public canvas: HTMLCanvasElement,
    public ctx: CanvasRenderingContext2D,
    public width: number,
    public height: number
  ) {
    this.radius = 15;
    this.x = canvas.width / 2;
    this.y = canvas.height / 2;
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

class Rectangle implements GameObject {
  x: number;
  y: number;
  width: number;
  height: number;

  constructor(
    public canvas: HTMLCanvasElement,
    public ctx: CanvasRenderingContext2D,
    public ball: Ball,
    public rectWidth: number,
    public rectHeight: number
  ) {
    this.width = rectWidth;
    this.height = rectHeight;
    do {
      this.x = Math.floor(Math.random() * (canvas.width - this.width));
      this.y = Math.floor(Math.random() * (canvas.height - this.height));
    } while (this.isOverlapping(ball));
  }

  draw() {
    this.ctx.fillStyle = "purple";
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  isOverlapping(ball: Ball) {
    return (
      ball.x + ball.radius > this.x &&
      ball.x - ball.radius < this.x + this.width &&
      ball.y + ball.radius > this.y &&
      ball.y - ball.radius < this.y + this.height
    );
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

const ball = new Ball(canvas, ctx, canvas.width, canvas.height);
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

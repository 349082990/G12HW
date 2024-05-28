class Circle {
  x: number;
  y: number;
  radius: number;
  speed: number;
  movingRight: boolean; // Added to control movement direction

  constructor(x: number, y: number, radius: number, speed: number) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.speed = speed;
    this.movingRight = true; // Starts moving to the right
  }

  move() {
    // Move right until halfway, then move down
    if (this.movingRight) {
      if (this.x < canvas.width / 2) {
        this.x += this.speed; // Move right
      } else {
        this.movingRight = false; // Change direction to move down
      }
    } else {
      this.y += this.speed; // Move down
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = "blue";
    ctx.fill();
    ctx.closePath();
  }
}

class Path {
  x: number;
  y: number;
  width: number;
  height: number;

  constructor(x: number, y: number, width: number, height: number) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.moveTo(this.x, this.y + this.height / 2);
    ctx.lineTo(this.x + this.width / 2, this.y + this.height / 2);
    ctx.lineTo(this.x + this.width / 2, this.y + this.height);
    ctx.strokeStyle = "grey";
    ctx.lineWidth = 100;
    ctx.stroke();
  }
}

const canvas = document.createElement("canvas");
canvas.width = 600;
canvas.height = 400;
document.body.appendChild(canvas);

const ctx = canvas.getContext("2d");
if (!ctx) {
  throw new Error("Canvas context not supported");
}

const path = new Path(0, 0, canvas.width, canvas.height);
path.draw(ctx);

const circles: Circle[] = [];

function spawnCircle() {
  const circle = new Circle(0, canvas.height / 2 - 20, 20, 5); // Adjust starting position
  circles.push(circle);
}

setInterval(spawnCircle, 2000);

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  path.draw(ctx);

  for (let i = 0; i < circles.length; i++) {
    const circle = circles[i];
    circle.move();
    circle.draw(ctx);

    // Remove circle if it leaves the screen
    if (circle.y - circle.radius > canvas.height) {
      circles.splice(i, 1);
      i--;
    }
  }

  requestAnimationFrame(update);
}

update();

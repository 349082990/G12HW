class CanvasObject {
  constructor(public x: number, public y: number) {}

  draw(context: CanvasRenderingContext2D) {}
}

class Block extends CanvasObject {
  constructor(
    x: number,
    y: number,
    public width: number,
    public height: number,
    public color: string
  ) {
    super(x, y);
  }

  draw(context: CanvasRenderingContext2D) {
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, this.width, this.height);
  }

  isOutOfCanvas(canvasWidth: number): boolean {
    return this.x > canvasWidth;
  }
}

class Bullet extends CanvasObject {
  private dx: number = 0;
  private dy: number = 0;
  public exists: boolean = true;

  constructor(
    x: number,
    y: number,
    public radius: number,
    private speed: number,
    public color: string
  ) {
    super(x, y);
    this.dy = -speed;
  }

  draw(context: CanvasRenderingContext2D) {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    context.fillStyle = this.color;
    context.fill();
  }

  update(targetX: number, targetY: number) {
    if (!this.exists) return;

    const angle = Math.atan2(targetY - this.y, targetX - this.x); // find angle
    this.dx = Math.cos(angle) * this.speed;
    this.dy = Math.sin(angle) * this.speed;
    this.x += this.dx;
    this.y += this.dy;
  }

  blockCollision(block: Block): boolean {
    if (!this.exists) return false;

    const dx = block.x + block.width / 2 - this.x;
    const dy = block.y + block.height / 2 - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < block.width / 2 + this.radius) {
      this.exists = false;
      return true;
    }

    return false;
  }
}

class Turret extends Block {
  constructor(x: number, y: number) {
    super(
      x,
      y,
      50,
      50,
      `rgb(${Math.random() * 255},${Math.random() * 255},${
        Math.random() * 255
      })`
    );
  }
}

class Game {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private turret: Turret;
  private blocks: Block[] = [];
  private bullets: Bullet[] = [];

  constructor() {
    this.canvas = document.getElementById("game_screen") as HTMLCanvasElement;
    this.context = this.canvas.getContext("2d") as CanvasRenderingContext2D;
    this.canvas.width = 600;
    this.canvas.height = 400;

    this.turret = new Turret(
      Math.random() * (this.canvas.width - 50),
      this.canvas.height - 50
    );

    this.spawnMovingBlocks();
    setInterval(() => this.updateGame(), 16); // 60 fps

    document.addEventListener("click", (event) =>
      this.handleCanvasClick(event)
    );
  }

  private handleCanvasClick(event: MouseEvent) {
    const bullet = new Bullet(
      this.turret.x + this.turret.width / 2,
      this.turret.y + this.turret.height / 2,
      5,
      5,
      "black"
    );
    this.bullets.push(bullet);
  }

  private spawnMovingBlocks() {
    setInterval(() => {
      if (
        this.blocks.length === 0 ||
        this.blocks[this.blocks.length - 1].isOutOfCanvas(this.canvas.width)
      ) {
        this.blocks = this.blocks.filter(
          (block) => !block.isOutOfCanvas(this.canvas.width)
        );

        const block = new Block(
          -50,
          this.canvas.height / 2 - 25,
          50,
          50,
          `rgb(${Math.random() * 255},${Math.random() * 255},${
            Math.random() * 255
          })`
        );
        this.blocks.push(block);

        this.bullets.forEach((bullet) => {
          bullet.update(block.x + block.width / 2, block.y + block.height / 2);
        });
      }
    }, 1000);
  }

  // a lot of code taken from google
  private updateGame() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.turret.draw(this.context);

    this.blocks.forEach((block) => {
      block.x += 1;
      block.draw(this.context);
    });

    this.bullets = this.bullets.filter((bullet) => {
      bullet.update(
        this.blocks[0].x + this.blocks[0]?.width / 2 || 0,
        this.blocks[0].y + this.blocks[0]?.height / 2 || 0
      );
      bullet.draw(this.context);

      const collided = this.blocks.some((block) =>
        bullet.blockCollision(block)
      );
      const inCanvas =
        bullet.x > 0 &&
        bullet.x < this.canvas.width &&
        bullet.y > 0 &&
        bullet.y < this.canvas.height;
      return !collided && inCanvas;
    });
  }
}

new Game();

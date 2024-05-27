class GameObject {
  constructor(
    public x: number,
    public y: number,
    public w: number,
    public h: number,
    protected colour: string
  ) {}

  public draw() {
    Canvas.instance.context.fillStyle = this.colour;
    Canvas.instance.context.fillRect(this.x, this.y, this.w, this.h);
  }
}

class Hero extends GameObject {
  private moveSpd: number = 1;
  constructor(
    x: number,
    y: number,
    w: number,
    h: number,
    colour: string,
    private objects: GameObject[]
  ) {
    super(x, y, w, h, colour);
  }

  private hasCollided(): boolean {
    for (let object of this.objects) {
      if (
        this.x < object.x + object.w &&
        this.x + this.w > object.x &&
        this.y < object.y + object.h &&
        this.y + this.h > object.y
      ) {
        return true;
      }
    }
    return false;
  }

  public moveRight() {
    if (!this.hasCollided() && this.x + this.w < Canvas.WIDTH) {
      this.x += this.moveSpd;
    }
  }

  public moveDown() {
    if (!this.hasCollided() && this.y + this.h < Canvas.HEIGHT) {
      this.y += this.moveSpd;
    }
  }

  public moveLeft() {
    if (!this.hasCollided() && this.x <= 0) return;
    this.x -= this.moveSpd;
  }

  public moveUp() {
    if (!this.hasCollided() && this.y > 0) {
      this.y -= this.moveSpd;
    }
  }
}

class GameObject {
  constructor(
    protected x: number,
    protected y: number,
    protected w: number,
    protected h: number,
    protected colour: string
  ) {}

  public draw() {
    console.log(this.x, this.w);
    Canvas.instance.context.fillStyle = this.colour;
    Canvas.instance.context.fillRect(this.x, this.y, this.w, this.h);
  }
}

class Hero extends GameObject {
  private moveSpd: number = 1;

  public moveRight() {
    this.x += this.moveSpd;
  }

  public moveDown() {
    this.y += this.moveSpd;
  }
}

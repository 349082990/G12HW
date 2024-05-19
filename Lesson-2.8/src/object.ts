class GameObject {
  constructor(
    protected x: number,
    protected y: number,
    protected w: number,
    protected h: number,
    protected colour: string
  ) {}

  public draw() {
    Canvas.instance.context.fillStyle = this.colour;
    Canvas.instance.context?.rect(this.x, this.y, this.w, this.h);
    Canvas.instance.fill;
  }
}

class Hero extends GameObject {
  private moveSpd: number = 1;
}

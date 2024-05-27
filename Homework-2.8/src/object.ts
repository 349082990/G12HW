class GameObject {
  constructor(
    protected _x: number,
    protected _y: number,
    protected _w: number,
    protected _h: number,
    protected _colour: string
  ) {}

  public get x(): number {
    return this._x;
  }

  public get y(): number {
    return this._y;
  }

  public get w(): number {
    return this._w;
  }

  public get h(): number {
    return this._h;
  }

  public get colour(): string {
    return this._colour;
  }

  public draw() {
    Canvas.instance.context.fillStyle = this.colour;
    Canvas.instance.context.fillRect(this.x, this.y, this.w, this.h);
  }
}

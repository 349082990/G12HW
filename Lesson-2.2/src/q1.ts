class Video {
  readonly title: string;
  readonly length: number;
  private _format: string;
  private _platforms: string;

  constructor(
    title: string,
    length: number,
    _format: string,
    _platforms: string
  ) {
    this.title = title;
    this.length = length;
    this._format = _format;
    this._platforms = _platforms;
  }

  public get format() {
    return this._format;
  }

  public set format(f: string) {
    const validFormat = ["movie", "shorts", "show"];
    if (validFormat.includes(f)) {
      this._format = f;
    } else {
      throw new Error("That is not a valid format!");
    }
  }

  public get platforms() {
    return this._platforms;
  }

  public set platforms(p: string) {
    const validPlatforms = [
      "YouTube",
      "Netflix",
      "Prime Videos",
      "Apple+",
      "Disney+",
    ];
    if (validPlatforms.includes(p)) {
      this._platforms = p;
    } else {
      throw new Error("THat is not a valid platform!");
    }
  }

  public videoLength() {
    return `${Math.floor(this.length / 60)} hours ${Math.floor(
      this.length % 60
    )} minutes`;
  }

  public joinPlatform() {}
}

class Platform {
  readonly title: string;
  private video: Video[] = [];

  constructor(title: string) {
    this.title = title;
  }
}

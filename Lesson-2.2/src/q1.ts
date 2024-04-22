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
}

class Platform {
  readonly title: string;
  private _video: string;

  constructor(title: string, _video: string) {
    this.title = title;
    this._video = _video;
  }
}

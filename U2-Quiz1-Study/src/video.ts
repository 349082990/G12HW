class Video {
  readonly title: string;
  readonly length: number;
  private _format: string;
  private _platforms: Platform[];

  constructor(
    title: string,
    length: number,
    format: string,
    platforms: Platform[]
  ) {
    this.title = title;
    this.length = length;
    this._format = format;
    this._platforms = platforms;
  }

  public get format() {
    return this._format;
  }

  public set format(videoFormat: string) {
    const validFormats = ["movie", "shorts", "show"];
    if (validFormats.includes(videoFormat)) {
      this._format = videoFormat;
    } else {
      throw new Error("this is wrong");
    }
  }

  public get platforms(): Platform[] {
    return this._platforms;
  }

  public set platforms(videoPlatform: Platform[]) {
    const validPlatforms = [
      "YouTube",
      "Netflix",
      "Prime Videos",
      "Apple+",
      "Disney+",
    ];
    for (let i = 0; i < this.platforms.length; i++) {
      if (validPlatforms.includes(videoPlatform[i].title)) {
        this._platforms.push(videoPlatform);
      } else {
        throw new Error("wrong");
      }
    }
  }

  public videoLength() {
    return `${Math.floor(this.length / 60)} hours ${Math.floor(
      this.length % 60
    )} minutes`;
  }

  public joinPlatform(passedPlatform: Platform) {
    if (!this.platforms.includes(passedPlatform)) {
      this.platforms.push(passedPlatform);
      passedPlatform.addVideo(this);
    } else {
      throw new Error("invalid platform");
    }
  }

  public leavePlatform(passedPlatform: Platform) {}
}

class Platform {}

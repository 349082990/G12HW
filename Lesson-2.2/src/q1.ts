class Video {
  readonly title: string;
  readonly length: number;
  private _format: string;
  private _platforms: Platform[] = [];

  constructor(
    title: string,
    length: number,
    _format: string,
    _platforms: Platform[]
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

  public get platforms(): Platform[] {
    return this._platforms;
  }

  public set platforms(platforms: Platform[]) {
    const NUM_PLATFORMS = platforms.length;
    const validPlatforms = [
      "YouTube",
      "Netflix",
      "Prime Videos",
      "Apple+",
      "Disney+",
    ];
    for (let i = 0; i < NUM_PLATFORMS; i++) {
      if (validPlatforms.includes(platforms[i].title)) {
        this._platforms.push(platforms[i]);
      } else {
        throw new Error("THat is not a valid platform!");
      }
    }
  }

  public videoLength() {
    return `${Math.floor(this.length / 60)} hours ${Math.floor(
      this.length % 60
    )} minutes`;
  }

  public joinPlatform(platform: Platform) {
    // Check if already have platform (platforms is from getter)
    if (!this.platforms.includes(platform)) {
      this.platforms = [platform];
      platform.addVideo(this);
    }
  }

  public leavePlatform(platform: Platform) {
    const index = this._platforms.indexOf(platform);
    // If it IS in the array
    if (index !== -1) {
      this._platforms.splice(index, 1);
      platform.removeVideo(this);
    }
  }
}

class Platform {
  private _title: string;
  private _videos: Video[] = [];

  constructor(_title: string, videos: Video[]) {
    this._title = _title;
    this._videos = videos;
  }

  public get title() {
    return this._title;
  }

  public addVideo(video: Video) {
    this._videos.push(video);
    video.joinPlatform(this);
  }

  public createVideo(title: string, length: number, format: string) {
    const newVideo = new Video(title, length, format, [this]);
    this.addVideo(newVideo);
  }

  public removeVideo(video: Video) {
    const CUR_INDEX = this._videos.indexOf(video);
    if (CUR_INDEX !== -1) {
      this._videos.splice(CUR_INDEX, 1);
      video.leavePlatform(this);
    }
  }

  public listVideo() {
    const NUM_VIDEOS = this._videos.length;
    for (let i = 0; i < NUM_VIDEOS; i++) {
      console.log(this._videos);
    }
  }
}

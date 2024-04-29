class Video {
  private _format: string = "";
  private _platforms: Platform[] = [];

  constructor(
    readonly title: string,
    readonly length: number,
    format: string,
    platforms: Platform[]
  ) {
    this._format = format;
    this._platforms = platforms;
  }

  public get platforms(): Platform[] {
    return this._platforms;
  }

  private set platforms(platforms: Platform[]) {
    const VALID_PLATFORMS = [
      "YouTube",
      "Netflix",
      "Prime Videos",
      "Apple+",
      "Disney+",
    ];
    for (let i = 0; i < this._platforms.length; i++) {
      const CURRENT_PLATFORM: Platform = this._platforms[i];
      if (!VALID_PLATFORMS.includes(CURRENT_PLATFORM.title)) {
        throw new Error("Not a valid platform!");
      }
    }
    this._platforms = platforms;
  }

  public get format() {
    return this._format;
  }

  public set format(current: string) {
    const FORMATS = ["movie", "shorts", "show"];
    if (FORMATS.includes(current)) {
      this._format = current;
    } else {
      throw new Error("Not a valid format!");
    }
  }

  public videoLength(): string {
    const HOURS: number = Math.floor(this.length / 60);
    const MINUTES: number = Math.floor(this.length % 60);
    return `${HOURS} hours ${MINUTES} minutes long`;
  }

  public joinPlatform(platform: Platform): void {
    if (!this._platforms.includes(platform)) {
      this._platforms.push(platform);
      platform.addVideo(this);
    }
  }

  public leavePlatform(platform: Platform): void {
    const INDEX = this._platforms.indexOf(platform);
    if (INDEX !== -1) {
      this._platforms.splice(INDEX, 1);
      platform.removeVideo(this);
    }
  }
}

class Platform {
  constructor(private _title: string, private _videos: Video[] = []) {}

  public get title() {
    return this._title;
  }

  public addVideo(video: Video): void {
    if (video instanceof Video && !this._videos.includes(video)) {
      this._videos.push(video);
    }
  }

  public createVideo(title: string, length: number, format: string): void {
    const newVideo = new Video(title, length, format, [this]);
    this.addVideo(newVideo);
  }

  public removeVideo(video: Video): void {
    const index = this._videos.indexOf(video);
    if (index !== -1) {
      this._videos.splice(index, 1);
    }
  }

  public listVideo(): void {
    console.log(`Currently displaying data for plaform: ${this.title}`);

    if (this._videos.length === 0) {
      console.log("none");
      return;
    }

    for (let i = 0; i < this._videos.length; i++) {
      const CURRENT_VIDEO: Video = this._videos[i];
      const VIDEO_LENGTH: string = CURRENT_VIDEO.videoLength();
      const PLATFORMS: Platform[] = CURRENT_VIDEO.platforms;
      let plaformsString: string = "";
      for (let i = 0; i < PLATFORMS.length; i++) {
        plaformsString += PLATFORMS[i].title + ", ";
      }

      console.log(
        `Name: ${CURRENT_VIDEO.title}, Format: ${CURRENT_VIDEO.format},  Length: ${VIDEO_LENGTH}, Platforms: ${plaformsString}`
      );
    }
  }
}

const NETFLIX: Platform = new Platform("Netflix");
const YOUTUBE: Platform = new Platform("YouTube");
const PRIME_VIDEOS: Platform = new Platform("Prime Videos");
const APPLE_PLUS: Platform = new Platform("Apple+");
const DISNEY_PLUS: Platform = new Platform("Disney+");

displayAllPlatforms();

NETFLIX.createVideo("disneymovie", 100, "movie");

displayAllPlatforms();

const TEST_YT_VID: Video = new Video("youtube test", 10, "shorts", []);

NETFLIX.addVideo(TEST_YT_VID);
TEST_YT_VID.joinPlatform(YOUTUBE);
displayAllPlatforms();

PRIME_VIDEOS.addVideo(TEST_YT_VID);

displayAllPlatforms();

TEST_YT_VID.leavePlatform(NETFLIX);

displayAllPlatforms();

function displayAllPlatforms(): void {
  console.log("---------------");
  NETFLIX.listVideo();
  YOUTUBE.listVideo();
  PRIME_VIDEOS.listVideo();
  APPLE_PLUS.listVideo();
  DISNEY_PLUS.listVideo();
  console.log("---------------");
}

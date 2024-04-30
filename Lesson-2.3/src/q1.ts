class Video {
  readonly title: string;
  readonly length: number;
  private _format: string = "";
  private _platforms: Platform[] = [];

  constructor(
    title: string,
    length: number,
    format: string,
    platforms: Platform[]
  ) {
    this.title = title;
    this.length = length;
    this.format = format;
    this.platforms = platforms;
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
        throw new Error("That is not a valid platform!");
      }
    }
  }

  public videoLength() {
    return `${Math.floor(this.length / 60)} hours ${Math.floor(
      this.length % 60
    )} minutes`;
  }

  public joinPlatform(platform: Platform) {
    if (!this.platforms.includes(platform)) {
      this.platforms = [platform];
      platform.addVideo(this);
    }
  }

  public leavePlatform(platform: Platform) {
    const index = this._platforms.indexOf(platform);
    if (index !== -1) {
      this._platforms.splice(index, 1);
      platform.removeVideo(this);
    }
  }
}

class Platform {
  private _title: string;
  private _videos: Video[] = [];

  constructor(_title: string) {
    this._title = _title;
  }

  public get title() {
    return this._title;
  }

  public addVideo(video: Video) {
    this._videos.push(video);
    video.joinPlatform(this);
  }

  public createVideo(title: string, format: string, length: number) {
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
  public listVideo(): void {
    console.log(`Currently displaying data for platform: ${this._title}`);

    if (this._videos.length === 0) {
      console.log("None");
      return;
    }

    for (let i = 0; i < this._videos.length; i++) {
      const CURRENT_VIDEO: Video = this._videos[i];
      const VIDEO_LENGTH: string = CURRENT_VIDEO.videoLength();
      const VIDEO_FORMAT: string = CURRENT_VIDEO.format;
      const PLATFORMS: Platform[] = CURRENT_VIDEO.platforms;
      let platformsString: string = "";

      for (let j = 0; j < PLATFORMS.length; j++) {
        platformsString += PLATFORMS[j].title + ", ";
      }

      console.log(
        `Name: ${CURRENT_VIDEO.title}, Format: ${VIDEO_FORMAT}, Length: ${VIDEO_LENGTH}, Platforms: ${platformsString}`
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

NETFLIX.createVideo("disneymovie", "movie", 100);

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
  console.log("**");
  NETFLIX.listVideo();
  YOUTUBE.listVideo();
  PRIME_VIDEOS.listVideo();
  APPLE_PLUS.listVideo();
  DISNEY_PLUS.listVideo();
  console.log("**");
}

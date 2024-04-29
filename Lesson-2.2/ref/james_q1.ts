class Platform {
  private _title: string = "";
  constructor(title: string, private videos: Video[] = []) {
    this.title = title;
  }

  private set title(s: string) {
    if (s !== "") {
      this._title = s;
    } else {
      throw new Error("title cannot be empty");
    }
  }

  public get title(): string {
    return this._title;
  }

  public addVideo(video: Video) {
    if (!this.videos.includes(video)) {
      this.videos.push(video);
      video.joinPlatform(this);
    } else {
      console.error("this video already exists on this platform");
    }
  }

  public createVideo(
    videoTitle: string,
    videoLength: number,
    videoFormat: string
  ) {
    const NEW_VIDEO: Video = new Video(
      videoTitle,
      videoFormat,
      videoLength,
      []
    );
    this.addVideo(NEW_VIDEO);
  }

  public removeVideo(videoTitle: string) {
    for (let i = 0; i < this.videos.length; i++) {
      const CURRENT_VIDEO: Video = this.videos[i];
      if (CURRENT_VIDEO.title === videoTitle) {
        this.videos.splice(i, 1);
        CURRENT_VIDEO.leavePlatform(this);
        return;
      }
    }
    console.error("the video to remove does not exist on this platform");
  }

  public listVideo(): void {
    console.log(`Currently displaying data for plaform: ${this.title}`);

    if (this.videos.length === 0) {
      console.error("no videos on this platform yet");
      return;
    }

    for (let i = 0; i < this.videos.length; i++) {
      const CURRENT_VIDEO: Video = this.videos[i];
      const VIDEO_LENGTH: number[] = CURRENT_VIDEO.videoLength();
      const PLATFORMS: Platform[] = CURRENT_VIDEO.platforms;
      let plaformsString: string = "";
      for (let i = 0; i < PLATFORMS.length; i++) {
        plaformsString += PLATFORMS[i].title + ", ";
      }

      console.log(
        `Name: ${CURRENT_VIDEO.title}, Format: ${CURRENT_VIDEO.format},  Length: ${VIDEO_LENGTH[0]} Hours ${VIDEO_LENGTH[1]} Minutes, Platforms: ${plaformsString}`
      );
    }
  }
}

class Video {
  private static possibleFormats: string[] = ["movie", "shorts", "show"];
  private static possiblePlatforms: string[] = [
    "YouTube",
    "Netflix",
    "Prime Videos",
    "Apple+",
    "Disney+",
  ];

  private _title: string = "";
  private _format: string = "";
  private _length: number = 0;
  private _platforms: Platform[] = [];

  constructor(
    title: string,
    format: string,
    length: number,
    platforms: Platform[]
  ) {
    this.title = title;
    this.format = format;
    this.length = length;
    this.platforms = platforms;
  }

  private set title(s: string) {
    if (s !== "") {
      this._title = s;
    } else {
      throw new Error("title can't be empty");
    }
  }

  public get title() {
    return this._title;
  }

  private set format(s: string) {
    if (Video.possibleFormats.includes(s)) {
      this._format = s;
    } else {
      throw new Error("not a valid video format");
    }
  }

  public get format(): string {
    return this._format;
  }

  private set length(length: number) {
    if (length > 0) {
      this._length = length;
    } else {
      throw new Error("video length cannot be 0 or negative");
    }
  }

  private get length(): number {
    return this._length;
  }

  private set platforms(platforms: Platform[]) {
    for (let i = 0; i < this._platforms.length; i++) {
      const CURRENT_PLATFORM: Platform = this._platforms[i];
      if (!Video.possiblePlatforms.includes(CURRENT_PLATFORM.title)) {
        throw new Error(`${CURRENT_PLATFORM.title} is not a valid platform`);
      }
    }
    this._platforms = platforms;
  }

  public get platforms(): Platform[] {
    return this._platforms;
  }

  public videoLength(): number[] {
    const HOURS: number = Math.floor(this.length / 60);
    const MINUTES: number = this.length - HOURS * 60;
    return [HOURS, MINUTES];
  }

  public joinPlatform(platform: Platform): void {
    if (!this.platforms.includes(platform)) {
      if (Video.possiblePlatforms.includes(platform.title)) {
        this.platforms.push(platform);
        platform.addVideo(this);
      } else {
        console.error("platform does not exist");
      }
    } else {
      console.error("video is already on this platform");
    }
  }

  public leavePlatform(platform: Platform): void {
    if (this.platforms.includes(platform)) {
      const INDEX: number = this.platforms.indexOf(platform);
      this.platforms.splice(INDEX, 1);
      platform.removeVideo(this.title);
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

const TEST_YT_VID: Video = new Video("youtube test", "shorts", 10, []);

NETFLIX.addVideo(TEST_YT_VID);
TEST_YT_VID.joinPlatform(YOUTUBE);
displayAllPlatforms();

PRIME_VIDEOS.addVideo(TEST_YT_VID);

displayAllPlatforms();

TEST_YT_VID.leavePlatform(NETFLIX);

displayAllPlatforms();

function displayAllPlatforms(): void {
  console.log("****************************");
  NETFLIX.listVideo();
  YOUTUBE.listVideo();
  PRIME_VIDEOS.listVideo();
  APPLE_PLUS.listVideo();
  DISNEY_PLUS.listVideo();
  console.log("****************************");
}

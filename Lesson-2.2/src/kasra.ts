// public listVideo() {
//     // return a list of all the videos in the platform
//     let vids: string[] = [];
//     for (const video of this._videos) {
//       vids.push(video.title);
//     }
//     return vids;
//   }
// class Video {
//   readonly title: string;
//   private _length: number;
//   private _format: string;
//   private _platforms: Platform[];

//   constructor(
//     title: string,
//     length: number,
//     format: string,
//     platforms: Platform[]
//   ) {
//     this.title = title;
//     this._length = length;
//     this._format = format;
//     this._platforms = platforms;
//   }

//   public get platforms() {
//     return this._platforms;
//   }

//   public get format() {
//     return this._format;
//   }

//   public set format(val: string) {
//     const types = ["movie", "show"];
//     if (types.includes(val)) {
//       this._format = val;
//     } else {
//       throw new Error("Invalid format");
//     }
//   }

//   public set platforms(platforms: Platform[]) {
//     const types = ["YouTube", "Netflix", "Prime Videos", "Apple+", "Disney+"];
//     if (platforms.length > 0) {
//       for (const platform of platforms) {
//         if (types.includes(platform.title)) {
//           this._platforms.push(platform);
//         } else {
//           throw new Error("Invalid platform");
//         }
//       }
//     } else {
//       this._platforms = [];
//     }
//   }

//   public movieLength() {
//     // return the length of the movie in hours and minutes
//     return ${Math.floor(this._length / 60)}h ${this._length % 60}m;
//   }

//   public joinPlatform(platform: Platform) {
//     // add the platform to the list of platforms
//     if (!this.platforms.includes(platform)) {
//       this.platforms = [platform];
//       platform.addVideo(this);
//     }
//   }

//   public removePlatform(platform: Platform) {
//     // remove the platform from the list of platforms
//     const index = this._platforms.indexOf(platform);
//     if (index !== -1) {
//       this._platforms.splice(index, 1);
//       platform.removeVideo(this);
//     }
//   }
// }
// class Platform {
//   private _title: string;
//   private _videos: Video[];
//   constructor(title: string, videos: Video[]) {
//     this._title = title;
//     this._videos = videos;
//   }

//   public get title() {
//     return this._title;
//   }

//   public addVideo(video: Video) {
//     // add the video to the list of videos
//     if (!this._videos.includes(video)) {
//       this._videos.push(video);
//       video.joinPlatform(this);
//     }
//   }

//   public createVideo(title: string, length: number, format: string) {
//     // create a new video and add it to the list of videos
//     const newVideo = new Video(title, length, format, [this]);
//     this.addVideo(newVideo);
//   }

//   public removeVideo(video: Video) {
//     // remove the video from the list of videos
//     const index = this._videos.indexOf(video);
//     if (index !== -1) {
//       this._videos.splice(index, 1);
//       video.removePlatform(this);
//     }
//   }

//   public listVideo() {
//     // return a list of all the videos in the platform
//     let vids: string[] = [];
//     for (const video of this._videos) {
//       vids.push(video.title);
//     }
//     return vids;
//   }
// }

// const platform4 = new Platform("Netflix", []);
// platform4.createVideo("Sci-fi Thriller", 140, "movie");
// console.log(platform4.listVideo()); // Expected to show details of the created video.
// platform4.removeVideo(platform4._videos[0]);
// console.log(platform4.listVideo()); // Expected to be empty, showing no videos.

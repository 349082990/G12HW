//From day 1
class BasketballPlayer {
  private league: string = "NBA";
  constructor(
    readonly firstName: string,
    readonly lastName: string,
    private _position: string,
    readonly spdRating: number,
    readonly offRating: number,
    readonly defRating: number
  ) {}

  public get position() {
    return this._position;
  }

  public set position(p: string) {
    const validPositions = [
      "Centre",
      "Power Forward",
      "Small Forward",
      "Shooting Guard",
      "Point Guard",
    ];

    if (validPositions.includes(p)) {
      this._position = p;
    } else {
      throw new Error("That is not a valid position in basketball!");
    }
  }

  public fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  public avgRating(): number {
    return (this.spdRating + this.offRating + this.defRating) / 3;
  }

  public highestRating(): number {
    if (this.spdRating > this.defRating && this.spdRating > this.offRating) {
      return this.spdRating;
    } else if (
      this.defRating > this.spdRating &&
      this.defRating > this.offRating
    ) {
      return this.defRating;
    } else {
      return this.offRating;
    }
  }
}

const player1 = new BasketballPlayer(
  "Michael",
  "Jordan",
  "Shooting Guard",
  7,
  9,
  8.5
);

const player2 = new BasketballPlayer(
  "Lebron",
  "James",
  "Small Forward",
  7,
  9.5,
  9.5
);

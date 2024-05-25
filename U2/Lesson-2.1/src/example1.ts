//From day 1

class BasketballPlayer {
  readonly league: string = "NBA";
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

class Character {
  constructor(
    private _curHP: number,
    readonly maxHP: number,
    readonly firstName: string,
    readonly lastName: string,
    private _characterClass: string
  ) {}

  public get characterClass{
    return this._characterClass;
  }

  public set characterClass(s:string) {
    const validClasses = ["Knight", "Wizard", "Thief", "Warrior"]

    if(validClasses.includes(s)){
      this._characterClass = s;
    }else {
      throw new Error("That is not a valid character class in this game");
    }
  }

  public get curHP() {
    return this._curHP;
  }

  public determineHPLost(dmg: number) {
    //What if character has no hp
    if (dmg < 0) {
      throw new Error("That actually is healing...");
    } else if (this._curHP - dmg < 0) {
      //What if dmg < 0
      this._curHP = 0;
    } else {
      this._curHP -= dmg;
    }
  }

  public guildTag() {
    return this.firstName + " " + this.lastName + "-" + this.characterClass;
  }
}

const p1 = new Character(10, 20, "Bob", "Marley", "Wizard");
const p2 = new Character(20, 30, "Bilbo", "Baggins", "Thief");
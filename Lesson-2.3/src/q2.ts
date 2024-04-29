class BulkTank {
  private _tankCapacity: number = 0;
  private _tankAmount: number = 0;

  constructor(tankCapacity: number = 2000) {
    this.tankCapacity = tankCapacity;
  }

  public get tankCapacity(): number {
    return this.tankCapacity;
  }

  public set tankCapacity(value: number) {
    if (value > 0) {
      this.tankCapacity = 0;
    } else {
      throw new Error("You cannot input a negative number! Please try again. ");
    }
  }

  public addtoTank(addAmount: number): void {
    if (this._tankAmount + addAmount <= this._tankCapacity) {
      this._tankAmount + addAmount;
    } else {
      this._tankAmount = this._tankCapacity;
    }
  }

  public getFromTank(getAmount: number): void {
    if (this._tankAmount - getAmount <= this.tankCapacity) {
      this._tankAmount - getAmount;
    } else {
      this._tankAmount = 0;
    }
  }

  public getCapacity(): string {
    return `${this._tankAmount} / ${this._tankCapacity}`;
  }
}

class Cow {
  private _names: string;
  private _udderAmount: number = 0;
  private _isMilkable: boolean = false;
  readonly udderCapacity: number = Math.floor(Math.random() * 26) + 15; // (max - min + 1) + min
  constructor(names: string | null = null) {
    const NAMES = [
      "Anu",
      "Arpa",
      "Essi",
      "Heluna",
      "Hely",
      "Hento",
      "Hilke",
      "Hilsu",
      "Hymy",
      "Ihq",
      "Ilme",
      "Ilo",
      "Jaana",
      "Jami",
      "Jatta",
      "Laku",
      "Liekki",
      "Mainikki",
      "Mella",
      "Mimmi",
      "Naatti",
      "Nina",
      "Nyytti",
      "Papu",
      "Pullukka",
      "Pulu",
      "Rima",
      "Soma",
      "Sylkki",
      "Valpu",
      "Virpi",
    ];
    if (NAMES) {
      this._names = names;
    } else {
      this._names = NAMES[Math.floor(Math.random() * names.length)];
    }
  }

  public getCapacity(): string {
    return `${this._names} ${this._udderAmount}/${this.udderCapacity}`;
  }

  public checkCapacity(): void {
    if (this._udderAmount >= this.udderCapacity) {
      this._isMilkable = true;
    } else {
      this._isMilkable = false;
    }
  }

  public hourPast(): void {
    const hourlyRefill = Math.floor(Math.random() * 2.3) + 0.7;
    if (this._udderAmount + hourlyRefill <= this.udderCapacity) {
      this._udderAmount += hourlyRefill;
    } else {
      this._udderAmount = this.udderCapacity;
    }
  }

  public milk(): number {
    this.checkCapacity();

    if (!this._isMilkable) {
      throw new Error(
        "The cow isn't ready to be milked! It's udder is empty. "
      );
    }

    const AMOUNT_EXTRACTED = this._udderAmount;
    this._udderAmount = 0;
    return AMOUNT_EXTRACTED;
  }
}

class MilkingRobots {}

class Barn {}

class Farm {}

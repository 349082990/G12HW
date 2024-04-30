class BulkTank {
  private _tankCapacity: number = 0;
  private _tankAmount: number = 0;

  constructor(tankCapacity: number = 2000) {
    this.tankCapacity = tankCapacity;
  }

  public get tankCapacity(): number {
    return this._tankCapacity;
  }

  public set tankCapacity(value: number) {
    if (value > 0) {
      this._tankCapacity = value;
    } else {
      throw new Error("You cannot input a negative number! Please try again. ");
    }
  }

  public addToTank(addAmount: number): void {
    if (this._tankAmount + addAmount <= this._tankCapacity) {
      this._tankAmount += addAmount;
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

// The checkcapacity and milk method are not working
class Cow {
  private _names: string;
  private _udderAmount: number = 0;
  readonly udderCapacity: number = Math.floor(Math.random() * 26) + 15; // (max - min + 1) + min
  constructor(name: string | null = null) {
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
    if (name) {
      this._names = name;
    } else {
      this._names = NAMES[Math.floor(Math.random() * NAMES.length)];
    }
  }

  public getCapacity(): string {
    return `${this._names} ${this._udderAmount}/${this.udderCapacity}`;
  }

  public hourPast(): void {
    const hourlyRefill = Math.floor(Math.random() * 2.3) + 0.7;
    if (this._udderAmount + hourlyRefill <= this.udderCapacity) {
      this._udderAmount += hourlyRefill;
    } else {
      this._udderAmount = this.udderCapacity;
    }
  }

  public set udderAmount(value: number) {
    if (value > 0) {
      this._udderAmount = value;
    } else {
      throw new Error("Invalid number. Cow cannot be milked! ");
    }
  }

  public milk(): number {
    const AMOUNT_EXTRACTED = this._udderAmount;
    this._udderAmount = 0;
    return AMOUNT_EXTRACTED;
  }
}

class MilkingRobot {
  private _bulkTank: BulkTank | null = null;

  constructor(bulkTank: BulkTank | null = null) {
    if (bulkTank) {
      this._bulkTank = bulkTank;
    }
  }

  public setBulkTank(tank: BulkTank): void {
    this._bulkTank = tank;
  }

  public milk(whichCow: Cow) {
    if (this._bulkTank) {
      this._bulkTank.addToTank(whichCow.milk());
    } else {
      throw new Error("Milking robot hasn't been installed with a BulkTank");
    }
  }
}

class Barn {
  private _cowList: Cow[] = [];
  private _milkingRobot: MilkingRobot | undefined;

  constructor(private tank: BulkTank) {}

  public set bulkTank(presentBulkTank: BulkTank) {
    if (!presentBulkTank) {
      throw new Error(
        "BulkTank is not present! It must be instantiated with an existing BulkTank."
      );
    }
    this.tank = presentBulkTank;
  }

  public getCapacity(): string {
    return this.tank.getCapacity();
  }

  private get milkingRobot() {
    if (!this._milkingRobot) {
      throw new Error("A milking robot is not attached to this barn!");
    }
    return this._milkingRobot;
  }

  public installMilkingRobot(newRobot: MilkingRobot) {
    this._milkingRobot = newRobot;
    this._milkingRobot.setBulkTank(this.tank);
  }

  public get cowList(): Cow[] {
    return this._cowList;
  }

  public addCow(cow: Cow): void {
    this._cowList.push(cow);
  }

  public takeCareOf(cow: Cow | null = null): void {
    if (cow === null) {
      for (const COW of this._cowList) {
        this.milkingRobot.milk(COW);
      }
    } else if (this._cowList.includes(cow)) {
      this.milkingRobot.milk(cow);
    }
  }
}

class Farm {
  private _owner: string = "";
  private _barn: Barn | undefined = undefined;

  constructor(owner: string, barn: Barn) {
    this.owner = owner;
    this.barn = barn;
  }

  public get owner(): string {
    return this._owner;
  }

  private set owner(owner: string) {
    if (owner !== "") {
      this._owner = owner;
    } else {
      throw new Error("Owner's name cannot be empty.");
    }
  }

  private get barn(): Barn {
    if (!this._barn) {
      throw new Error("No barns exist on this farm.");
    }
    return this._barn;
  }

  private set barn(barn: Barn) {
    this._barn = barn;
  }

  public manageCows(): void {
    this.barn.takeCareOf();
  }

  public addCow(cow: Cow): void {
    this.barn.addCow(cow);
  }

  public hourPast(): void {
    for (const cow of this.barn.cowList) {
      cow.hourPast();
    }
  }

  public installMilkingRobot(robot: MilkingRobot): void {
    this.barn.installMilkingRobot(robot);
  }
}

const barn = new Barn(new BulkTank());
console.log("Barn: " + barn.getCapacity());

const robot = new MilkingRobot();
barn.installMilkingRobot(robot);

const ammu = new Cow("Ammu");
ammu.hourPast();
ammu.hourPast();

barn.takeCareOf(ammu);
console.log("Barn: " + barn.getCapacity());

barn.addCow(ammu);
barn.addCow(new Cow());

for (let cow of barn.cowList) {
  cow.hourPast();
  cow.hourPast();
}

barn.takeCareOf();
console.log("Barn: " + barn.getCapacity());

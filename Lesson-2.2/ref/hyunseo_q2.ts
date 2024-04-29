class BulkTank {
  private _capacity: number = 0;
  private _amount: number = 0;

  constructor(capacity: number = 2000) {
    this.capacity = capacity;
  }

  public set capacity(value: number) {
    if (value > 0) {
      this._capacity = value;
    } else {
      throw new Error("Capacity must be a positive number.");
    }
  }

  public get capacity(): number {
    return this._capacity;
  }

  public addToTank(amount: number): void {
    if (this._amount + amount <= this._capacity) {
      this._amount += amount;
    } else {
      this._amount = this._capacity;
    }
  }

  public getFromTank(amount: number): void {
    if (this._amount - amount >= 0) {
      this._amount -= amount;
    } else {
      this._amount = 0;
    }
  }

  public getCapacity(): string {
    return this._amount + "/" + this._capacity;
  }
}

class Cow {
  private _name: string;
  readonly udder: number = Math.floor(Math.random() * 26) + 15;
  private _amount: number = 0;
  private _milkable: boolean = true;

  constructor(name: string | null = null) {
    const names = [
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
      this._name = name;
    } else {
      this._name = names[Math.floor(Math.random() * names.length)];
    }
  }

  public getCapacity(): string {
    return this._name + " " + this._amount.toFixed(1) + "/" + this.udder;
  }

  public milk(): number {
    const holder = this._amount;
    this._amount = 0;
    return holder;
  }

  public hourPast(): void {
    const newMilk = Math.floor(Math.random() * 2.3) + 0.7;
    if (this._amount + newMilk <= this.udder) {
      this._amount += newMilk;
    } else {
      this._amount = this.udder;
    }
  }
}

class MilkingRobot {
  private _bulkTank: BulkTank | null = null;

  public setBulkTank(bulkTank: BulkTank) {
    this._bulkTank = bulkTank;
  }

  public milk(cow: Cow) {
    if (this._bulkTank) {
      this._bulkTank.addToTank(cow.milk());
    } else {
      throw new Error("Milking robot hasn't been installed with a BulkTank");
    }
  }
}

class Barn {
  private _cowList: Cow[] = [];
  private _milkingRobot: MilkingRobot | null = null;
  private _bulkTank: BulkTank;

  constructor(bulkTank: BulkTank) {
    this._bulkTank = bulkTank;
  }

  public set bulkTank(value: BulkTank) {
    if (value) {
      this._bulkTank = value;
    } else {
      throw new Error("BulkTank must be provided.");
    }
  }

  public get bulkTank(): BulkTank {
    return this._bulkTank;
  }

  public get cowList(): Cow[] {
    return this._cowList;
  }

  public addCow(cow: Cow) {
    this._cowList.push(cow);
  }

  public takeCareOf(cow: any = null) {
    if (this._milkingRobot) {
      if (cow === null) {
        for (const cows of this._cowList) {
          this._milkingRobot.milk(cows);
        }
      } else {
        this._milkingRobot.milk(cow);
      }
    }
  }

  public getCapacity() {
    return this._bulkTank.getCapacity();
  }

  public installMilkingRobot(robot: MilkingRobot) {
    this._milkingRobot = robot;
    this._milkingRobot.setBulkTank(this._bulkTank);
  }
}

class Farm {
  readonly owner: string;
  private _barn: Barn | null = null;
  private _cowList: Cow[] = [];

  constructor(owner: string, barn: Barn | null) {
    this.owner = owner;
    this.barn = barn;
  }

  public get barn(): Barn | null {
    return this._barn;
  }

  public set barn(barn: Barn | null) {
    if (barn) {
      this._barn = barn;
    } else {
      throw new Error("Farm must be instantiated with a barn.");
    }
  }

  public get CowList(): Cow[] {
    return this._cowList;
  }

  public addCow(cow: Cow) {
    if (this.barn) {
      this.barn.addCow(cow);
    }
    this._cowList.push(cow);
  }

  public hourPast() {
    for (const cow of this._cowList) {
      cow.hourPast();
    }
  }

  public manageCows() {
    if (this.barn) {
      this.barn.takeCareOf();
    }
  }

  public logistics() {
    let result = `Farm owner: ${this.owner}\n`;
    if (this.barn) {
      result += `Barn bulk tank: ${this.barn.getCapacity()}\n`;
    }
    if (this._cowList.length === 0) {
      result += "No cows.\n";
    } else {
      result += "Animals:\n";
      for (const cow of this._cowList) {
        result += `\t${cow.getCapacity()}\n`;
      }
    }
    return result;
  }

  public installMilkingRobot(robot: MilkingRobot) {
    if (this._barn) {
      this._barn.installMilkingRobot(robot);
    } else {
      throw new Error("Farm must have a barn to install a milking robot.");
    }
  }
}

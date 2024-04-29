class BulkTank {
  private capacity: number;
  private amount: number = 0;
  constructor(capacity: number = 2000) {
    this.capacity = capacity;
  }

  public addToTank(amount: number): void {
    if (this.amount + amount <= this.capacity) {
      this.amount += amount;
    } else {
      this.amount = this.capacity;
    }
  }

  public getFromTank(amount: number): void {
    if (this.amount - amount >= 0) {
      this.amount -= amount;
    } else {
      this.amount = 0;
    }
  }

  public getCapacity(): string {
    return this.amount + "/" + this.capacity;
  }
}

class Cow {
  private _name: string;
  private _udder: number = Math.floor(Math.random() * 26) + 15;
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
      this._name = names[Math.floor(Math.random() * (names.length + 1))];
    }
  }

  public milk(): number {
    const holder = this._amount;
    this._amount = 0;
    return this._amount;
  }

  public getCapacity(): string {
    return this._name + " " + this._amount + "/" + this._udder;
  }

  public hourPast(): void {
    const newMilk = Math.floor(Math.random() * 2.3) + 0.7;
    if (this._amount + newMilk <= this._udder) {
      this._amount += newMilk;
    } else {
      this._amount = this._udder;
    }
  }
}

class MilkingRobot {
  private bulkTank: BulkTank | null = null;
  public setBulkTank(bulkTank: BulkTank) {
    this.bulkTank = bulkTank;
  }
  public milk(cow: Cow) {
    if (this.bulkTank) {
      this.bulkTank.addToTank(cow.milk());
    } else {
      throw new Error(
        "Error: Milking robot hasn't been installed with a BulkTank"
      );
    }
  }
}

class Barns {
  private cowList: Cow[];
  private milkingRobot: MilkingRobot | null = null;
  private bulkTank: BulkTank;

  constructor() {}

  public addCow(cow: Cow) {
    this.cowList.push(cow);
  }

  public takeCarOf(cow: any = null) {
    if (this.milkingRobot) {
      if (!cow) {
        for (const cow of this.cowList) {
          this.milkingRobot.milk(cow);
        }
      }
    }
  }
  public getCapacity() {
    return this.bulkTank.getCapacity();
  }
}

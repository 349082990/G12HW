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

  public getCapacity(): string {
    return this._amount + "/" + this._capacity;
  }

  public set amount(value: number) {
    if (value >= 0) {
      this._amount = value;
    } else {
      throw new Error("Amount cannot be negative.");
    }
  }

  public get amount(): number {
    return this._amount;
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
}

class Cow {
  private _name: string;
  readonly udder: number = Math.floor(Math.random() * 26) + 15;
  private _amount: number = 0;

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
    } else if (name === null) {
      this._name = names[Math.floor(Math.random() * names.length)];
    } else {
      throw new Error("Not a valid name!");
    }
  }

  public set amount(value: number) {
    if (value >= 0) {
      this._amount = value;
    } else {
      throw new Error("Amount cannot be negative.");
    }
  }

  public get amount(): number {
    return this._amount;
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

  public getBulkTank(): BulkTank | null {
    return this._bulkTank;
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
  private _milkingRobot: MilkingRobot;
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

  public get milkingRobot(): MilkingRobot {
    return this._milkingRobot;
  }

  public set MilkingRobot(value: number) {}

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

// Example input 1
// const tank1 = new BulkTank();
// tank1.getFromTank(100);
// tank1.addToTank(25);
// tank1.getFromTank(5);
// console.log(tank1.getCapacity());

// const tank2 = new BulkTank(50);
// tank2.addToTank(100);
// console.log(tank2.getCapacity());

// output
// 20/2000
// 50/50

// Example input 2
// const cow = new Cow();
// console.log(cow.getCapacity());

// cow.hourPast();
// cow.hourPast();
// cow.hourPast();
// cow.hourPast();

// console.log(cow.getCapacity());

// cow.milk();

// console.log(cow.getCapacity());

// const cow2 = new Cow("Ammu");
// console.log(cow2.getCapacity());
// cow2.hourPast();
// cow2.hourPast();
// console.log(cow2.getCapacity());

// cow2.milk();

// console.log(cow2.getCapacity());

//output ex
// Liekki 0/23
// Liekki 7/23
// Liekki 0/23
// Ammu 0/35
// Ammu 9/35
// Ammu 0/35

// Example input 3
// const milkingRobot = new MilkingRobot();
// const cow = new Cow();
// milkingRobot.milk(cow);

//output
// Error: Milking robot hasn't been installed with a BulkTank

//Example input 4
// const milkingRobot = new MilkingRobot();
// const cow = new Cow();
// const tank = new BulkTank();
// milkingRobot.setBulkTank(tank);
// console.log("Bulk tank: " + tank.getCapacity());

// for (let i = 0; i < 2; i++) {
//     console.log(cow.getCapacity());
//     for (let j = 0; j < 5; j++) {
//         cow.hourPast();
//     }
//     console.log(cow.getCapacity());

//     console.log("Milking...");
//     milkingRobot.milk(cow);
//     console.log("Bulk tank: " + tank.getCapacity());
// }

//output ex
// Bulk tank: 0/2000
// Mella 0/23
// Mella 6.2/23
// Milking...
// Bulk tank: 6.2/2000

// Mella 0/23
// Mella 7.8/23
// Milking...
// Bulk tank: 14/2000

//Example input 5
// const barn = new Barn(new BulkTank());
// console.log("Barn: " + barn.getCapacity());

// const robot = new MilkingRobot();
// barn.installMilkingRobot(robot);

// const ammu = new Cow('Ammu');
// ammu.hourPast();
// ammu.hourPast();

// barn.takeCareOf(ammu);
// console.log("Barn: " + barn.getCapacity());

// barn.addCow(ammu);
// barn.addCow(new Cow());

// for (let cow of barn.cowList) {
//     cow.hourPast();
//     cow.hourPast();
// }

// barn.takeCareOf();
// console.log("Barn: " + barn.getCapacity());

//output ex
// Barn: 0/2000
// Barn: 2.8/2000
// Barn: 9.6/2000

//Example input 6
// const farm = new Farm("Esko", new Barn(new BulkTank()));
// console.log(farm.logistics());

// console.log(farm.owner + " is a tough guy!");

//output
// Farm owner: Esko
// Barn bulk tank: 0/2000
// No cows.
// Esko is a tough guy!

//Example input 7
// const farm = new Farm("Esko", new Barn(new BulkTank()));
// farm.addCow(new Cow());
// farm.addCow(new Cow());
// farm.addCow(new Cow());
// console.log(farm.logistics());

// output ex
// Farm owner: Esko
// Barn bulk tank: 0/2000
// Animals:
//         Naatti 0/19
//         Hilke 0/30
//         Sylkki 0/29

// Example input 8
// const farm = new Farm("Esko", new Barn(new BulkTank()));

// farm.addCow(new Cow());
// farm.addCow(new Cow());
// farm.addCow(new Cow());

// farm.hourPast();
// farm.hourPast();
// console.log(farm.logistics());

// output ex
// Farm owner: Esko
// Barn bulk tank: 0/2000
// Animals:
//         Heluna 2/17
//         Rima 3/32
//         Ilo 3/25

// Example input 9
// const farm = new Farm("Esko", new Barn(new BulkTank()));
// const robot = new MilkingRobot();
// farm.installMilkingRobot(robot);

// farm.addCow(new Cow());
// farm.addCow(new Cow());
// farm.addCow(new Cow());

// farm.hourPast();
// farm.hourPast();

// farm.manageCows();

// // console.log(farm)
// console.log(farm.logistics());

// output ex
// Farm owner: Esko
// Barn bulk tank: 18/2000
// Animals:
//         Hilke 0/30
//         Sylkki 0/35
//         Hento 0/34

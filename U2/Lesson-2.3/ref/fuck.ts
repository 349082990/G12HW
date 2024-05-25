class Barn {
  private _robot: MilkingRobot | undefined;
  private _cowList: Cow[] = [];


  constructor(private tank: BulkTank) { }


  private set robot(robot: MilkingRobot) {
    this._robot = robot;
  }


  private get robot(): MilkingRobot {
    if (this._robot === undefined) {
      throw new Error("no robots connected to this barn");
    } else {
      return this._robot;
    }
  }


  public get cowList(): Cow[] {
    return this._cowList;
  }


  public installMilkingRobot(robot: MilkingRobot) {
    this.robot = robot;
    this.robot.setBulkTank(this.tank);
  }


  public getCapacity(): string {
    return this.tank.getCapacity();
  }


  public takeCareOf(cow: Cow | undefined = undefined) { // default to all cows
    if (cow === undefined) { // milk all
      for (let i = 0; i < this.cowList.length; i++) {
        const COW: Cow = this.cowList[i];
        this.robot.milk(COW);
      }
    } else { // milk the specified
      if (this.cowList.includes(cow)) {
        this.robot.milk(cow);
      } else {
        console.error("the cow to milk is not included in the barn, cow is not milked")
      }
    }
  }


  public addCow(cow: Cow): void {
    if (!this.cowList.includes(cow)) {
      this.cowList.push(cow)
    } else {
      console.error("cow already in this barn")
    }
  }


  public hourPast() {
    for (let i = 0; i < this.cowList.length; i++) {
      this.cowList[i].hourPast();
    }
  }


  public getCowInformation(): string {
    let result: string = ""
    for (let i = 0; i < this.cowList.length; i++) {
      result += this.cowList[i].getCapacity();
      result += \n
    }
    return result;
  }
}


class Farm {
  private _owner: string = "";
  private _barn: Barn | undefined = undefined;


  constructor(owner: string, barn: Barn | undefined = undefined) {
    this.owner = owner;
    this.barn = barn;
  }


  private set owner(owner: string) {
    if (owner !== "") {
      this._owner = owner;
    } else {
      throw new Error("owner's name cannot be empty");
    }
  }


  public get owner(): string {
    return this._owner;
  }


  private set barn(barn: Barn | undefined) {
    this._barn = barn;
  }


  private get barn(): Barn {
    if (this._barn === undefined) {
      throw new Error("no barns exist on this farm");
    } else {
      return this._barn;
    }
  }


  public logistics(): string {
    return Farm owner: ${this.owner} \nBarn bulk tank: ${this.barn.getCapacity()} \nAnimals: \n${this.barn.getCowInformation()};
  }


  public manageCows() {
    this.barn.takeCareOf();
  }


  public addCow(cow: Cow) {
    this.barn.addCow(cow);
  }


  public hourPast() {
    this.barn.hourPast();
  }


  public installMilkingRobot(robot: MilkingRobot) {
    this.barn.installMilkingRobot(robot);
  }
}
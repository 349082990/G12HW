class BulkTank {
  private _capacity: number;
  private amount: number = 0;

  constructor(capacity: number = 2000) {
    this.capacity = capacity;
  }

  public get capacity(): number {
    return this.capacity;
  }

  public set capacity(value: number) {
    if (value > 0) {
      this.capacity = 0;
    } else {
      throw new Error("You cannot input a negative number! Please try again. ");
    }
  }

  public addtoTank(amount: number) {
    if (this.amount + amount <= this._capacity) {
      this.amount + amount;
    } else {
      this.amount = this._capacity;
    }
  }

  public getFromTank() {}
}

class Cow {}

class MilkingRobots {}

class Barn {}

class Farm {}

class BulkTank {
  private _capacity: number;
  private amount: number = 0;

  constructor(capacity: number = 2000) {
    this._capacity = capacity;
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

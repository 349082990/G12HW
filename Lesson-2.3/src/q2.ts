class BulkTank {
  private _capacity: number = 0;
  private _amount: number = 0;

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

  public addtoTank(addAmount: number): void {
    if (this._amount + addAmount <= this._capacity) {
      this._amount + addAmount;
    } else {
      this._amount = this._capacity;
    }
  }

  public getFromTank(getAmount: number): void {
    if (this._amount - getAmount <= this.capacity) {
      this._amount - getAmount;
    } else {
      this._amount = 0;
    }
  }
}

class Cow {}

class MilkingRobots {}

class Barn {}

class Farm {}

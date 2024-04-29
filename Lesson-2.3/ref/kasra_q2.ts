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
  private name: string;
  private udder: number = Math.floor(Math.random() * 26) + 15;
  private amount: number = 0;
  private milkable: boolean = true;
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
      this.name = name;
    } else {
      this.name = names[Math.floor(Math.random() * (names.length + 1))];
    }
  }

  public milk(): void {
    this.amount = 0;
  }

  public getCapacity(): string {
    return this.name + " " + this.amount + "/" + this.udder;
  }

  public hourPast(): void {
    const newMilk = Math.floor(Math.random() * 2.3) + 0.7;
    if (this.amount + newMilk <= this.udder) {
      this.amount += newMilk;
    } else {
      this.amount = this.udder;
    }
  }
}

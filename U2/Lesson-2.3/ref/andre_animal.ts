const promptSync = require("prompt-sync")({ sigint: true });

class Animal {
  protected _species: string;
  protected attackPower: number;
  protected defensePower: number;
  protected _health: number;
  protected _isDead: boolean = false;
  protected actualDamage: number = 0;
  constructor(
    species: string,
    attackPower: number,
    defensePower: number,
    health: number
  ) {
    this._species = species;
    this.attackPower = attackPower;
    this.defensePower = defensePower;
    this._health = health;
  }

  public attack(enemy: Animal) {
    const minDmg = this.attackPower / 10;
    const maxDmg = (this.attackPower * 100) / (100 + enemy.defensePower);
    this.actualDamage = Math.floor(Math.random() * (maxDmg - minDmg) + minDmg);

    enemy.defend(this.actualDamage);
  }

  public defend(damage: number) {
    this._health -= damage;
    if (this._health <= 0) {
      this._isDead = true;
    }
  }

  public get isDead(): boolean {
    return this._isDead;
  }

  public printResults() {
    console.log(
      `${this._species} - Attacked for: ${this.actualDamage}, Health: ${this._health}`
    );
  }

  public get species() {
    return this._species;
  }

  public get health() {
    return this._health;
  }

  public static dataFactory(type: string): Animal {
    switch (type) {
      case "Bull":
        return new Bull();
      case "Tiger":
        return new Tiger();
      case "Eagle":
        return new Eagle();
    }
  }
}

class Bull extends Animal {
  constructor() {
    super("Bull", 45, 145, 300);
  }
}

class Tiger extends Animal {
  constructor() {
    super("Tiger", 100, 70, 200);
  }
}

class Eagle extends Animal {
  constructor() {
    super("Eagle", 75, 110, 250);
  }
}

class Game {
  private animal: Animal[] = [];
  private validAnimals: string[] = ["Bull", "Tiger", "Eagle"];

  constructor() {
    this.startGame();
  }

  private startGame() {
    console.log(
      "Welcome to animal battle! You can choose two animals to fight each other. The options are Bull, Tiger, and Eagle"
    );

    while (!this.animal[0]) {
      console.log("What is the first animal?");
      const animal1 = promptSync("");

      if (this.validAnimals.includes(animal1) == true) {
        this.animal.push(Animal.dataFactory(animal1));
      } else {
        console.log("Please pick a valid option");
      }
    }

    while (!this.animal[1]) {
      console.log("What is the second animal?");
      const animal2 = promptSync("");

      if (this.validAnimals.includes(animal2) == true) {
        this.animal.push(Animal.dataFactory(animal2));
      } else {
        console.log("Please pick a valid option");
      }
    }

    this.battleGame();
  }

  private battleGame() {
    while (this.animal[0].health > 0 && this.animal[1].health > 0) {
      this.animal[0].attack(this.animal[1]);
      this.animal[0].printResults();

      this.animal[1].attack(this.animal[0]);
      this.animal[1].printResults();
      console.log("=======================\n");
    }

    this.declareWinner();
  }

  private declareWinner() {
    if (this.animal[0].health <= 0 && this.animal[1].health <= 0) {
      console.log("The battle was a tie!");
    } else if (this.animal[1].health <= 0) {
      console.log(`The winner is ${this.animal[0].species}!`);
    } else if (this.animal[0].health <= 0) {
      console.log(`The winner is ${this.animal[1].species}!`);
    }
  }
}

new Game();

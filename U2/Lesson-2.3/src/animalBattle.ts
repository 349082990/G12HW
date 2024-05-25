const promptSync = require("prompt-sync")({ sigint: true });

interface Characteristics {
  readonly species: string;
  readonly attackPower: number;
  readonly defensePower: number;
  health: number;
  isDead: boolean;
  trueDamage: number;
}

class Animal implements Characteristics {
  constructor(
    readonly species: string,
    readonly attackPower: number,
    readonly defensePower: number,
    public health: number,
    public isDead: boolean = false,
    public trueDamage: number = 0
  ) {}

  public attack(enemy: Animal) {
    const minDmg = this.attackPower / 10;
    const maxDmg = (this.attackPower * 100) / (100 + enemy.defensePower);
    this.trueDamage = Math.floor(Math.random() * (maxDmg - minDmg) + minDmg);

    enemy.defend(this.trueDamage);
    this.displayStats(this.trueDamage, enemy);
  }

  displayStats(trueDamage, enemy) {
    console.log(`${this.species} did ${trueDamage} damage to ${enemy.species}`);
    console.log(`${enemy.species} now has ${enemy.health} hp`);
  }

  public defend(damage: number) {
    this.health -= damage;
    if (this.health <= 0) {
      this.health = 0;
      this.isDead = true;
    }
  }
}

class animalFactory {
  public static make(type: string) {
    switch (type) {
      case "Bull":
        return new Animal(type, 45, 145, 300);
      case "Tiger":
        return new Animal(type, 100, 70, 200);
      case "Eagle":
        return new Animal(type, 75, 110, 250);
      default:
        throw new Error("That is not a valid animal!");
    }
  }
}

class Game {
  private static _instance: Game;
  private animal: Animal[] = [];
  private validAnimals: string[] = ["Bull", "Tiger", "Eagle"];

  constructor() {
    this.mainLoop();
  }

  public static get instance(): Game {
    if (Game._instance === undefined) {
      Game._instance = new Game();
    }

    return Game._instance;
  }

  public mainLoop() {
    console.log(
      "Welcome to animal battle! You can choose two animals to fight each other. The options are bull, tiger, and eagle. "
    );

    while (!this.animal[0]) {
      const animal1 = promptSync("What is the first animal? ");

      if (this.validAnimals.includes(animal1) === true) {
        this.animal.push(animalFactory.make(animal1));
      }
    }

    while (!this.animal[1]) {
      const animal2 = promptSync("What is the second animal? ");

      if (this.validAnimals.includes(animal2) === true) {
        this.animal.push(animalFactory.make(animal2));
      }
    }

    console.log("==============");

    this.mainGame();
  }
  mainGame() {
    while (this.animal[0].health > 0 && this.animal[1].health > 0) {
      this.animal[0].attack(this.animal[1]);
      this.animal[1].attack(this.animal[0]);
      console.log("==============");
    }
    this.checkWinner();
  }
  checkWinner() {
    if (this.animal[0].health <= 0 && this.animal[1].health <= 0) {
      console.log("tie");
    } else if (this.animal[1].health <= 0) {
      console.log("The winner is " + this.animal[0].species);
    } else {
      console.log("The winner is " + this.animal[1].species);
    }
  }
}

class Driver {
  private game: Game;
  constructor() {
    this.game = new Game();
  }
}

new Driver();

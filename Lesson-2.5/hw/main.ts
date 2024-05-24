import { Animal, AnimalFactory } from "./animal";

const promptSync = require("prompt-sync")({ sigint: true });

class Game {
  private static _instance: Game;
  private animal: Animal[] = [];
  readonly validAnimals: AnimalSpecies[] = [
    AnimalSpecies.AlbinoSkunk,
    AnimalSpecies.BaldEagle,
    AnimalSpecies.Bear,
    AnimalSpecies.Bull,
    AnimalSpecies.Eagle,
    AnimalSpecies.GiantTiger,
    AnimalSpecies.GrizzlyBear,
    AnimalSpecies.MegaBull,
    AnimalSpecies.Skunk,
    AnimalSpecies.Tiger,
    AnimalSpecies.CaseOh,
    AnimalSpecies.MrMa,
  ];

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
      `Welcome to animal battle! You can choose two animals to fight each other. The options are ${this.validAnimals} + 'exit' to exit. `
    );

    let running: boolean = true;

    while (!this.animal[0]) {
      let animal1 = promptSync("What is the first animal? ");

      if (animal1 === "exit") {
        running = false;
        break;
      }

      if (this.validAnimals.includes(animal1) === true) {
        this.animal.push(animalFactory.make(animal1));
      }
    }

    if (!running) return;

    while (!this.animal[1]) {
      console.log("What is the computer's animal? ");
      console.log(`"exit", "random" or ${this.validAnimals}`);
      let animal2 = promptSync();

      if (animal2 === "exit") {
        running = false;
        break;
      }

      if (animal2 === "random") {
        const RANDOM: number = Math.floor(
          Math.random() * (this.validAnimals.length - 1)
        );
        animal2 = this.validAnimals[RANDOM];
      }

      if (this.validAnimals.includes(animal2) === true) {
        this.animal.push(animalFactory.make(animal2));
      }
    }

    if (!running) return;

    console.log("==============");

    this.mainGame();
  }
  mainGame() {
    while (this.animal[0].health > 0 && this.animal[1].health > 0) {
      this.animal[0].attack(this.animal[1]);
      if (Math.random() < 0.1) {
        Potion.boost(this.animal[0]);
      }
      if (Math.random() < 0.01) {
        SelfDestruct.die(this.animal[0]);
        break;
      }
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

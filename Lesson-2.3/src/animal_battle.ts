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
}

class animalFactory {
    public static make(type:string) {
        type = promptSync("What is the first animal? ")
        switch(type) {
            case 
        }
    }
}

class Game {
  private static _instance: Game;

  constructor() {
    this.mainLoop;
  }

  public static get instance(): Game {
    if (Game._instance === undefined) {
      Game._instance = new Game();
    }

    return Game._instance;
  }

  public mainLoop() {
    promptSync("Welcome to animal battle! You can choose two animals to fight each other. The options are bull, tiger, and eagle. What is the first animal? ")
  }
}

class Driver {
  constructor() {
    Game.instance;
  }
}

new Driver();

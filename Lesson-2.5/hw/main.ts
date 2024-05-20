import { Animal } from "./animal";
import { Menu, CompositeMenu, MenuItem } from "./menu";
import { DisplayMenuAndInvokeItemCommand } from "./command";

class Game {
  private static _instance: Game;
  private animal: Animal[] = [];

  contructor() {
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
  }
}

class Driver {
  private game: Game;
  constructor() {
    this.game = new Game();
  }
}

new Driver();

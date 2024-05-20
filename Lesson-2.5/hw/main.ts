import { Animal } from "./animal";
import { Menu, CompositeMenu, MenuItem } from "./menu";
import { DisplayMenuAndInvokeItemCommand } from "./command";

class Game {
  private static _instance: Game;
  private mainMenu: CompositeMenu = new CompositeMenu("Main Menu");

  contructor() {
    this.mainLoop();
  }

  public static get instance(): Game {
    if (Game._instance === undefined) {
      Game._instance = new Game();
    }

    return Game._instance;
  }

  public initialize(): void {
    this.composeMainMenu();
    this.mainMenu.executeCommand;
  }

  private composeMainMenu(): void {
    this.mainMenu.addCommand(
      new DisplayMenuAndInvokeItemCommand(this.mainMenu)
    );
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

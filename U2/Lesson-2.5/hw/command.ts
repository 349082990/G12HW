import { Animal, animalFactory } from "./animal";
import { CompositeMenu, Menu, MenuItem } from "./menu";
import { Game } from "./main";

const promptSync = require("prompt-sync")({ sigint: true });

interface Command {
  execute(): void;
}

class DisplayMenuAndInvokeItemCommand implements Command {
  constructor(protected menu: CompositeMenu) {}

  protected choose(): Menu {
    let i: number = -1;
    while (i <= 0 || i > this.menu.items.length || isNaN(i)) {
      i = Number(promptSync("Which option would you like to pick? "));
      if (i <= 0 || i > this.menu.items.length || isNaN(i)) {
        console.log("That is not a valid option. ");
      }
    }
    return this.menu.items[i - 1];
  }

  public execute(): void {
    console.log(this.menu.description + "\n");
    this.menu.displayItems();
    this.choose().executeCommand();
  }
}

class ExitGameCommand implements Command {
  constructor() {}
  public execute(): void {
    console.log("Exited Game ");
    return;
  }
}

class DisplayMenuAfterAnimalSelectionCommand implements Command {
  constructor(protected);
}
export { Command, DisplayMenuAndInvokeItemCommand };

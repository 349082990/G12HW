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
    console.log("");
    const i = Number(promptSync("Which option would you like to pick? "));

    if (i <= this.CompositeMenu.length) console.log("==============");
  }

  public execute(): void {
    console.log(this.menu.description + "\n");
    this.menu.displayItems();
    this.choose().executeCommand();
  }
}

export { Command, DisplayMenuAndInvokeItemCommand };

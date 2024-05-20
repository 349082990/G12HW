import { Animal, animalFactory } from "./animal";
import { CompositeMenu, Menu } from "./menu";

const promptSync = require("prompt-sync")({ sigint: true });

interface Command {
  execute(): void;
}

class DisplayMenuAndInvokeItemCommand implements Command {
  validAnimals: string[] = ["Bull", "Tiger", "Eagle"];
  animal: Animal[] = [];
  constructor(protected menu: CompositeMenu) {}

  protected choose(): Menu {
    console.log("");
    const i = Number(promptSync("Which option would you like to pick? "));

    if (i <= this.CompositeMenu.length)
      // while (!this.animal[0]) {
      //   const animal1 = String(promptSync("What is the first animal? "));

      //   if (this.validAnimals.includes(animal1) === true) {
      //     this.animal.push(animalFactory.make(animal1));
      //   }
      // }

      // while (!this.animal[1]) {
      //   const animal2 = promptSync("What is the second animal? ");

      //   if (this.validAnimals.includes(animal2) === true) {
      //     this.animal.push(animalFactory.make(animal2));
      //   }
      // }

      console.log("==============");
  }

  public execute(): void {
    console.log(this.menu.description + "\n");
    this.menu.displayItems();
    this.choose().executeCommand();
  }
}

export { Command, DisplayMenuAndInvokeItemCommand };

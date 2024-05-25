//Command design pattern
//Invoker will call the command
//Reciever is what the command act upon

import { Cart } from "./cart";
import { CompositeMenu, Menu } from "./menu";
import { Pizza } from "./pizza";

const promptSync = require("prompt-sync")({ sigint: true });

interface Command {
  execute(): void;
}

class DisplayMenuAndInvokeItemCommand implements Command {
  constructor(protected menu: CompositeMenu) {}

  protected choose(): Menu {
    console.log("");
    const i = Number(promptSync("Which option would you like to pick? "));
    //validation // error
    console.log("");

    return this.menu.items[i - 1];
  }

  public execute(): void {
    console.log(this.menu.description + "\n");
    this.menu.displayItems();
    this.choose().executeCommand();
  }
}

class AddToCartCommand implements Command {
  constructor(
    private pizza: Pizza,
    private cart: Cart,
    private menu: CompositeMenu
  ) {}
  public execute(): void {
    this.cart.addToCart(this.pizza);
    new DisplayMenuAndInvokeItemCommand(this.menu).execute();
  }
}

export { AddToCartCommand, Command, DisplayMenuAndInvokeItemCommand };

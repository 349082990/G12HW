import { Cart } from "./cart";
import { Command } from "./command";

//Composite Design Pattern
interface Menu {
  description: string;
  addCommand(c: Command): Menu;
  executeCommand(): void;
}

interface DisplayMenu {
  displayItems(): void;
}

class CompositeMenu implements Menu, DisplayMenu {
  protected _items: Menu[] = [];
  protected command: Command | undefined;
  constructor(public _description: string) {}

  public get description(): string {
    return this._description;
  }

  public get items(): Menu[] {
    return this._items;
  }

  public displayItems(): void {
    for (let i = 0; i < this._items.length; i++) {
      console.log(`${i + 1}. ${this._items[i].description}`);
    }
  }

  //Builder design pattern
  public addMenuItem(m: Menu): CompositeMenu {
    //Validation
    this._items.push(m);
    return this;
  }

  public addCommand(c: Command): CompositeMenu {
    //validation
    this.command = c;
    return this;
  }

  public executeCommand(): void {
    if (!this.command) throw new Error(`${this} is missing a command!`);
    this.command.execute();
  }
}

class CheckoutMenu extends CompositeMenu {
  constructor(private cart: Cart) {
    super("");
  }

  public get description(): string {
    return this.cart.displayInvoice();
  }
}

class MenuItem implements Menu {
  private command: Command | undefined;
  constructor(readonly description: string) {}

  public addCommand(c: Command): MenuItem {
    //validation
    this.command = c;
    return this;
  }

  public executeCommand(): void {
    if (!this.command) throw new Error(`${this} is missing a command!`);
    this.command.execute();
  }
}

export { CheckoutMenu, CompositeMenu, Menu, MenuItem };

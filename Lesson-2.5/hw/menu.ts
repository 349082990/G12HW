import { Command } from "./command";

// Composite Design Pattern
interface Menu {
  species: string;
  addCommand(c: Command): Menu;
  executeCommand(): void;
}

interface DisplayMenu {
    displayItems(): void;
}

class compositeMenu implements Menu, DisplayMenu {
    protected _items: Menu[] = [];
    protected command: Command | undefined;
    constructor(public _species: string) {}

    public get species():  string {
        return this._species;
    }

    public get items(): Menu[] {
        return this._items;
    }

    public displayItems(): void 
    }
}

interface DisplayMenu {}

class CompositeMenu implements Menu, DisplayMenu {}

class MenuItem implements Menu {}

export { Menu, CompositeMenu, MenuItem };

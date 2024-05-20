import { CompositeMenu, Menu } from "./menu";

const promptSync = require("prompt-sync")({ sigint: true });

interface Command {
  execute(): void;
}

class DisplayMenuAndInvokeItemCommand implements Command {
  constructor(protected menu: CompositeMenu) {}

  protected choose(): Menu {
    console.log("");
    const i = 
  }
}

export {Command, DisplayMenuAndInvokeItemCommand};

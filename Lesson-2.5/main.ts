// declare var require: any;
// const promptSync = require("prompt-sync")({ sigint: true });

// // GAME CLASS -----------------------------
// class Game {
//   private static _instance: Game;
//   private mainMenu: CompositeMenu = new CompositeMenu("Main Menu");

//   contructor() {
//     this.mainLoop();
//   }

//   public static get instance(): Game {
//     if (Game._instance === undefined) {
//       Game._instance = new Game();
//     }

//     return Game._instance;
//   //

//   public initialize(): void {
//     this.composeMainMenu();
//     this.mainMenu.executeCommand;
//   }

//   private composeMainMenu(): void {
//     this.mainMenu.addCommand(
//       new DisplayMenuAndInvokeItemCommand(this.mainMenu)
//     );
//     this.mainMenu.addMenuItem(this.composeChoosingAnimalsMenu());
//     // idk how to exit fix later
//   }

//   private composeChoosingAnimalsMenu(): CompositeMenu {
//     const menu = new CompositeMenu("Choose your animal");
//     menu.addCommand(new DisplayMenuAndInvokeItemCommand(menu));
//     // your object is all your animals
//     const values = Object.values(Animals);
//     for (let value of values) {
//       const species = animalFactory.make(value);
//       const m = new MenuItem(`${species.description}`).addCommand;
//     }
//     return menu;
//   }

//   public mainLoop() {
//     console.log(
//       "Welcome to animal battle! You can choose two animals to fight each other. The options are bull, tiger, and eagle. "
//     );
//   }
// }

// class Driver {
//   private game: Game;
//   constructor() {
//     this.game = new Game();
//   }
// }

// new Driver();
// // ------------------------------------------------------------------------------------------
// // MENU
// // Composite Design Pattern
// interface Menu {
//   description: string;
//   addCommand(c: Command): Menu;
//   executeCommand(): void;
// }

// interface DisplayMenu {
//   displayItems(): void;
// }

// class CompositeMenu implements Menu, DisplayMenu {
//   protected _items: Menu[] = [];
//   protected command: Command | undefined;
//   constructor(public _description: string) {}

//   public get description(): string {
//     return this._description;
//   }

//   public get items(): Menu[] {
//     return this._items;
//   }

//   public displayItems(): void {
//     for (let i = 0; i < this._items.length; i++) {
//       console.log(`${i + 1}. ${this._items[i].description}`);
//     }
//   }

//   //Builder design patter
//   public addMenuItem(m: Menu): CompositeMenu {
//     // put validator here
//     this._items.push(m);
//     return this;
//   }

//   public addCommand(c: Command): CompositeMenu {
//     // add validation ehre
//     this.command = c;
//     return this;
//   }

//   public executeCommand(): void {
//     if (!this.command) throw new Error(`${this} is missing a command!`);
//     this.command.execute();
//   }
// }

// class MenuItem implements Menu {
//   private command: Command | undefined;
//   constructor(readonly description: string) {}

//   public addCommand(c: Command): MenuItem {
//     // add validation ehre
//     this.command = c;
//     return this;
//   }

//   public executeCommand(): void {
//     if (!this.command) throw new Error(`${this} is missing a command!`);
//     this.command.execute();
//   }
// }
// // ---------------------------------------------------------------------------------------
// // COMMAND
// interface Command {
//   execute(): void;
// }

// class DisplayMenuAndInvokeItemCommand implements Command {
//   validAnimals: string[] = ["Bull", "Tiger", "Eagle"];
//   animal: Animal[] = [];
//   constructor(protected menu: CompositeMenu) {}

//   protected choose(): Menu {
//     console.log("");
//     const i = Number(promptSync("Which option would you like to pick? "));

//     if (i <= this.menu.items.length) {
//       console.log("");
//       return this.menu.items[i - 1];
//     }

//     // while (!this.animal[0]) {
//     //   const animal1 = String(promptSync("What is the first animal? "));

//     //   if (this.validAnimals.includes(animal1) === true) {
//     //     this.animal.push(animalFactory.make(animal1));
//     //   }
//     // }

//     // while (!this.animal[1]) {
//     //   const animal2 = promptSync("What is the second animal? ");

//     //   if (this.validAnimals.includes(animal2) === true) {
//     //     this.animal.push(animalFactory.make(animal2));
//     //   }
//     // }

//     console.log("==============");
//   }

//   public execute(): void {
//     console.log(this.menu.description + "\n");
//     this.menu.displayItems();
//     this.choose().executeCommand();
//   }
// }

// // class ExitGame implements Command {
// //   public execute(): void {
// //     console.log("");
// //   }
// // }

// // -------------------------------------------------------------------------------------------
// // ANIMAL
// interface Characeristics {
//   readonly species: string;
//   readonly attackPower: number;
//   readonly defensePower: number;
//   health: number;
//   isDead: boolean;
//   trueDamage: number;
// }

// class Animal implements Characeristics {
//   constructor(
//     readonly species: string,
//     readonly attackPower: number,
//     readonly defensePower: number,
//     public health: number,
//     public isDead: boolean = false,
//     public trueDamage: number = 0
//   ) {}

//   public attack(enemy: Animal) {
//     const minDmg = this.attackPower / 10;
//     const maxDmg = (this.attackPower * 100) / (100 + enemy.defensePower);
//     this.trueDamage = Math.floor(Math.random() * (maxDmg - minDmg) + minDmg);

//     enemy.defend(this.trueDamage);
//     this.displayStats(this.trueDamage, enemy);
//   }

//   displayStats(trueDamage, enemy) {
//     console.log(`${this.species} did ${trueDamage} damage to ${enemy.species}`);
//     console.log(`${enemy.species} now has ${enemy.health} hp`);
//   }

//   public defend(damage: number) {
//     this.health -= damage;
//     if (this.health <= 0) {
//       this.health = 0;
//       this.isDead = true;
//     }
//   }
// }

// enum Animals {
//   BULL = "Bull",
//   TIGER = "Tiger",
//   EAGLE = "Eagle",
// }

// class animalFactory {
//   public static make(type: string) {
//     switch (type) {
//       case Animals.BULL:
//         return new Animal(type, 45, 145, 300);
//       case Animals.TIGER:
//         return new Animal(type, 100, 70, 200);
//       case Animals.EAGLE:
//         return new Animal(type, 75, 110, 250);
//       default:
//         throw new Error("That is not a valid animal!");
//     }
//   }
// }

const promptSync = require("prompt-sync")({ sigint: true });

// Animal class definition
class Animal {
  constructor(
    public species: string,
    public attackPower: number,
    public defensePower: number,
    public health: number,
    public dodgedNextAttack: boolean = false
  ) {}

  public attack(target: Animal) {
    if (target.dodgedNextAttack) {
      console.log(`${target.species} dodged the attack!`);
      target.dodgedNextAttack = false;
      return;
    }

    const minDamage = this.attackPower / 10;
    const maxDamage = (this.attackPower * 100) / (100 + target.defensePower);
    const damage = Math.floor(
      Math.random() * (maxDamage - minDamage) + minDamage
    );

    target.defend(damage);
    this.displayAttackStats(target, damage);
  }

  displayAttackStats(target: Animal, damage: number) {
    console.log(`${this.species} damaged ${damage} for ${target.species}`);
    console.log(`${target.species} now has ${target.health} hp`);
  }

  public defend(damage: number) {
    this.health -= damage;
    if (this.health <= 0) {
      this.health = 0;
    }
  }

  public isAlive(): boolean {
    return this.health > 0;
  }

  public specialAttack(target: Animal) {
    // Default special attack does nothing
  }

  public shouldUseSpecial(): boolean {
    return Math.random() < 0.1;
  }
}

// Builder class for Animals
class AnimalBuilder {
  private species!: string;
  private attackPower!: number;
  private defensePower!: number;
  private health!: number;

  setSpecies(species: string) {
    this.species = species;
    return this;
  }

  setAttackPower(attackPower: number) {
    this.attackPower = attackPower;
    return this;
  }

  setDefensePower(defensePower: number) {
    this.defensePower = defensePower;
    return this;
  }

  setHealth(health: number) {
    this.health = health;
    return this;
  }

  build(): Animal {
    return new Animal(
      this.species,
      this.attackPower,
      this.defensePower,
      this.health
    );
  }
}

// Specific Animal classes
class Bull extends Animal {
  constructor() {
    super("Bull", 45, 145, 300);
  }

  public specialAttack(target: Animal) {
    console.log(`${this.species} uses Moo!`);
    target.defensePower -= 15;
  }
}

class MegaBull extends Bull {
  constructor() {
    super();
    this.species = "Mega Bull";
    this.defensePower += 20;
    this.health += 150;
  }

  public specialAttack(target: Animal) {
    console.log(`${this.species} uses Mega Moo!`);
    target.defensePower -= 25;
  }
}

class Tiger extends Animal {
  constructor() {
    super("Tiger", 100, 70, 200);
  }

  public specialAttack(target: Animal) {
    console.log(`${this.species} uses Roar!`);
    this.attackPower += 15;
  }
}

class GiantTiger extends Tiger {
  constructor() {
    super();
    this.species = "Giant Tiger";
    this.attackPower += 15;
    this.health += 50;
  }

  public specialAttack(target: Animal) {
    console.log(`${this.species} uses Giant Roar!`);
    this.attackPower += 25;
  }
}

class Eagle extends Animal {
  constructor() {
    super("Eagle", 75, 110, 250);
  }

  public specialAttack(target: Animal) {
    console.log(`${this.species} uses Dive!`);
    this.dodgedNextAttack = true;
  }
}

class BaldEagle extends Eagle {
  constructor() {
    super();
    this.species = "Bald Eagle";
    this.attackPower += 10;
    this.defensePower += 10;
    this.health += 100;
  }

  public specialAttack(target: Animal) {
    console.log(`${this.species} uses Aerial Assault!`);
    this.dodgedNextAttack = true;
    target.defend(this.attackPower + 15);
  }
}

class Bear extends Animal {
  constructor() {
    super("Bear", 100, 100, 300);
  }

  public attack(target: Animal) {
    const minDamage = 10;
    const maxDamage = this.attackPower * 2;
    const damage = Math.floor(
      Math.random() * (maxDamage - minDamage) + minDamage
    );
    target.defend(damage > 35 ? 35 : damage);
    this.displayAttackStats(target, damage);
  }

  public specialAttack() {
    console.log(`${this.species} uses Sleep!`);
    this.health += 35;
  }
}

class GrizzlyBear extends Bear {
  constructor() {
    super();
    this.species = "Grizzly Bear";
    this.attackPower = 150;
    this.defensePower = 150;
    this.health = 400;
  }

  public attack(target: Animal) {
    const minDamage = 15;
    const maxDamage = this.attackPower * 2;
    const damage = Math.floor(
      Math.random() * (maxDamage - minDamage) + minDamage
    );
    target.defend(damage > 30 ? 30 : damage);
    this.displayAttackStats(target, damage);
  }

  public specialAttack() {
    console.log(`${this.species} uses Sleep!`);
    this.health += 50;
  }
}

class Skunk extends Animal {
  constructor() {
    super("Skunk", 70, 70, 120);
  }

  public specialAttack(target: Animal) {
    console.log(`${this.species} uses Stink!`);
    target.defend(target.health * 0.05);
  }
}

class AlbinoSkunk extends Skunk {
  constructor() {
    super();
    this.species = "Albino Skunk";
    this.attackPower += 20;
    this.defensePower += 20;
    this.health += 50;
  }

  public specialAttack(target: Animal) {
    console.log(`${this.species} uses Albino Stink!`);
    target.defend(target.health * 0.1);
  }
}

class Fish extends Animal {
  constructor() {
    super("Fish", 120, 200, 200);
  }
}

class Rock extends Animal {
  constructor() {
    super("Rock", 200, 200, 500);
  }
}

class Dragon extends Animal {
  constructor() {
    super("Dragon", 200, 150, 500);
  }

  public specialAttack(target: Animal) {
    console.log(`${this.species} uses Fire Breath!`);
    target.defend(target.health * 0.1);
  }
}

class Phoenix extends Animal {
  constructor() {
    super("Phoenix", 180, 120, 450);
  }

  public specialAttack() {
    console.log(`${this.species} uses Rebirth!`);
    this.health += 100;
  }
}

// Command pattern for attacks
interface Command {
  execute(): void;
}

class AttackCommand implements Command {
  private attacker: Animal;
  private defender: Animal;

  constructor(attacker: Animal, defender: Animal) {
    this.attacker = attacker;
    this.defender = defender;
  }

  execute() {
    if (this.attacker.shouldUseSpecial()) {
      console.log(`${this.attacker.species} performs a special attack!`);
      this.attacker.specialAttack(this.defender);
    } else {
      this.attacker.attack(this.defender);
    }
  }
}

// Composite pattern for menu
class MenuComponent {
  add(component: MenuComponent) {
    throw new Error("Unsupported operation");
  }

  remove(component: MenuComponent) {
    throw new Error("Unsupported operation");
  }

  display() {
    throw new Error("Unsupported operation");
  }
}

class MenuItem extends MenuComponent {
  constructor(private name: string) {
    super();
  }

  display() {
    console.log(this.name);
  }
}

class Menu extends MenuComponent {
  private components: MenuComponent[] = [];

  add(component: MenuComponent) {
    this.components.push(component);
  }

  remove(component: MenuComponent) {
    this.components = this.components.filter((c) => c !== component);
  }

  display() {
    for (const component of this.components) {
      component.display();
    }
  }
}

class Battle {
  private animals: Animal[] = [];
  private validAnimalTypes: { [key: string]: any } = {
    Bull,
    MegaBull,
    Tiger,
    GiantTiger,
    Eagle,
    BaldEagle,
    Bear,
    GrizzlyBear,
    Skunk,
    AlbinoSkunk,
    Fish,
    Rock,
    Dragon,
    Phoenix,
  };

  constructor() {
    this.startBattle();
  }

  private startBattle() {
    console.log(
      "Welcome to animal battle! You can choose an Animal to fight the Computer"
    );

    this.animals.push(this.chooseAnimal("Choose your animal: "));

    const opponentChoice = this.chooseOpponentType();
    if (opponentChoice === "random") {
      this.animals.push(this.randomlyChooseAnimal());
    } else {
      this.animals.push(this.chooseAnimal("Choose the computer's animal: "));
    }

    console.log("*************************");

    this.commenceBattle();
  }

  private chooseAnimal(order: string): Animal {
    while (true) {
      const animalType = promptSync(`Enter the ${order}  `);
      if (animalType in this.validAnimalTypes) {
        return new this.validAnimalTypes[animalType]();
      } else {
        console.log(
          "Invalid animal type. Choose from: " +
            Object.keys(this.validAnimalTypes).join(", ")
        );
      }
    }
  }

  private randomlyChooseAnimal(): Animal {
    const animalTypes = Object.keys(this.validAnimalTypes);
    const randomType =
      animalTypes[Math.floor(Math.random() * animalTypes.length)];
    return new this.validAnimalTypes[randomType]();
  }

  private chooseOpponentType(): string {
    while (true) {
      console.log(
        "Do you want to choose the computer's animal or have it randomly selected?"
      );
      const choice = promptSync();
      if (choice === "choose" || choice === "random") {
        return choice;
      } else {
        console.log("Invalid choice. Type 'choose' or 'random'.");
      }
    }
  }

  private commenceBattle() {
    const [firstAnimal, secondAnimal] = this.animals;

    while (firstAnimal.isAlive() && secondAnimal.isAlive()) {
      this.performTurn(firstAnimal, secondAnimal);
      if (!secondAnimal.isAlive()) break;
      this.performTurn(secondAnimal, firstAnimal);
      if (!firstAnimal.isAlive()) break;
      console.log("*************************");
    }

    this.declareWinner();
  }

  private performTurn(attacker: Animal, defender: Animal) {
    const attackCommand = new AttackCommand(attacker, defender);
    attackCommand.execute();
  }

  private declareWinner() {
    const [firstAnimal, secondAnimal] = this.animals;

    if (!firstAnimal.isAlive() && !secondAnimal.isAlive()) {
      console.log("Tie");
    } else if (!secondAnimal.isAlive()) {
      console.log(`Winner: ${firstAnimal.species}`);
    } else {
      console.log(`Winner: ${secondAnimal.species}`);
    }

    this.playAgain();
  }

  private playAgain() {
    const choice = promptSync("Do you want to play again? (yes/no): ");
    if (choice.toLowerCase() === "yes") {
      new Battle();
    } else {
      console.log("Thanks for playing!");
    }
  }

  public static start() {
    new Battle();
  }
}

Battle.start();

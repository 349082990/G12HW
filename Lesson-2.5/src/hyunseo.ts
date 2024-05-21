const promptSync = require("prompt-sync")({ sigint: true });

class RNG {
  constructor() {}

  public static randomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  public static zeroToOne() {
    return Math.random();
  }
}

interface Properties {
  species: string;
  health: number;
  defensePower: number;
  isDead: boolean;
  attack(enemy: Properties): void;
  defend(damage: number): number;
}

abstract class Animal implements Properties {
  protected attackPower: number;
  protected actualDamage: number = 0;
  readonly specialChance: number = 0.1;
  protected _isDead: boolean = false;
  public maxHealth: number = 0;

  constructor(
    protected _species: string,
    attackPower: number,
    protected _defensePower: number,
    protected _health: number
  ) {
    this.attackPower = attackPower;
  }

  public get species(): string {
    return this._species;
  }

  public get health(): number {
    return this._health;
  }

  public set health(hp: number) {
    if (hp < 0) {
      throw new Error("Not a valid health");
    }
    this._health = hp;
  }

  public get defensePower(): number {
    return this._defensePower;
  }

  public set defensePower(value: number) {
    if (value <= 0) {
      this._defensePower = 0;
    }
    this._defensePower = value;
  }

  public get isDead(): boolean {
    return this._isDead;
  }

  protected abstract specialAttack(enemy: Properties): void;

  public minDmg(): number {
    return this.attackPower / 10;
  }

  public maxDmg(enemy: Properties): number {
    return (this.attackPower * 100) / (100 + enemy.defensePower);
  }

  public actualDmg(maxDmg: number, minDmg: number, enemy: Properties): number {
    const DMG = RNG.randomInt(minDmg, maxDmg);
    return enemy.defend(DMG);
  }

  public attack(enemy: Properties): void {
    if (RNG.zeroToOne() < this.specialChance) {
      console.log(`${this.species} uses a special attack!`);
      this.actualDamage = 0;
      this.specialAttack(enemy);
    } else {
      this.normalAttack(enemy);
    }
    this.printResults();
  }

  public normalAttack(enemy: Properties): void {
    const minDmg = this.minDmg();
    const maxDmg = this.maxDmg(enemy);
    this.actualDamage = this.actualDmg(maxDmg, minDmg, enemy);
  }

  public defend(damage: number): number {
    this._health -= damage;
    if (this._health <= 0) {
      this._isDead = true;
      this._health = 0;
    }
    return damage;
  }

  public printResults(): void {
    console.log(`${this.species} - Attacked for: ${this.actualDamage}`);
  }

  public printHP(): void {
    console.log(`${this.species} has ${this.health} HP`);
  }
}

enum AnimalSpecies {
  Bull = "Bull",
  Tiger = "Tiger",
  Eagle = "Eagle",
  Bear = "Bear",
  GrizzlyBear = "Grizzly Bear",
  Skunk = "Skunk",
  AlbinoSkunk = "Albino Skunk",
  MegaBull = "Mega Bull",
  GiantTiger = "Giant Tiger",
  BaldEagle = "Bald Eagle",
  Gragas = "Gragas",
  Human = "Human",
}

class AnimalFactory {
  static createAnimal(type: string): Animal {
    switch (type) {
      case AnimalSpecies.Bull:
        return new Bull();
      case AnimalSpecies.Tiger:
        return new Tiger();
      case AnimalSpecies.Eagle:
        return new Eagle();
      case AnimalSpecies.Bear:
        return new Bear();
      case AnimalSpecies.GrizzlyBear:
        return new GrizzlyBear();
      case AnimalSpecies.Skunk:
        return new Skunk();
      case AnimalSpecies.AlbinoSkunk:
        return new AlbinoSkunk();
      case AnimalSpecies.MegaBull:
        return new MegaBull();
      case AnimalSpecies.GiantTiger:
        return new GiantTiger();
      case AnimalSpecies.BaldEagle:
        return new BaldEagle();
      case AnimalSpecies.Gragas:
        return new Gragas();
      case AnimalSpecies.Human:
        return new Human();
      default:
        throw new Error("Unknown animal type");
    }
  }
}

class Bear extends Animal {
  constructor() {
    super(AnimalSpecies.Bear, 100, 100, 300);
  }

  protected specialAttack(): void {
    this._health += 35;
    if (this._health > this.maxHealth) {
      this._health = this.maxHealth;
    }
    console.log(`${this._species} uses Sleep and recovers 35 HP!`);
  }

  public minDmg(): number {
    return 10;
  }

  public maxDmg(enemy: Animal): number {
    return (2 * this.attackPower * 100) / (100 + enemy.defensePower);
  }
}

class GrizzlyBear extends Bear {
  constructor() {
    super();
    this._species = AnimalSpecies.GrizzlyBear;
    this.attackPower += 50;
    this._defensePower += 50;
    this._health += 100;
    this.maxHealth = this._health;
  }

  protected specialAttack(): void {
    this._health += 50;
    if (this._health > this.maxHealth) {
      this._health = this.maxHealth;
    }
    console.log(`${this._species} uses Sleep and recovers 50 HP!`);
  }

  public maxDmg(enemy: Animal): number {
    return (this.attackPower * 100) / (100 + enemy.defensePower);
  }

  public minDmg(): number {
    return 15;
  }

  public defend(damage: number): number {
    if (damage > 30) {
      damage = 30;
    }
    this._health -= damage;
    if (this._health <= 0) {
      this._isDead = true;
    }
    return damage;
  }
}

class Bull extends Animal {
  constructor() {
    super(AnimalSpecies.Bull, 45, 145, 300);
  }

  public maxDmg(enemy: Animal): number {
    return (this.attackPower * 100) / (100 + enemy.defensePower);
  }

  protected specialAttack(enemy: Animal): void {
    enemy.defensePower -= 15;
    console.log(
      `${this._species} uses Moo and reduces ${enemy.species}'s defense by 15! - current enemy def ${enemy.defensePower}`
    );
  }
}

class MegaBull extends Bull {
  constructor() {
    super();
    this._species = AnimalSpecies.MegaBull;
    this._defensePower += 20;
    this._health += 150;
    this.maxHealth = this._health;
  }

  public maxDmg(enemy: Animal): number {
    enemy.defensePower -= 25;
    if (enemy.defensePower < 0) {
      enemy.defensePower = 0;
    }
    return (this.attackPower * 100) / (100 + enemy.defensePower);
  }

  protected specialAttack(enemy: Animal): void {
    console.log(
      `${this._species} uses Mega Moo and reduces ${enemy.species}'s defense by 25!
            - current enemy def ${enemy.defensePower}`
    );
  }
}

class Eagle extends Animal {
  public dodge: boolean = false;

  constructor() {
    super(AnimalSpecies.Eagle, 75, 110, 250);
  }

  public normalAttack(enemy: Animal): void {
    if (this.dodge) {
      this.dodge = false;
    }
    const minDmg = this.minDmg();
    const maxDmg = this.maxDmg(enemy);
    this.actualDamage = this.actualDmg(maxDmg, minDmg, enemy);
  }

  protected specialAttack(enemy: Animal): void {
    if (this.dodge) {
      this.normalAttack(enemy);
      return;
    }
    console.log(`${this._species} uses Dive to dodge the next attack!`);
    this.dodge = true;
  }

  public defend(damage: number): number {
    if (this.dodge) {
      damage = 0;
      console.log(`${this._species} dodged attack`);
    }
    this._health -= damage;
    if (this._health <= 0) {
      this._isDead = true;
    }
    return damage;
  }
}

class BaldEagle extends Eagle {
  public dodge: boolean = false;

  constructor() {
    super();
    this._species = AnimalSpecies.BaldEagle;
    this.attackPower += 10;
    this._defensePower += 10;
    this._health += 100;
    this.maxHealth = this._health;
  }

  public normalAttack(enemy: Animal): void {
    let extraDmg: number = 0;
    if (this.dodge) {
      this.dodge = false;
      extraDmg = 15;
    }
    const minDmg = extraDmg + this.minDmg();
    const maxDmg = extraDmg + this.maxDmg(enemy);
    this.actualDamage = this.actualDmg(maxDmg, minDmg, enemy);
  }

  protected specialAttack(enemy: Animal): void {
    if (this.dodge) {
      this.normalAttack(enemy);
      return;
    }
    console.log(
      `${this._species} uses aerial assault to dodge the next attack!`
    );
    this.dodge = true;
  }

  public defend(damage: number): number {
    if (this.dodge) {
      damage = 0;
      console.log(`${this._species} dodged attack`);
    }
    this._health -= damage;
    if (this._health <= 0) {
      this._isDead = true;
    }
    return damage;
  }
}

class Skunk extends Animal {
  constructor() {
    super(AnimalSpecies.Skunk, 70, 70, 120);
  }

  protected specialAttack(enemy: Animal): void {
    this.actualDamage = enemy.maxHealth * 0.05;
    enemy.defend(this.actualDamage);
    console.log(
      `${this._species} uses Stink Attack and
            deals ${this.actualDamage} damage to ${enemy.species}!`
    );
  }
}

class AlbinoSkunk extends Skunk {
  constructor() {
    super();
    this._species = AnimalSpecies.AlbinoSkunk;
    this.attackPower += 20;
    this._defensePower += 20;
    this._health += 50;
    this.maxHealth = this._health;
  }

  protected specialAttack(enemy: Animal): void {
    this.actualDamage = enemy.maxHealth * 0.1;
    enemy.defend(this.actualDamage);
    console.log(
      `${this._species} uses Stink Attack and
            deals ${this.actualDamage} damage to ${enemy.species}!`
    );
  }
}

class Tiger extends Animal {
  constructor() {
    super(AnimalSpecies.Tiger, 100, 70, 200);
  }

  protected specialAttack(): void {
    this.attackPower += 15;
    console.log(
      `${this._species} uses Roar and increases its attack by 15!
            - current Attack ${this.attackPower}`
    );
  }
}

class GiantTiger extends Tiger {
  constructor() {
    super();
    this._species = AnimalSpecies.GiantTiger;
    this.attackPower += 15;
    this._health += 50;
    this.maxHealth = this._health;
  }
  protected specialAttack(): void {
    this.attackPower += 25;
    console.log(
      `${this._species} uses Roar and increases its attack by 25!
            - current Attack ${this.attackPower}`
    );
  }
}

class Gragas extends Animal {
  constructor() {
    super(AnimalSpecies.Gragas, 999, 1, 500);
  }
  protected specialAttack(enemy: Animal): void {
    const HP_TRANSFER: number = RNG.randomInt(0, 10);
    const HP_DIFF: number = enemy.maxHealth - enemy.health;
    if (HP_DIFF > HP_TRANSFER) {
      enemy.defend(-HP_TRANSFER);
    } else {
      enemy.defend(-HP_DIFF);
    }
    this.defend(HP_TRANSFER);
    console.log(
      `${this._species} uses Body Slam \n${enemy.species} liked it!! `
    );
    console.log(
      `${HP_TRANSFER} hp transferred from
            ${this._species} to ${enemy.species}`
    );
  }
}

class Human extends Animal {
  constructor() {
    super(AnimalSpecies.Human, 30, 50, 300);
  }

  protected specialAttack(enemy: Animal): void {
    if (RNG.zeroToOne() < 0.5) {
      this.actualDamage = enemy.health;
      Gun.shoot(enemy);
    } else {
      console.log(`${this._species} missed the gun shot!`);
    }
  }
}

class NaturalDisaster {
  public static triggerDisaster(animals: Animal[]): void {
    for (let i = 0; i < animals.length; i++) {
      animals[i].health = 0;
      console.log(
        `${animals[i].species} is affected by a natural disaster and now has 0 HP!`
      );
    }
  }
}

class Gun {
  public static shoot(enemy: Animal): void {
    enemy.health = 0;
    console.log(`${enemy.species} got shot!, now has 0 HP!`);
  }
}

class Game {
  private animals: Animal[] = [];
  readonly CHOICES: AnimalSpecies[] = [
    AnimalSpecies.AlbinoSkunk,
    AnimalSpecies.BaldEagle,
    AnimalSpecies.Bear,
    AnimalSpecies.Bull,
    AnimalSpecies.Eagle,
    AnimalSpecies.GiantTiger,
    AnimalSpecies.GrizzlyBear,
    AnimalSpecies.MegaBull,
    AnimalSpecies.Skunk,
    AnimalSpecies.Tiger,
    AnimalSpecies.Gragas,
    AnimalSpecies.Human,
  ];

  constructor() {
    this.startGame();
  }

  private startGame(): void {
    const PLAYER_CHOICE = this.getPlayerChoice();
    if (PLAYER_CHOICE === 0) return;
    this.animals.push(AnimalFactory.createAnimal(PLAYER_CHOICE));
    console.log(`Player chose: ${PLAYER_CHOICE}!`);

    const COMPUTER_SCHOICE = this.getComputerChoice();
    if (COMPUTER_SCHOICE === 0) return;
    this.animals.push(AnimalFactory.createAnimal(COMPUTER_SCHOICE));
    console.log(`Computer chose: ${COMPUTER_SCHOICE}!`);

    this.battleGame();
  }

  private getPlayerChoice(): AnimalSpecies | 0 {
    const DISPLAY_STRING: string =
      "What is your animal? \nThe options are: \n0. exit";
    this.displayChoices(DISPLAY_STRING, 1);
    const SELECT = this.getValidChoice(this.CHOICES.length, 1);
    if (SELECT === 0) return 0;
    return this.CHOICES[SELECT - 1];
  }

  private getComputerChoice(): AnimalSpecies | 0 {
    const DISPLAY_STRING: string = `What is computer's animal? \nThe options are: \n0. exit \n1. random`;
    this.displayChoices(DISPLAY_STRING, 2);

    let select: number = this.getValidChoice(this.CHOICES.length + 2, 2);
    if (select === 0) return 0;
    if (select === 1) {
      select = RNG.randomInt(0, this.CHOICES.length - 1);
    }
    return this.CHOICES[select - 2];
  }

  private displayChoices(prompt: string, otherOptions: number): void {
    console.log(prompt);
    for (let i = 0; i < this.CHOICES.length; i++) {
      console.log(`${i + otherOptions}. ${this.CHOICES[i]}`);
    }
  }

  private getValidChoice(max: number, otherOptions: number): number {
    let choice = Number(promptSync());
    while (choice > max || choice < 0 || choice % 1 !== 0) {
      if (otherOptions === 1) {
        console.log(`Invalid choice. \nThe options are: \n0. exit`);
      } else {
        console.log(`Invalid choice. \nThe options are: \n0. exit \n1.random`);
      }
      for (let i = 0; i < this.CHOICES.length; i++) {
        console.log(`${i + otherOptions}. ${this.CHOICES[i]}`);
      }
      choice = Number(promptSync());
    }
    return choice;
  }

  private battleGame(): void {
    let running: boolean = true;
    let round: number = 0;

    this.printHealth();
    console.log("--------------------------\n");

    while (running) {
      round++;
      console.log(`Round ${round}`);
      running = this.executeRound();
      this.printHealth();
      console.log("--------------------------\n");

      if (RNG.zeroToOne() < 0.05) {
        NaturalDisaster.triggerDisaster(this.animals);
        break;
      }
    }
    this.declareWinner();
  }

  private executeRound(): boolean {
    this.animals[0].attack(this.animals[1]);

    if (this.animals[1].health <= 0) {
      console.log(
        `${this.animals[1].species} is dead, has ${this.animals[1].health} hp`
      );
      return false;
    }

    this.animals[1].attack(this.animals[0]);

    if (this.animals[0].health <= 0) {
      console.log(
        `${this.animals[0].species} is dead, has ${this.animals[0].health} hp`
      );
      return false;
    }

    return true;
  }

  private printHealth(): void {
    this.animals[0].printHP();
    this.animals[1].printHP();
  }

  private declareWinner(): void {
    if (this.animals[1].health <= 0 && this.animals[0].health <= 0) {
      console.log(`No winner!`);
    } else if (this.animals[1].health <= 0) {
      console.log(`The winner is ${this.animals[0].species}!\n`);
    } else {
      console.log(`The winner is ${this.animals[1].species}!\n`);
    }
    new Driver();
  }
}

class Driver {
  constructor() {
    this.start();
  }

  private start(): void {
    new Game();
  }
}

new Driver();

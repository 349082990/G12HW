interface Characteristics {
  species: string;
  attackPower: number;
  defensePower: number;
  health: number;
  isDead: boolean;
  trueDamage: number;
}

abstract class Animal implements Characteristics {
  readonly specialAtkChance: number = 0.1;
  constructor(
    protected _species: string,
    protected _attackPower: number,
    protected _defensePower: number,
    protected _health: number,
    protected _isDead: boolean = false,
    protected _trueDamage: number = 0,
    public maxHealth: number = 0
  ) {}

  public get species(): string {
    return this._species;
  }

  public set species(value: string) {
    this._species = value;
  }

  public get attackPower(): number {
    return this._attackPower;
  }

  public set attackPower(value: number) {
    if (value <= 0) {
      this._attackPower = 0;
    }
    this._attackPower = value;
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

  public get health(): number {
    return this._health;
  }

  public set health(hp: number) {
    this._health = hp;
  }

  public get isDead(): boolean {
    return this._isDead;
  }

  public set isDead(value: boolean) {
    this._isDead = value;
  }

  public get trueDamage() {
    return this._trueDamage;
  }

  public set trueDamage(value: number) {
    if (value <= 0) {
      this._trueDamage = 0;
    }
    this._trueDamage = value;
  }

  protected abstract specialAttack(enemy: Characteristics): void;

  public attack(enemy: Animal) {
    const minDmg = this.attackPower / 10;
    const maxDmg = (this.attackPower * 100) / (100 + enemy.defensePower);
    this.trueDamage = Math.floor(Math.random() * (maxDmg - minDmg) + minDmg);

    enemy.defend(this.trueDamage);
    this.displayStats(this.trueDamage, enemy);
  }

  displayStats(trueDamage: number, enemy: Animal) {
    console.log(`${this.species} did ${trueDamage} damage to ${enemy.species}`);
    console.log(`${enemy.species} now has ${enemy.health} hp`);
  }

  public defend(damage: number) {
    this.health -= damage;
    if (this.health <= 0) {
      this.health = 0;
      this.isDead = true;
    }
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
  CaseOh = "CaseOh",
  MrMa = "MrMa",
}

class animalFactory {
  public static make(type: string) {
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
      case AnimalSpecies.CaseOh:
        return new CaseOh();
      case AnimalSpecies.MrMa:
        return new MrMa();
      default:
        throw new Error("That is not a valid animal!");
    }
  }
}

class Bull extends Animal {
  constructor() {
    super(AnimalSpecies.Bull, 45, 145, 300);
  }

  protected specialAttack(enemy: Animal): void {
    enemy.defensePower -= 15;
    console.log(
      `${this._species} used moo which decreaes ${enemy.species}'s defense by 15. Current enemy defense is ${enemy.defensePower}`
    );
  }
}

class Tiger extends Animal {
  constructor() {
    super(AnimalSpecies.Tiger, 100, 70, 200);
  }

  protected specialAttack(enemy: Animal): void {
    this.attackPower += 15;
    console.log(
      `${this._species} used roar which increases its attack by 15. Tiger's current Attack is ${this.attackPower}`
    );
  }
}

class Eagle extends Animal {
  public dodge: boolean = false;
  protected accumulatedDamage: number = 0;
  protected specialDamage: number = 0;

  constructor() {
    super(AnimalSpecies.Eagle, 75, 110, 250);
  }

  public attack(enemy: Animal): void {
    const minDamage = this.attackPower / 10;
    const maxDamage = (this.attackPower * 100) / (100 + enemy.defensePower);
    this.trueDamage =
      Math.random() * (maxDamage - minDamage) +
      minDamage +
      this.accumulatedDamage;
    enemy.defend(this.trueDamage);
    this.accumulatedDamage = 0;
  }

  public defend(damage: number): void {
    if (this.dodge === true) {
      this.accumulatedDamage += damage + this.specialDamage;
      this.dodge = false;
    } else {
      this.health -= damage;
      if (this.health <= 0) {
        this.health = 0;
        this.isDead = true;
      }
    }
  }

  public specialAttack() {
    this.dodge = true;
    console.log(
      `${
        this.species
      } converted the damage received and will do it back to the enemy for ${Math.floor(
        this.specialDamage
      )} damage in the next attack!`
    );
  }
}

class Bear extends Animal {
  protected minDamage: number = 10;
  constructor() {
    super(AnimalSpecies.Bear, 100, 100, 300);
  }

  public override attack(enemy: Animal): void {
    const minDamage = this.minDamage;
    const maxDamage =
      ((this.attackPower * 100) / (100 + enemy.defensePower)) * 2;
    this.trueDamage = Math.random() * (maxDamage - minDamage) + minDamage;
    enemy.defend(this.trueDamage);
    this.displayStats(this.trueDamage, enemy);
  }

  public override defend(damage: number): number {
    if (damage > 30) {
      damage = 30;
    }
    this.health -= damage;
    if (this.health <= 0) {
      this.isDead = true;
    }
    return damage;
  }

  protected specialAttack(): void {
    this.health += 35;
    console.log(`${this.species} used sleep and gained 35 HP. `);
  }
}

class GrizzlyBear extends Bear {
  constructor() {
    super();
    this.defensePower += 50;
    this.health += 100;
    this.species = AnimalSpecies.GrizzlyBear;
    this.attackPower += 50;
    this.minDamage = 15;
    this.maxHealth = this.health;
  }

  protected specialAttack(): void {
    this.health += 50;
    console.log(`${this.species} used sleep and regained 50 HP.`);
  }
}

class Skunk extends Animal {
  constructor() {
    super(AnimalSpecies.Skunk, 70, 70, 120);
  }

  protected specialAttack(enemy: Animal): void {
    this.trueDamage = enemy.maxHealth * 0.05;
    enemy.defend(this.trueDamage);
    console.log(
      `${this.species} used a stink attack which dealt ${this.trueDamage} damage to ${enemy.species}`
    );
  }
}

class AlbinoSkunk extends Skunk {
  constructor() {
    super();
    this.health += 50;
    this.species = AnimalSpecies.AlbinoSkunk;
    this.attackPower += 20;
    this.defensePower += 20;
    this.maxHealth = this.health;
  }

  protected specialAttack(enemy: Animal): void {
    this.trueDamage = enemy.maxHealth * 0.1;
    enemy.defend(this.trueDamage);
    console.log(
      `${this.species} used a stink attack which dealt ${this.trueDamage} damage to ${enemy.species}`
    );
  }
}

class MegaBull extends Bull {
  constructor() {
    super();
    this.health += 150;
    this.species = AnimalSpecies.MegaBull;
    this.defensePower += 20;
    this.maxHealth = this.health;
  }

  protected specialAttack(enemy: Animal): void {
    enemy.defensePower -= 25;
    console.log(
      `${this.species} used moo which decreaes ${enemy.species}'s defense by 25. Current enemy defense is ${enemy.defensePower}`
    );
  }
}

class GiantTiger extends Tiger {
  constructor() {
    super();
    this.health += 50;
    this.species = AnimalSpecies.GiantTiger;
    this.attackPower += 15;
    this.maxHealth = this.health;
  }

  protected specialAttack(enemy: Animal): void {
    this.attackPower += 25;
    console.log(
      `${this.species} used giant roar which increases its attack by 15. Tiger's current Attack is ${this.attackPower}`
    );
  }
}

class BaldEagle extends Eagle {
  constructor() {
    super();
    this.health += 100;
    this.species = AnimalSpecies.BaldEagle;
    this.attackPower += 10;
    this.defensePower += 10;
    this.maxHealth = this.health;
    this.specialDamage = 15;
  }

  public attack(enemy: Animal): void {
    const minDamage = this.attackPower / 10;
    const maxDamage = (this.attackPower * 100) / (100 + enemy.defensePower);
    this.trueDamage =
      Math.random() * (maxDamage - minDamage) +
      minDamage +
      this.accumulatedDamage;
    enemy.defend(this.trueDamage);
    this.accumulatedDamage = 0;
  }

  public defend(damage: number): void {
    if (this.dodge === true) {
      this.accumulatedDamage += damage + this.specialDamage;
      this.dodge = false;
    } else {
      this.health -= damage;
      if (this.health <= 0) {
        this.health = 0;
        this.isDead = true;
      }
    }
  }

  public specialAttack() {
    console.log(
      `${this.species} used aerial assault and dodged the next attack. `
    );
    this.dodge = true;
  }
}

class CaseOh extends Animal {
  constructor() {
    super(AnimalSpecies.CaseOh, 1000, 1000, 1000);
  }

  protected specialAttack(enemy: Animal): void {
    this.trueDamage = enemy.maxHealth * 0.8;
    enemy.defend(this.trueDamage);
    console.log(
      `${this.species} used explosion and dealth ${this.trueDamage} damage to ${enemy.species}!`
    );
  }
}

class MrMa extends Animal {
  constructor() {
    super(AnimalSpecies.CaseOh, 100, 100, 100);
  }

  protected specialAttack(enemy: Animal): void {
    this.defensePower -= 50;
    this.attackPower += 50;
    console.log(
      `${this.species} gave ${enemy.species} a 0 on their cs assignment and dealt ${this.trueDamage} damage to ${enemy.species}!`
    );
  }
}

class SelfDestruct {
  public static die(playerAnimal: Animal): void {
    playerAnimal.health = 0;
    console.log(
      `${playerAnimal.species} tore a muscle and died. ${playerAnimal.species} has 0 HP now!!!`
    );
  }
}

class Potion {
  public static boost(playerAnimal: Animal): void {
    playerAnimal.health += 20;
    playerAnimal.attackPower += 10;
    playerAnimal.defensePower += 10;
    console.log(
      `${playerAnimal.species} drank a potion and increased its health by 20 hp and attack and defense power by 10`
    );
  }
}

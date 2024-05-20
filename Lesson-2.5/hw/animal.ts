interface Characeristics {
  readonly species: string;
  readonly attackPower: number;
  readonly defensePower: number;
  health: number;
  isDead: boolean;
  trueDamage: number;
}

class Animal implements Characeristics {
  constructor(
    readonly species: string,
    readonly attackPower: number,
    readonly defensePower: number,
    public health: number,
    public isDead: boolean = false,
    public trueDamage: number = 0
  ) {}

  public attack(enemy: Animal) {
    const minDmg = this.attackPower / 10;
    const maxDmg = (this.attackPower * 100) / (100 + enemy.defensePower);
    this.trueDamage = Math.floor(Math.random() * (maxDmg - minDmg) + minDmg);

    enemy.defend(this.trueDamage);
    this.displayStats(this.trueDamage, enemy);
  }

  displayStats(trueDamage, enemy) {
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

class animalFactory {
  public static make(type: string) {
    switch (type) {
      case "Bull":
        return new Animal(type, 45, 145, 300);
      case "Tiger":
        return new Animal(type, 100, 70, 200);
      case "Eagle":
        return new Animal(type, 75, 110, 250);
      default:
        throw new Error("That is not a valid animal!");
    }
  }
}

export { Animal, animalFactory };

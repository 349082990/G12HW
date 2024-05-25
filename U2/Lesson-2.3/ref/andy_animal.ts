const promptSync = require("prompt-sync")({ sigint: true });

class Game {
  animals = [];
  validAnimals = ["bull", "eagle", "tiger"];
  constructor() {
    this.startGame();
  }
  startGame() {
    console.log(
      "Welcome to animal battle, please pick an animal, bull, tiger, or eagle"
    );
    while (!this.animals[0]) {
      console.log("pick your first animal");
      const animal1 = promptSync("animal 1 pls ");
      if (this.validAnimals.includes(animal1) == false) {
        console.log("please pick a valid animal");
      } else {
        this.animals.push(Animal.factory(animal1));
      }
    }
    while (!this.animals[1]) {
      console.log("pick your second animal");
      const animal2 = promptSync("animal 2 pls ");
      if (this.validAnimals.includes(animal2) == false) {
        console.log("please pick a valid animal");
      } else {
        this.animals.push(Animal.factory(animal2));
      }
    }
    console.log("======================");
    this.mainGame();
  }
  mainGame() {
    while (this.animals[0].hp > 0 && this.animals[1].hp > 0) {
      this.animals[0].attack(this.animals[1]);
      this.animals[1].attack(this.animals[0]);
      console.log("======================");
    }
    this.checkWinner();
  }
  checkWinner() {
    if (this.animals[0].hp <= 0 && this.animals[1].hp <= 0) {
      console.log("tie");
    } else if (this.animals[1].hp <= 0) {
      console.log("The winner is " + this.animals[0].animal);
    } else {
      console.log("The winner is " + this.animals[1].animal);
    }
  }
}
class Animal {
  _hp;
  attackPower;
  defense;
  _animal;
  constructor(hp, attackPower, defense, animal) {
    this._hp = hp;
    this.attackPower = attackPower;
    this.defense = defense;
    this._animal = animal;
  }
  attack(enemy) {
    const minDamage = this.attackPower / 10;
    const maxDamage = (this.attackPower * 100) / (100 + enemy.defense);
    const damage = Math.floor(
      Math.random() * (maxDamage - minDamage) + minDamage
    );
    enemy.defend(damage);
    this.displayStats(damage, enemy);
  }
  defend(damage) {
    this._hp -= damage;
  }
  displayStats(damage, enemy) {
    console.log(`${this.animal} did ${damage} damage to ${enemy.animal}`);
    console.log(`${enemy.animal} now has ${enemy.hp} hp`);
  }
  get hp() {
    return this._hp;
  }
  get animal() {
    return this._animal;
  }
  static factory(animalType) {
    switch (animalType) {
      case "bull":
        return new Bull();
      case "tiger":
        return new Tiger();
      case "eagle":
        return new Eagle();
    }
  }
}
class Bull extends Animal {
  constructor() {
    super(300, 45, 145, "bull");
  }
}
class Tiger extends Animal {
  constructor() {
    super(200, 100, 70, "tiger");
  }
}
class Eagle extends Animal {
  constructor() {
    super(250, 75, 110, "Eagle");
  }
}
new Game();
//# sourceMappingURL=index.js.map

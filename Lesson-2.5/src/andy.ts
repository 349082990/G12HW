// note: I used math.floor to round everything down for the displaying, but used the real numbers in the actual attacks, it is to make the battle logs look good so it might be off by one or two the numbers.

const promptSync = require("prompt-sync")({ sigint: true });
/**
 * This is the class that contains the actual game that is being played. here is where all instances of other animals will be created, and the main game loop will exist inside of this class. The beggining and end of the game will be called in this class and is overall the whole entire game
 * @validAnimals- We need to check if the user has picked an animal that is actually in our game, so we use this array which contains every valid animal to check if the user has picked one of the options
 */
class Game {
  private animals: Animal[] = [];
  private validAnimals: string[] = [
    "Bull",
    "Tiger",
    "Eagle",
    "Mega Bull",
    "Grizzly Bear",
    "Giant Tiger",
    "Bald Eagle",
    "Bear",
    "Cheetah",
    "Turtle",
  ];
  constructor() {
    this.startGame();
  }
  /**
   * This will begin the selection process of the game, where we will choose two animals to fight against each other and check if it is a valid animal before proceeding to the main game
   */
  private startGame(): void {
    console.log(
      "Welcome to animal battle, please pick an animal, Bull, Tiger, Eagle, Mega Bull, Grizzly Bear, Giant Tiger, Bald Eagle, Bear, Cheetah, Turtle, "
    );
    while (!this.animals[0]) {
      console.log("pick your first animal");
      const animal1 = promptSync("animal 1 pls ");
      if (this.validAnimals.includes(animal1) == true) {
        this.animals.push(Animal.factory(animal1));
      } else {
        this.animals.push(Animal.factory(animal1));
        console.log("please pick a valid animal");
      }
    }

    while (!this.animals[1]) {
      console.log("pick your second animal");
      const animal2 = promptSync("animal 2 pls ");
      if (
        this.validAnimals.includes(animal2) == true &&
        animal2 != this.animals[0].animal
      ) {
        this.animals.push(Animal.factory(animal2));
      } else {
        console.log("please pick a valid animal");
      }
    }
    console.log("======================");
    this.mainGame();
  }
  /**
   * This is the main game loop of our game, most of the games logic will be called here, where the two animals will began to take turns fighting each other until either one of their hp hits below 1 or if both of their hp drops below 1. There is also always a 10 percent chance an animal will use their special move and this will not be manipulated
   */
  private mainGame(): void {
    while (this.animals[0].hp > 0 && this.animals[1].hp > 0) {
      if (Math.random() <= 0.1) {
        this.animals[0].special(this.animals[1]);
      } else {
        this.animals[0].attack(this.animals[1]);
      }
      if (Math.random() <= 0.1) {
        this.animals[1].special(this.animals[0]);
      } else {
        this.animals[1].attack(this.animals[0]);
      }
      console.log("======================");
    }
    this.checkWinner();
  }
  private checkWinner(): void {
    if (this.animals[0].hp <= 0 && this.animals[1].hp <= 0) {
      console.log("tie");
    } else if (this.animals[1].hp <= 0) {
      console.log("The winner is " + this.animals[0].animal);
    } else {
      console.log("The winner is " + this.animals[1].animal);
    }
  }
}
/**
 * This is the animal class that contains properties that all the animals will be having, this class will be extended to all of the animals and all animals will have the same types of stats execpt they will all have unique special moves and the actual stats will be different numbers
 * @animal- This is the name of the animal, we will be using this to display the name of the animal so the user can tell the difference between what animal is doing what
 * @dodge- This checks if the animal has done a successful dodge or not, we need a varible that can remember this so we can display to the user if that animal has sucessfully dodged or not
 * @crit- This checks if the animal has succesfully crit their attack or not, we need a varible that can remember this so we can display to the user and make sure the attack has crit based on what the crit damage is assigned to that current animal
 * @specialMove- This is the name of the special move that the animal has, this is used so we can display it when the animal decides to use their special move
 * @damage- this is the amount of damage in that current moment the animal will be doing to their enemy, we need this so we can manipulate the damage if the animal crits the attack
 * @critChance- The chance the animal can crit their attack, the actual percentage is divded by 100 here, so if the chance is 1, it is actually 100 percent
 * @dodgeChance- The chance the animal can dodge an incoming attack, it is the same style as crit chance
 */
abstract class Animal {
  protected _hp: number;
  protected _attackPower: number;
  protected _defense: number;
  protected _animal: string;
  protected specialMove: string;
  protected dodgeChance: number;
  protected critChance: number;
  protected critDamage: number;
  protected dodge: boolean = false;
  protected crit: boolean = false;
  protected damage: number = 0;
  constructor(
    hp: number,
    attackPower: number,
    defense: number,
    animal: string,
    specialMove: string,
    dodgeChance: number,
    critChance: number,
    critDamage: number
  ) {
    this._hp = hp;
    this._attackPower = attackPower;
    this._defense = defense;
    this._animal = animal;
    this.specialMove = specialMove;
    this.dodgeChance = dodgeChance;
    this.critChance = critChance;
    this.critDamage = critDamage;
  }
  /**
   * This is the method where the animal will attack,
   */
  public attack(enemy: Animal): void {
    const minDamage = this.attackPower / 10;
    const maxDamage = (this.attackPower * 100) / (100 + enemy.defense);
    this.damage = Math.random() * (maxDamage - minDamage) + minDamage;
    if (this.isCrit() == true) {
      this.damage *= this.critDamage;
    }
    // Where the enemy will be taking damage here
    enemy.defend(this.damage);
    this.displayStats(enemy, this.damage);
  }
  /**
   * Where we display the stats after each and every special or attack, we give the user a preview of everything that has happened, we display if the user has crit and then show the amounts done and if the enemy has dodged, and the hps as a result of the attacks
   */
  protected displayStats(enemy: Animal, damage: number): void {
    this.checkCrit(damage);
    console.log(
      `${this.animal} Attempts to do ${Math.floor(damage)} damage to ${
        enemy.animal
      }`
    );
    enemy.checkDodge(damage);
    console.log(`${enemy.animal} now has ${Math.floor(enemy.hp)} hp`);
  }
  protected isCrit(): boolean {
    if (Math.random() <= this.critChance) {
      this.crit = true;
      return true;
    } else {
      return false;
    }
  }
  /**
   * We check if the animal has successfully crit their attack, and we display it properly and make it false for the next attack
   * We did damage / this.critdamage because the crit has already been added to the attack if the animal has successfully crit, so we need to remember the damage before the crit to display it properly
   */
  protected checkCrit(damage: number): void {
    if (this.crit == true) {
      console.log(
        `${this.animal} got a crit and their next attack went from ${Math.floor(
          damage / this.critDamage
        )} damage to ${Math.floor(damage)} damage`
      );
      this.crit = false;
    }
  }
  /**
   * We check if the animal has successfully dodged the incoming attack, and we display it properly and make it false for the next attack
   * @damage- The amount of damage that the animal is supposed to be taking
   */
  protected checkDodge(damage: number): void {
    if (this.dodge == true) {
      console.log(`${this.animal} dodged ${Math.floor(damage)} damage`);
      this.dodge = false;
    }
  }
  /**
   * If the animal has used a special, we display it to let the user know they have used it, what it says differs from each animal as they all have a unique special move
   */
  protected abstract displaySpecial(enemy: Animal): void;

  abstract special(enemy: Animal): void;

  public defend(damage: number): void {
    // Checks if the animal has succesfully dodged the attack or did not
    if (Math.random() > this.dodgeChance) {
      this.hp -= damage;
    } else {
      this.dodge = true;
    }
  }
  public get hp(): number {
    return this._hp;
  }
  public get animal(): string {
    return this._animal;
  }
  public get defense(): number {
    return this._defense;
  }
  public get attackPower(): number {
    return this._attackPower;
  }
  public set defense(value: number) {
    this._defense = value;
  }
  public set hp(value: number) {
    this._hp = value;
  }
  public set attackPower(value: number) {
    this._attackPower = value;
  }
  public static factory(animalType: string): Animal {
    switch (animalType) {
      case "Bull":
        return new Bull();
      case "Tiger":
        return new Tiger();
      case "Eagle":
        return new Eagle();
      case "Bear": {
        return new Bear();
      }
      case "Grizzly Bear": {
        return new GrizzlyBear();
      }
      case "Mega Bull": {
        return new MegaBull();
      }
      case "Giant Tiger": {
        return new GiantTiger();
      }
      case "Bald Eagle": {
        return new BaldEagle();
      }
      case "Cheetah": {
        return new Cheetah();
      }
      case "Turtle": {
        return new Turtle();
      }
    }
  }
}
/**
 * This is the class for the bull, where it has unique stats that are different from other animals, and it has a special move where it would remove the defense of the enemy by a certain amount
 * @specialDefense- The amount the bull will be reducing the enemys defense by
 */
class Bull extends Animal {
  protected specialDefense: number;
  constructor() {
    super(300, 45, 145, "Bull", "Moo", 0.1, 0.2, 1.5);
    this.specialDefense = 15;
  }
  public special(enemy: Animal): void {
    enemy.defense -= this.specialDefense;
    this.displaySpecial(enemy);
  }
  protected displaySpecial(enemy: Animal): void {
    // Tells the user that the animal has used the special
    console.log(`${this.animal} used ${this.specialMove}`);
    console.log(
      this.animal +
        " Reduced " +
        enemy.animal +
        " defense by " +
        this.specialDefense +
        " to " +
        enemy.defense
    );
  }
}
/**
 * This is the class for the mega bull, it is very similar to the bull execpt it is a bit more powerful and has a different special move name and has the same crit and dodge chance
 */
class MegaBull extends Bull {
  constructor() {
    super();
    this.hp += 150;
    this.defense += 20;
    this.specialMove = "Mega Moo";
    this._animal = "Mega Bull";
    this.specialDefense = 25;
  }
}
/**
 * This is the class for the tiger, the special move increases its own attack by a certain amount and has unique stats that is different from other animals
 */
class Tiger extends Animal {
  protected specialAttack: number;
  constructor() {
    super(200, 100, 70, "Tiger", "Roar", 0.2, 0.3, 1.85);
    this.specialAttack = 15;
  }
  public special(): void {
    this.attackPower += this.specialAttack;
    this.displaySpecial();
  }
  protected displaySpecial(): void {
    console.log(`${this.animal} used ${this.specialMove}`);
    console.log(
      this.animal +
        " increased its attack power by " +
        this.specialAttack +
        " to " +
        this.attackPower
    );
  }
}
class GiantTiger extends Tiger {
  constructor() {
    super();
    this.attackPower += 15;
    this.hp += 50;
    this.specialMove = "Giant Roar";
    this._animal = "Giant Tiger";
    this.specialAttack = 25;
  }
}
/**
 * This is the class for the eagle, the special move dodges the attack given and on the next attack, the eagle will do its usual attack but in addition deal the enemys attack back to themselves with no extra special damage
 * @extraDamage- The extra damage that is taken from the enemys attack which will be added to the next attack the eagle does
 * @specialDamage- An extra amount of damage that is added to the eagles extra damage, in this case since its only a regular eagle, it will not do any additional damage after dealing the enemys damage back to themselves. Note that this is not the same as the regular attack it will be giving in addition to the extra damage.
 * @specialDodge- We need a varible to check if the eagle has used its special, so we can make sure to store up the damage it has taken from the enemy and release it back onto them
 */
class Eagle extends Animal {
  protected extraDamage: number = 0;
  protected specialDamage: number = 0;
  protected specialDodge: boolean = false;
  constructor() {
    super(250, 75, 110, "Eagle", "Dive", 0.2, 0.3, 1.6);
  }
  public override attack(enemy: Animal): void {
    const minDamage = this.attackPower / 10;
    const maxDamage = (this.attackPower * 100) / (100 + enemy.defense);
    this.damage =
      Math.random() * (maxDamage - minDamage) + minDamage + this.extraDamage;
    if (this.isCrit() == true) {
      this.damage *= this.critDamage;
    }
    enemy.defend(this.damage);
    // Setting the extra damage back to 0 so it will not do additional damage again unless the eagle activates its special move.
    this.extraDamage = 0;
    this.displayStats(enemy, this.damage);
  }
  public override defend(damage: number): void {
    if (this.specialDodge == true) {
      // We are doing plus equals to because there is a chance that the eagle will use its special move twice, so it has to store up all the taken damage to explode it all back onto the enemy
      this.extraDamage += damage + this.specialDamage;
      this.specialDodge = false;
    } else {
      if (Math.random() > this.dodgeChance) {
        this.hp -= damage;
      } else {
        this.dodge = true;
      }
    }
  }
  protected displaySpecial(): void {
    console.log(`${this.animal} used ${this.specialMove}`);
    console.log(
      `${
        this.animal
      } converted the damage it took and will do it back to the enemy plus ${Math.floor(
        this.specialDamage
      )} damage in the next attack!`
    );
  }
  public special() {
    this.specialDodge = true;
    this.displaySpecial();
  }
}
/**
 * This is the extended class from eagle which is for the bald eagle, it is the same as the eagle execpt it has upgraded stats and the special move deals the enemys attack back to itself with an extra amount of damage, in this case, it will be 15.
 */
class BaldEagle extends Eagle {
  constructor() {
    super();
    this.hp += 100;
    this.attackPower == 10;
    this.defense += 10;
    this.specialMove = "Aerial Assault";
    this._animal = "Bald Eagle";
    this.specialDamage = 15;
  }
}
/**
 * This is the class for the bear, the special move lets it sleep and recovers their hp by a certain amount, it also has a special defense that only allows it to take damage up to a certain amount in one turn. And the minimum damage will be 10 no matter what the attack power is
 * @maxDmgTaken- The maximum amount of damage the bear can take in one turn
 * @specialHp- The amount of hp the bear will restore after using its special move
 * @minDamage- The minimum damage the bear can do in one single turn
 */
class Bear extends Animal {
  protected maxDmgTaken: number;
  protected specialHp: number;
  protected minDamage: number = 10;
  constructor() {
    super(300, 100, 100, "Bear", "Sleep", 0.5, 0.6, 1.9);
    this.maxDmgTaken = 35;
    this.specialHp = 35;
  }
  public override attack(enemy: Animal): void {
    const minDamage = this.minDamage;
    const maxDamage = ((this.attackPower * 100) / (100 + enemy.defense)) * 2;
    this.damage = Math.random() * (maxDamage - minDamage) + minDamage;
    if (this.isCrit() == true) {
      this.damage *= this.critDamage;
    }
    enemy.defend(this.damage);
    this.displayStats(enemy, this.damage);
  }
  public override defend(damage: number): void {
    // Making sure the damage will never be above the maximum damage the bear can take
    if (damage > this.maxDmgTaken) {
      damage = this.maxDmgTaken;
    }
    this.hp -= damage;
  }
  public special(): void {
    this.hp += this.specialHp;
    this.displaySpecial();
  }
  protected displaySpecial(): void {
    console.log(this.animal + " went to sleep");
    console.log(
      `${this.animal} recovered ${this.specialHp} hp and is now at ${Math.floor(
        this.hp
      )} hp`
    );
  }
}
/**
 * This is the class for the grizzly bear, it is the same as the bear execpt it has better stats and the special move is named a bit differently
 */
class GrizzlyBear extends Bear {
  constructor() {
    super();
    this._hp += 100;
    this._defense += 50;
    this._attackPower += 50;
    this.specialMove = "Super Sleep";
    this._animal = "Grizzly Bear";
    this.specialHp = 50;
    this.maxDmgTaken = 30;
    this.minDamage = 15;
  }
}
/**
 * This is the class for the cheetah, the special move allows it to attack an enemy twice in a singular turn, due to its high speed
 */
class Cheetah extends Animal {
  constructor() {
    super(275, 80, 50, "Cheetah", "Super Speed", 0.7, 0.6, 1.3);
  }
  protected displaySpecial(): void {
    console.log(`${this.animal} used ${this.specialMove}`);
    console.log(`${this.animal} attacks twice !`);
  }
  public special(enemy: Animal): void {
    this.displaySpecial();
    this.attack(enemy);
    this.attack(enemy);
  }
}
/**
 * This is the class for the turtle, the special move increases its defense by a certain amount
 * @specialDefense- The amount the turtle will increase its defense by everytime it uses its special move
 */
class Turtle extends Animal {
  private specialDefense: number = 150;
  constructor() {
    super(500, 70, 200, "Turtle", "Super Defense", 0.1, 0.1, 2);
  }
  protected displaySpecial(): void {
    console.log(`${this.animal} used ${this.specialMove}`);
    console.log(
      `${this.animal}  increased it's defense by ${this.defense} to ${
        this.defense + this.specialDefense
      } !`
    );
  }
  public special(): void {
    this.displaySpecial();
    this.defense += this.specialDefense;
  }
}
new Game();

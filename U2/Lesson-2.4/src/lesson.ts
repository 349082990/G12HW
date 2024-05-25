// A warrior class, a thief class, a mage class, and a cleric class
// All classes have HP, Mana, Physical Attack, Physical Defense, Magic Attack, Magical Defense as properties
// All classes have the methods attack and defend
// Warriors have a method called berserk
// Thieves have a method called steal
// Mages have a method called cast
// Clerics have a method called heal

abstract class Character {
  constructor(
    protected _HP: number,
    protected MP: number,
    protected pAtk: number,
    protected pDef: number,
    protected mAtk: number,
    protected mDef: number
  ) {}
  abstract attack(): void; //use abstract if all/most of the subclasses are different
  public defend(): void {
    console.log(1);
  } //use virtual if all/most are the same
}

class Warrior extends Character {
  constructor(
    HP: number,
    MP: number,
    pAtk: number,
    pDef: number,
    mAtk: number,
    mDef: number
  ) {
    super(HP, MP, pAtk, pDef, mAtk, mDef);
  }
  public berserk() {}

  public attack(): void {}

  public defend(n?: number): void {}
}

const w: Warrior = new Warrior(1, 2, 3, 4, 5, 6);
w.defend();

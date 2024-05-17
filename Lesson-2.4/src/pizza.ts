//Decorator design pattern
abstract class Pizza {
  protected _description: string = "";

  public get description(): string {
    return this._description;
  }

  abstract get cost(): number;
}

class PlainDoughPizza extends Pizza {
  protected _description: string = "Plain dough";

  public get cost(): number {
    return 10;
  }
}

class WholeWheatPizza extends Pizza {
  protected _description: string = "Whole wheat";

  public get cost(): number {
    return 12;
  }
}

abstract class PizzaDecorator extends Pizza {
  constructor(protected pizza: Pizza) {
    //<--- is what you are decorating
    super();
  }

  abstract get description(): string;
}

class CheeseDecorator extends PizzaDecorator {
  protected _description: string = ", cheese";
  public get cost(): number {
    return this.pizza.cost + 0.5;
  }

  public get description(): string {
    return this.pizza.description + this._description;
  }
}

class PepperoniDecorator extends PizzaDecorator {
  protected _description: string = ", pepperoni";
  public get cost(): number {
    return this.pizza.cost + 0.7;
  }

  public get description(): string {
    return this.pizza.description + this._description;
  }
}

class TomatoSauceDecorator extends PizzaDecorator {
  protected _description: string = ", tomato sauce";

  public get cost(): number {
    return this.pizza.cost + 0.2;
  }

  public get description(): string {
    return this.pizza.description + this._description;
  }
}

class PizzaFactory {
  public static createDefaults(type: string) {
    switch (type) {
      case "cheese":
        let p: Pizza = new PlainDoughPizza();
        p = new CheeseDecorator(p);
        p = new TomatoSauceDecorator(p);
        return p;
      default:
        throw new Error("not a valid default pizzas"); //<--- for the developers
    }
  }
}

let p: Pizza = new WholeWheatPizza();
console.log(p);
console.log(p.description);
console.log(p.cost);

p = new CheeseDecorator(p);
console.log(p);
console.log(p.description);
console.log(p.cost);

p = new PepperoniDecorator(p);
console.log(p);
console.log(p.description);
console.log(p.cost);

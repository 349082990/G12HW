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

class PineappleDecorator extends PizzaDecorator {
  protected _description: string = ", pineapple";
  public get cost(): number {
    return this.pizza.cost + 1.0;
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

enum Doughs {
  PLAIN = "plain",
  WHOLE_WHEAT = "wheat wheat",
}

enum Toppings {
  CHEESE = "cheese",
  PEPPERONI = "pepperoni",
}

enum StandardPizza {
  CHEESE = "cheese",
  PEPPERONI = "pepperoni",
  HAWAIIAN = "hawaiian",
}

class PizzaFactory {
  public static createStandardPizza(type: string) {
    switch (type) {
      case StandardPizza.CHEESE: {
        let p: Pizza = new PlainDoughPizza();
        p = new CheeseDecorator(p);
        p = new TomatoSauceDecorator(p);
        return p;
      }

      case StandardPizza.PEPPERONI: {
        let p: Pizza = new PlainDoughPizza();
        p = new CheeseDecorator(p);
        p = new TomatoSauceDecorator(p);
        p = new PepperoniDecorator(p);
        return p;
      }

      case StandardPizza.HAWAIIAN: {
        let p: Pizza = new PlainDoughPizza();
        p = new CheeseDecorator(p);
        p = new TomatoSauceDecorator(p);
        p = new PineappleDecorator(p);
        return p;
      }

      default:
        throw new Error("not a valid default pizzas"); //<--- for the developers
    }
  }
}

class PizzaDecoratorFactory {
  public static decorate(type: string, pizza: Pizza) {
    switch (type) {
      case Toppings.CHEESE:
        return new CheeseDecorator(pizza);
      case Toppings.PEPPERONI:
        return new PepperoniDecorator(pizza);
      default:
        throw new Error("not a valid default pizza decorator");
    }
  }
}

export {
  StandardPizza,
  Pizza,
  PizzaFactory,
  PizzaDecorator,
  PizzaDecoratorFactory,
};

import { Cart } from "./cart";
import { AddToCartCommand, DisplayMenuAndInvokeItemCommand } from "./command";
import { CheckoutMenu, CompositeMenu, MenuItem } from "./menu";
import { PizzaFactory, StandardPizza } from "./pizza";

class Client {
  private static _instance: Client;
  private mainMenu: CompositeMenu = new CompositeMenu("Main Menu");
  private cart: Cart = new Cart();

  private constructor() {}

  public initialize(): void {
    this.composeMainMenu();
    this.mainMenu.executeCommand();
  }

  private composeMainMenu(): void {
    this.mainMenu.addCommand(
      new DisplayMenuAndInvokeItemCommand(this.mainMenu)
    );
    this.mainMenu.addMenuItem(this.composeOrderStandardPizzaMenu());
    const checkoutMenu = new MenuItem("Checkout").addCommand(
      new DisplayMenuAndInvokeItemCommand(this.composeCartMenu())
    );
    this.mainMenu.addMenuItem(checkoutMenu);
  }

  private composeOrderStandardPizzaMenu(): CompositeMenu {
    const menu = new CompositeMenu("Order a standard pizza");
    menu.addCommand(new DisplayMenuAndInvokeItemCommand(menu));

    const values = Object.values(StandardPizza);
    for (let value of values) {
      const pizza = PizzaFactory.createStandardPizza(value);
      const m = new MenuItem(`${pizza.description} - ${pizza.cost}`).addCommand(
        new AddToCartCommand(pizza, this.cart, this.mainMenu)
      );
      menu.addMenuItem(m);
    }

    return menu;
  }

  private composeCartMenu(): CompositeMenu {
    const menu = new CheckoutMenu(this.cart);
    menu.addCommand(new DisplayMenuAndInvokeItemCommand(menu));

    const m1 = new MenuItem("Choose a payment method");
    const m2 = new MenuItem("Return to main menu").addCommand(
      new DisplayMenuAndInvokeItemCommand(this.mainMenu)
    );

    menu.addMenuItem(m1).addMenuItem(m2);

    return menu;
  }

  public static get instance(): Client {
    if (!Client._instance) {
      Client._instance = new Client();
    }

    return Client._instance;
  }
}

class Driver {
  constructor() {
    Client.instance;
    Client.instance.initialize();
  }
}

new Driver();

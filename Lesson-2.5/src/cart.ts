import { Pizza } from "./pizza";

class Cart {
  private _items: Pizza[] = [];

  public get items(): Pizza[] {
    return this._items;
  }

  public addToCart(p: Pizza) {
    this.items.push(p);
  }

  public displayInvoice(): string {
    let invoice = "";
    invoice += "============================\n";
    invoice += "      INVOICE  \n";
    invoice += "============================\n";

    for (let i = 0; i < this._items.length; i++) {
      invoice += `${i + 1}. ${this._items[i].description} - $${
        this._items[i].cost
      }\n`;
    }

    return invoice;
  }
}

export { Cart };

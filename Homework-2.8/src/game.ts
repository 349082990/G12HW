class Game {
  private hero = new Hero(0, 0, 50, 50, "pink");
  private controller = new Controller(this.hero);
  constructor() {
    this.hero.draw();
  }
}

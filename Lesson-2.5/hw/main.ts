const promptSync = require("prompt-sync")({ sigint: true });

class Driver {
  private game: Game;
  constructor() {
    this.game = new Game();
  }
}

new Driver();

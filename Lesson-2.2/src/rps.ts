const promptSync = require("prompt-sync")({ sigint: true });

// SIngleton
class Game {
    private static _instance: Game;
  private constructor() {}
}
  public static get instance(): Game {
    if (Game._instance === undefined) {
      Game._instance = new Game();
    }

    return Game._instance;
  }
}

class Driver {}


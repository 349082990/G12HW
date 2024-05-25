/**
 * This is a standard coin. It has heads or tails and can be tossed.
 */
class Coin {
  readonly faces: string[] = ["heads", "tails"];
  constructor() {}

  public toss(): string {
    let r: number = Math.random();
    if (r < 0.5) {
      return this.faces[0];
    } else {
      return this.faces[1];
    }
  }
}

/**
 * This is the Player class. They get to choose the result of a coin flip. They can type exit to quit the game.
 */
class Player {
  private _score = 0;
  constructor() {}

  public get score(): number {
    return this._score;
  }

  public increaseScore() {
    this._score++;
  }

  public choose(coin: Coin): string {
    let r = promptSync(
      `Choose a side. Type either "heads" or "tails". Type "exit" to quit the game. `
    );
    while (!coin.faces.includes(r) && r !== "exit") {
      r = promptSync(
        `That is not a valid coin face! Type "heads" or "tails". Type "exit" to quit the game. `
      );
    }
    return r;
  }
}

/**
 * This is the main Game class. It is made as a singleton. It holds the players and the coin.
 */
class Game {
  private static _instance: Game;
  private players: Player[] = [new Player(), new Player()];
  private coin: Coin = new Coin();
  private running: boolean = true;
  private constructor() {
    this.mainLoop();
  }

  public static get instance(): Game {
    if (Game._instance === undefined) {
      Game._instance = new Game();
    }

    return Game._instance;
  }

  private randomAPlayer(): number {
    let r = Math.random();
    if (r < 0.5) {
      return 0;
    } else {
      return 1;
    }
  }

  private displayScore(): void {
    console.log(`Player 1 score is ${this.players[0].score}.`);
    console.log(`Player 2 score is ${this.players[1].score}.`);
    console.log(`=====================================`);
  }

  public mainLoop() {
    while (this.running) {
      const chosenPlayer = this.randomAPlayer();

      console.log(`Welcome to heads or tails.`);
      const playerChoice = this.players[chosenPlayer].choose(this.coin);

      const coinFlipResult = this.coin.toss();

      if (playerChoice === "exit") break;

      //choice MUST be heads or tails
      if (playerChoice === coinFlipResult) {
        //The chosen player won
        this.players[chosenPlayer].increaseScore();
        console.log(`Player ${chosenPlayer + 1} won!`);
      } else {
        //The chosen player lost
        this.players[(chosenPlayer + 1) % 2].increaseScore();
        console.log(`Player ${((chosenPlayer + 1) % 2) + 1} won!`);
      }

      this.displayScore();
    }
  }
}

//Driver class ALL it does is start program
class Driver {
  constructor() {
    Game.instance;
  }
}

new Driver();

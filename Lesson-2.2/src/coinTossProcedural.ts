const promptSync = require("prompt-sync")({ sigint: true });
let scores = [0, 0]; //[p1, p2]
let playerOneHeads = false;

let running = true;
// Main Game Loop
while (true) {
  let rand = Math.random(); // 0 - 1
  let player;
  if (rand < 0.5) {
    player = 0;
  } else {
    player = 1;
  }

  console.log("Welcome to heads or tails!");
  let choices = ["heads", "tails", "exit"];
  let choice = promptSync(
    `Player ${player + 1} choose heads or tails. Type "exit" to stop the game. `
  );

  // Loop to make sure user types a valid choice
  while (!choices.includes(choice)) {
    choice = promptSync(
      `That's not a valid choice! Pick "heads", "tails", or "exit!" `
    );
  }

  // Flip a coin
  let coinFlip = Math.random();
  let outcome;

  if (coinFlip < 0.5) {
    outcome = 0;
  } else {
    outcome = 1;
  }

  if (choice === "exit") {
    break;
  }

  // Choice MUST be heads or taills
  if (choice === choices[outcome]) {
    // The chosen player won
    scores[player]++;
    console.log(`Player ${player + 1} won! `);
  } else {
    // The chosen player lost
    scores[(player + 1) % 2]++;
    console.log(`Player ${((player + 1) % 2) + 1} won! `);
  }

  // Display
  console.log(`Player 1 score is ${scores[0]} `);
  console.log(`Player 2 score is ${scores[1]} `);
  console.log("================================================");
}

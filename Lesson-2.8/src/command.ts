interface Command {
  execute(): void;
}

class MoveRightCommand implements Command {
  constructor(private hero: Hero) {}

  public execute(): void {
    this.hero.moveRight();
  }
}

class MoveLeftCommand implements Command {
  constructor(private hero: Hero) {}

  public execute(): void {
    this.hero.moveLeft();
  }
}

class MoveUpCommand implements Command {
  constructor(private hero: Hero) {}

  public execute(): void {
    this.hero.moveUp();
  }
}

class MoveDownCommand implements Command {
  constructor(private hero: Hero) {}

  public execute(): void {
    this.hero.moveDown();
  }
}

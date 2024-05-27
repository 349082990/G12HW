class Controller {
  private _W: boolean = false;
  private _A: boolean = false;
  private _S: boolean = false;
  private _D: boolean = false;

  constructor(
    private commandW: Command,
    private commandA: Command,
    private commandS: Command,
    private commandD: Command
  ) {
    document.addEventListener("keydown", (event) => this.handleKeyDown(event));
    document.addEventListener("keyup", (event) => this.handleKeyUp(event));
  }

  public inputHandler(): void {
    if (this._W) this.commandW.execute();
    if (this._A) this.commandA.execute();
    if (this._S) this.commandS.execute();
    if (this._D) this.commandD.execute();
  }

  private handleKeyDown(event: KeyboardEvent) {
    if (event.key === "w") {
      this._W = true;
    }
    if (event.key === "a") {
      this._A = true;
    }
    if (event.key === "s") {
      this._S = true;
    }
    if (event.key === "d") {
      this._D = true;
    }
  }

  private handleKeyUp(event: KeyboardEvent) {
    if (event.key === "w") {
      this._W = false;
    }
    if (event.key === "a") {
      this._A = false;
    }
    if (event.key === "s") {
      this._S = false;
    }
    if (event.key === "d") {
      this._D = false;
    }
  }
}

class Game {
    objects = [
        new GameObject(70, 70, 50, 50, "green"),
        new GameObject(200, 250, 30, 30, "blue"),
    ];
    _ball = new Ball(Canvas.WIDTH / 2, Canvas.HEIGHT / 2, 15, "black");
    FPS = 60;
    timeInterval = 1000 / this.FPS;
    deltaTime = 0;
    previousTime = 0;
    constructor() {
        setInterval(() => {
            this.clearScreen();
            this.updateAll();
            this.drawEverything();
        }, this.timeInterval);
    }
    get ball() {
        return this._ball;
    }
    updateAll() {
        this.getDeltaTime();
        this.ball.checkBallBoundaries();
        this.ball.ballMovement(this.deltaTime);
    }
    drawEverything() {
        for (let object of this.objects) {
            object.draw();
        }
        this.ball.draw();
    }
    getDeltaTime() {
        const curTime = performance.now();
        this.deltaTime = (curTime - this.previousTime) / 1000;
        this.previousTime = curTime;
    }
    clearScreen() {
        Canvas.instance.context.clearRect(0, 0, Canvas.WIDTH, Canvas.HEIGHT);
    }
}
//# sourceMappingURL=game.js.map
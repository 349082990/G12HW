class Ball {
    _x;
    _y;
    _radius;
    colour;
    collisionDirection = [];
    ballSpeedX = 250;
    ballSpeedY = 250;
    objects = [
        new GameObject(70, 70, 200, 200, "green"),
        new GameObject(200, 250, 70, 30, "blue"),
    ];
    constructor(_x, _y, _radius, colour) {
        this._x = _x;
        this._y = _y;
        this._radius = _radius;
        this.colour = colour;
    }
    get x() {
        return this._x;
    }
    set x(value) {
        this._x = value;
    }
    get y() {
        return this._y;
    }
    set y(value) {
        this._y = value;
    }
    get radius() {
        return this._radius;
    }
    set radius(value) {
        this._radius = value;
    }
    draw() {
        Canvas.instance.context.fillStyle = this.colour;
        Canvas.instance.context.beginPath();
        Canvas.instance.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        Canvas.instance.context.fill();
        Canvas.instance.context.closePath();
    }
    ballMovement(d) {
        this.x += this.ballSpeedX * d;
        this.y += this.ballSpeedY * d;
        this.checkBallBoundaries();
    }
    hasCollided() {
        for (let object of this.objects) {
            const leftCollision = this.x - this.radius == object.x + object.w;
            const rightCollision = this.x + this.radius == object.x;
            const topCollision = this.y - this.radius == object.y + object.h;
            const bottomCollision = this.y + this.radius == object.y;
            if (this.x - this.radius <= object.x + object.w &&
                this.x + this.radius >= object.x &&
                this.y - this.radius <= object.y + object.h &&
                this.y + this.radius >= object.y) {
                this.collisionDirection = [
                    leftCollision,
                    rightCollision,
                    topCollision,
                    bottomCollision,
                ];
                return true;
            }
        }
        return false;
    }
    checkBallBoundaries() {
        if (this.hasCollided()) {
            if (this.collisionDirection[0] || this.collisionDirection[1]) {
                this.ballSpeedX = -this.ballSpeedX;
            }
            if (this.collisionDirection[2] || this.collisionDirection[3]) {
                this.ballSpeedY = -this.ballSpeedY;
            }
        }
        if ((!this.hasCollided() && this.x - this.radius <= 0) ||
            (!this.hasCollided() && this.x >= Canvas.WIDTH - this.radius)) {
            this.ballSpeedX = -this.ballSpeedX;
        }
        if ((!this.hasCollided() && this.y - this.radius <= 0) ||
            (!this.hasCollided() && this.y >= Canvas.HEIGHT - this.radius)) {
            this.ballSpeedY = -this.ballSpeedY;
        }
    }
}
//# sourceMappingURL=ball.js.map
class Ball {
    _x;
    _y;
    _radius;
    colour;
    ballSpeedX = 250;
    ballSpeedY = 250;
    objects = [
        new GameObject(70, 70, 50, 50, "green"),
        new GameObject(200, 250, 30, 30, "blue"),
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
        console.log(this.x, this.y);
    }
    ballMovement(d) {
        this.x += this.ballSpeedX * d;
        this.y += this.ballSpeedY * d;
        this.checkBallBoundaries();
    }
    hasCollided() {
        for (let object of this.objects) {
            if (this.x + this.radius >= object.x &&
                this.x - this.radius <= object.x + object.w &&
                this.y + this.radius >= object.y &&
                this.y - this.radius <= object.y + object.h) {
                return true;
            }
        }
        return false;
    }
    checkBallBoundaries() {
        // Check collision with objects first
        if (this.hasCollided()) {
            this.ballSpeedX = -this.ballSpeedX;
            this.ballSpeedY = -this.ballSpeedY;
            return;
        }
        // Check collision with boundaries
        if (this.x <= 0 || this.x >= Canvas.WIDTH - this.radius) {
            this.ballSpeedX = -this.ballSpeedX;
        }
        if (this.y <= 0 || this.y >= Canvas.HEIGHT - this.radius) {
            this.ballSpeedY = -this.ballSpeedY;
        }
    }
}
//# sourceMappingURL=ball.js.map
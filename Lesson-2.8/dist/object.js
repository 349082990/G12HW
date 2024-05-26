class GameObject {
    x;
    y;
    w;
    h;
    colour;
    constructor(x, y, w, h, colour) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.colour = colour;
    }
    draw() {
        console.log(this.x, this.w);
        Canvas.instance.context.fillStyle = this.colour;
        Canvas.instance.context.fillRect(this.x, this.y, this.w, this.h);
    }
}
class Hero extends GameObject {
    moveSpd = 1;
    moveRight() {
        this.x += this.moveSpd;
    }
    moveDown() {
        this.y += this.moveSpd;
    }
}
//# sourceMappingURL=object.js.map
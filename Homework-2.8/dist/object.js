class GameObject {
    _x;
    _y;
    _w;
    _h;
    _colour;
    constructor(_x, _y, _w, _h, _colour) {
        this._x = _x;
        this._y = _y;
        this._w = _w;
        this._h = _h;
        this._colour = _colour;
    }
    get x() {
        return this._x;
    }
    get y() {
        return this._y;
    }
    get w() {
        return this._w;
    }
    get h() {
        return this._h;
    }
    get colour() {
        return this._colour;
    }
    draw() {
        Canvas.instance.context.fillStyle = this.colour;
        Canvas.instance.context.fillRect(this.x, this.y, this.w, this.h);
    }
}
//# sourceMappingURL=object.js.map
class CanvasObject {
    x;
    y;
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    draw(context) { }
}
class Block extends CanvasObject {
    width;
    height;
    color;
    constructor(x, y, width, height, color) {
        super(x, y);
        this.width = width;
        this.height = height;
        this.color = color;
    }
    draw(context) {
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.width, this.height);
    }
    isOutOfCanvas(canvasWidth) {
        return this.x > canvasWidth;
    }
}
class Bullet extends CanvasObject {
    radius;
    speed;
    color;
    dx = 0;
    dy = 0;
    exists = true;
    constructor(x, y, radius, speed, color) {
        super(x, y);
        this.radius = radius;
        this.speed = speed;
        this.color = color;
        this.dy = -speed;
    }
    draw(context) {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        context.fillStyle = this.color;
        context.fill();
    }
    update(targetX, targetY) {
        if (!this.exists)
            return;
        const angle = Math.atan2(targetY - this.y, targetX - this.x); // find angle
        this.dx = Math.cos(angle) * this.speed;
        this.dy = Math.sin(angle) * this.speed;
        this.x += this.dx;
        this.y += this.dy;
    }
    blockCollision(block) {
        if (!this.exists)
            return false;
        const dx = block.x + block.width / 2 - this.x;
        const dy = block.y + block.height / 2 - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < block.width / 2 + this.radius) {
            this.exists = false;
            return true;
        }
        return false;
    }
}
class Turret extends Block {
    constructor(x, y) {
        super(x, y, 50, 50, `rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})`);
    }
}
class Game {
    canvas;
    context;
    turret;
    blocks = [];
    bullets = [];
    constructor() {
        this.canvas = document.getElementById("game_screen");
        this.context = this.canvas.getContext("2d");
        this.canvas.width = 600;
        this.canvas.height = 400;
        this.turret = new Turret(Math.random() * (this.canvas.width - 50), this.canvas.height - 50);
        this.spawnMovingBlocks();
        setInterval(() => this.updateGame(), 16); // 60 fps
        document.addEventListener("click", (event) => this.handleCanvasClick(event));
    }
    handleCanvasClick(event) {
        const bullet = new Bullet(this.turret.x + this.turret.width / 2, this.turret.y + this.turret.height / 2, 5, 5, "black");
        this.bullets.push(bullet);
    }
    spawnMovingBlocks() {
        setInterval(() => {
            if (this.blocks.length === 0 ||
                this.blocks[this.blocks.length - 1].isOutOfCanvas(this.canvas.width)) {
                this.blocks = this.blocks.filter((block) => !block.isOutOfCanvas(this.canvas.width));
                const block = new Block(-50, this.canvas.height / 2 - 25, 50, 50, `rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})`);
                this.blocks.push(block);
                this.bullets.forEach((bullet) => {
                    bullet.update(block.x + block.width / 2, block.y + block.height / 2);
                });
            }
        }, 1000);
    }
    updateGame() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.turret.draw(this.context);
        this.blocks.forEach((block) => {
            block.x += 1;
            block.draw(this.context);
        });
        this.bullets = this.bullets.filter((bullet) => {
            bullet.update(this.blocks[0].x + this.blocks[0]?.width / 2 || 0, this.blocks[0].y + this.blocks[0]?.height / 2 || 0);
            bullet.draw(this.context);
            const collided = this.blocks.some((block) => bullet.blockCollision(block));
            const inCanvas = bullet.x > 0 &&
                bullet.x < this.canvas.width &&
                bullet.y > 0 &&
                bullet.y < this.canvas.height;
            return !collided && inCanvas;
        });
    }
}
new Game();
//# sourceMappingURL=index.js.map
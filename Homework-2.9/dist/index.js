class CanvasObject {
    x;
    y;
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    draw(ctx) {
        // This method will be overridden by subclasses
    }
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
    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    isOutOfCanvas(canvasWidth) {
        return this.x > canvasWidth;
    }
}
class Bullet extends CanvasObject {
    radius;
    speed;
    dx;
    dy;
    color;
    active;
    constructor(x, y, radius, speed, color) {
        super(x, y);
        this.radius = radius;
        this.speed = speed;
        this.color = color;
        this.dx = 0;
        this.dy = -speed;
        this.active = true;
    }
    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
    update(targetX, targetY) {
        if (!this.active)
            return;
        const angle = Math.atan2(targetY - this.y, targetX - this.x);
        this.dx = Math.cos(angle) * this.speed;
        this.dy = Math.sin(angle) * this.speed;
        this.x += this.dx;
        this.y += this.dy;
    }
    collideWithBlock(block) {
        if (!this.active)
            return false;
        const dx = block.x + block.width / 2 - this.x;
        const dy = block.y + block.height / 2 - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < block.width / 2 + this.radius) {
            this.active = false;
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
    ctx;
    turret;
    blocks;
    bullets;
    constructor() {
        this.canvas = document.createElement("canvas");
        this.ctx = this.canvas.getContext("2d");
        this.canvas.width = 600;
        this.canvas.height = 400;
        document.body.appendChild(this.canvas);
        this.turret = new Turret(Math.random() * (this.canvas.width - 50), this.canvas.height - 50);
        this.blocks = [];
        this.bullets = [];
        this.spawnMovingBlocks();
        this.animate();
        document.addEventListener("click", (event) => {
            const bullet = new Bullet(this.turret.x + this.turret.width / 2, this.turret.y + this.turret.height / 2, 5, 5, "black");
            this.bullets.push(bullet);
        });
    }
    spawnMovingBlocks() {
        setInterval(() => {
            if (this.blocks.length === 0 ||
                this.blocks[this.blocks.length - 1].isOutOfCanvas(this.canvas.width)) {
                // Delete blocks exiting the canvas
                this.blocks = this.blocks.filter((block) => !block.isOutOfCanvas(this.canvas.width));
                const block = new Block(-50, this.canvas.height / 2 - 25, 50, 50, `rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})`);
                this.blocks.push(block);
                // Update target position for bullets
                this.bullets.forEach((bullet) => {
                    // Target the latest block entering the canvas
                    bullet.update(block.x + block.width / 2, block.y + block.height / 2);
                });
            }
        }, 1000);
    }
    animate() {
        requestAnimationFrame(() => this.animate());
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.turret.draw(this.ctx);
        this.blocks.forEach((block) => {
            block.x += 1;
            block.draw(this.ctx);
        });
        this.bullets.forEach((bullet, bulletIndex) => {
            bullet.update(this.blocks[0].x + this.blocks[0].width / 2, this.blocks[0].y + this.blocks[0].height / 2);
            bullet.draw(this.ctx);
            // Check collision with blocks
            this.blocks.forEach((block, blockIndex) => {
                if (bullet.collideWithBlock(block)) {
                    this.bullets.splice(bulletIndex, 1);
                }
            });
            // Remove bullet if out of canvas
            if (bullet.x < 0 ||
                bullet.x > this.canvas.width ||
                bullet.y < 0 ||
                bullet.y > this.canvas.height) {
                this.bullets.splice(bulletIndex, 1);
            }
        });
    }
}
new Game();
//# sourceMappingURL=index.js.map
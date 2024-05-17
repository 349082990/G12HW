const canvas = document.getElementById("game_screen") as HTMLCanvasElement;
canvas.width = 600;
canvas.height = 400;
const context = canvas.getContext("2d") as CanvasRenderingContext2D;
// context.fillStyle = "red";
// context.fillRect(0, 0, 100, 200);
// context.fillStyle = "rgb(100, 200, 300)";
// context.fillRect(200, 45, 50, 100);
// context.fillStyle = "#FFFFFF";
// context.fillRect(20, 20, 100, 100);

context.arc(100, 100, 50, 0, (1 / 2) * Math.PI);
context.fill();

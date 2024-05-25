const canvas = document.getElementById("game_screen") as HTMLCanvasElement;
canvas.width = 600;
canvas.height = 400;
const context = canvas.getContext("2d") as CanvasRenderingContext2D;

// ground
context.beginPath();
context.fillStyle = "green";
const GROUND_X = 0;
const GROUND_Y = canvas.height - canvas.height / 4;
const GROUND_W = canvas.width;
const GROUND_L = canvas.height / 4;
context.fillRect(GROUND_X, GROUND_Y, GROUND_W, GROUND_L);
context.closePath();

// house
context.beginPath();
context.fillStyle = "brown";
const HOUSE_W = 200;
const HOUSE_L = 200;
const HOUSE_X = canvas.width / 2 - HOUSE_W / 2;
const HOUSE_Y = canvas.height / 2 - HOUSE_L / 2;
context.fillRect(HOUSE_X, HOUSE_Y, HOUSE_W, HOUSE_L);
context.closePath();

// door
context.beginPath();
context.fillStyle = "black";
const DOOR_W = HOUSE_W / 4;
const DOOR_L = HOUSE_L / 2;
const DOOR_X = HOUSE_X + 50;
const DOOR_Y = GROUND_Y - DOOR_L;
context.fillRect(DOOR_X, DOOR_Y, DOOR_W, DOOR_L);
context.closePath();

// door knob
context.beginPath();
context.fillStyle = "white";
context.arc(DOOR_X + 10, DOOR_Y + DOOR_L / 2, 5, 0, 2 * Math.PI);
context.fill();
context.closePath();

// window1
context.beginPath();
context.fillStyle = "blue";
const WINDOW1_W = DOOR_W;
const WINDOW1_L = DOOR_L / 2;
const WINDOW1_X = DOOR_X - 20;
const WINDOW1_Y = DOOR_Y - 60;
context.fillRect(WINDOW1_X, WINDOW1_Y, WINDOW1_W, WINDOW1_L);
context.closePath();

// window 2
context.beginPath();
context.fillStyle = "blue";
const WINDOW2_W = WINDOW1_W;
const WINDOW2_L = WINDOW1_L;
const WINDOW2_X = DOOR_X + 60;
const WINDOW2_Y = WINDOW1_Y;
context.fillRect(WINDOW2_X, WINDOW2_Y, WINDOW2_W, WINDOW2_L);
context.closePath();

// roof
context.beginPath();
context.fillStyle = "black";
context.moveTo(HOUSE_X, HOUSE_Y);
context.lineTo(canvas.width / 2, HOUSE_Y - 50);
context.lineTo(HOUSE_X + HOUSE_W, HOUSE_Y);
context.lineTo(HOUSE_X, HOUSE_Y);
context.fill();
context.closePath;

// clouds
context.beginPath();
context.fillStyle = "blue";
context.scale(3.5, 1);
context.arc(25, 100, 25, 0, 2 * Math.PI);
context.fill();
context.closePath();

// cloud2
context.beginPath();
context.fillStyle = "blue";
context.arc(150, 100, 25, 0, 2 * Math.PI);
context.fill();
context.closePath();

//sun
context.beginPath();
context.fillStyle = "orange";
context.scale(2 / 7, 1);
context.arc(50, 40, 25, 0, 2 * Math.PI);
context.fill();
context.closePath();

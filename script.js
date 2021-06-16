const boardBorder = 'black';
const boardBackground = "whitesmoke";
const snakeColor = 'red';
const snakeBorder = 'yellow';


let snake = [ 
    {x: 200, y: 200}, 
    {x: 190, y: 200}, 
    {x: 180, y: 200}, 
    {x: 170, y: 200}, 
    {x: 160, y: 200}
]

let foodX;
let foodY;
// Horizontal velocity
let dx = 10
// Vertical Velocity
let dy = 0

// Get canvas element
const snakeboard = document.getElementById('gamecanvas');
// Return 2-d drawing context
const snakeboard_ctx = snakeboard.getContext('2d');


// Start game
main();
genFood();

let score = 0;

// Main function, runs game
function main(){

    if (hasGameEnded()){
        return;
    }  
    setTimeout(function onTick() {
    clearCanvas();
    drawFood();
    moveSnake();
    drawSnake();
    // call main again
    main();
    }, 100)
}

// Draw canvas border
function clearCanvas(){
    snakeboard_ctx.fillStyle = boardBackground;
    snakeboard_ctx.strokeStyle = boardBorder;
    snakeboard_ctx.fillRect(0, 0, snakeboard.width, snakeboard.height);
    snakeboard_ctx.strokeRect(0, 0, snakeboard.width, snakeboard.height);
}

// Draw one snake block
function drawSnakePart(snakePart){
    snakeboard_ctx.fillStyle = snakeColor;
    snakeboard_ctx.strokeStyle = snakeBorder;
    snakeboard_ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
    snakeboard_ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);    
}

// Draw snake
function drawSnake(){
    snake.forEach(drawSnakePart);
}

// Move snake 
function moveSnake(){
    const head = {
        x: snake[0].x + dx,
        y: snake[0].y + dy,
    }
    snake.unshift(head);
    const hasEaten = snake[0].x === foodX && snake[0].y === foodY;
    if (hasEaten) {
        score += 1;
        document.getElementById('score').innerHTML = score;
        genFood();
    } else {
    snake.pop();
    }
}

// Change direction with arrow keys
function changeDirection(event) {
    const LEFT_KEY = 37;
    const RIGHT_KEY = 39;
    const UP_KEY = 38;
    const DOWN_KEY = 40;

    const keyPressed = event.keyCode;
    const goingUp = dy === -10;
    const goingDown = dy === 10;
    const goingLeft = dx === -10;
    const goingRight = dx === 10;

    if (keyPressed === LEFT_KEY && !goingRight){
        dx = -10;
        dy = 0;
    } 
    if (keyPressed === UP_KEY && !goingDown){
        dx = 0;
        dy = -10;
    }
    if (keyPressed === RIGHT_KEY && !goingLeft){
        dx = 10;
        dy = 0;
    }
    if (keyPressed === DOWN_KEY && !goingUp){
        dx = 0;
        dy = 10;
    }
} 
document.addEventListener('keydown', changeDirection);

// Game over
function hasGameEnded(){
    for (let i = 4; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    const hitLeftWall = snake[0].x < 0;
    const hitRightWall = snake[0].x > snakeboard.width - 10;
    const hitTopWall = snake[0].y < 0;
    const hitBottomWall = snake[0].y > snakeboard.height - 10;
    return hitLeftWall || hitRightWall || hitTopWall || hitBottomWall; 
}   

// Make some food
function randomFood(min, max){
    return Math.round((Math.random() * (max - min) + min) / 10) * 10;
}
function genFood(){
    foodX = randomFood(0, snakeboard.width - 10);
    foodY = randomFood(0, snakeboard.height -10);
    snake.forEach(function hasEatenFood(part) {
        const hasEaten = part.x == foodX && part.y == foodY;
        if (hasEaten) {
            genFood();
        }
    });
}
// Draw some food
function drawFood() {
    snakeboard_ctx.fillStyle = 'lightgreen';
    snakeboard_ctx.strokeStyle = 'darkgreen';
    snakeboard_ctx.fillRect(foodX, foodY, 10, 10);
    snakeboard_ctx.strokeRect(foodX, foodY, 10, 10);
}

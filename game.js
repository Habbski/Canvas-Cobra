import Snake from './snake.js';
import Food from './food.js';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const resetBtn = document.getElementById('reset-button');
const finalScore = document.getElementById('final-score');
const pointsDisplay = document.getElementById('points-display');

const gridSize = 40;
const gridCount = 20;

let isGameover = false;

canvas.width = gridSize * gridCount;
canvas.height = gridSize * gridCount;

const snake = new Snake(ctx, gameOver);
const apple = new Food(ctx, canvas, snake);

function gameOver() {
  snake.velocity = 0;
  document.getElementById('gameover-display').style.display = 'block';
  finalScore.innerText = `Final score: ${snake.points}`;
  isGameover = true;
}

resetBtn.addEventListener('click', () => {
  snake.reset();
  apple.changePosition();
  document.getElementById('gameover-display').style.display = 'none';
  isGameover = false;
});

if (!isGameover) {
  function gameLoop(timestamp) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    snake.update(apple, timestamp);
    apple.update();
    pointsDisplay.innerText = `Score: ${snake.points}`;

    requestAnimationFrame(gameLoop);
  }
  gameLoop();
}

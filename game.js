import Snake from './snake.js';
import Food from './food.js';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const pointsDisplay = document.getElementById('points-display');
let points = 0;

const gridSize = 40;
const gridCount = 20;

canvas.width = gridSize * gridCount;
canvas.height = gridSize * gridCount;

const snake = new Snake(ctx, gameOver, { value: points});
const apple = new Food(ctx, canvas, snake);

function gameOver() {
  snake.velocity = 0;
  document.getElementById('reset-button').style.display = 'block';
}

document.getElementById('reset-button').addEventListener('click', () => {
  snake.reset();
});

let animationFrameId;

function gameLoop(timestamp) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  snake.update(apple, timestamp);
  apple.update();
  pointsDisplay.innerHTML = `Points ${snake.points.value}`;

  animationFrameId = requestAnimationFrame(gameLoop);
}
gameLoop();

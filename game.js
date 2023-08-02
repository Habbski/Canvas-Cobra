import Snake from './snake.js';
import Food from './food.js';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const gridSize = 40;
const gridCount = 20;

canvas.width = gridSize * gridCount;
canvas.height = gridSize * gridCount;

const snake = new Snake(ctx, gameOver);
const apple = new Food(ctx, canvas, snake);

function gameOver() {
  snake.velocity = 0;
  document.getElementById('reset-button').style.display = 'block';
}

document.getElementById('reset-button').addEventListener('click', () => {
  snake.reset();
});

function gameLoop(timestamp) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  snake.update(apple, timestamp); // Legg til timestamp her
  apple.update();

  requestAnimationFrame(gameLoop);
}
requestAnimationFrame(gameLoop);
import Snake from './snake.js';
import Food from './food.js';

const GAME_STATES = {
  START_SCREEN: 'startScreen',
  PLAYING: 'playing',
  GAME_OVER: 'gameOver',
};

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const resetBtn = document.getElementById('reset-button');
const finalScore = document.getElementById('final-score');
const pointsDisplay = document.getElementById('points-display');

const gridSize = 40;
const gridCount = 20;

canvas.width = gridSize * gridCount;
canvas.height = gridSize * gridCount;

const snake = new Snake(ctx, gameOver);
const apple = new Food(ctx, canvas, snake);

class GameStateManager {
  constructor() {
    this.currentState = GAME_STATES.START_SCREEN;
  }

  update() {
    switch (this.currentState) {
      case GAME_STATES.START_SCREEN:
        this.showStartScreen();
        break;
      case GAME_STATES.PLAYING:
        this.runGame();
        break;
      case GAME_STATES.GAME_OVER:
        this.showGameOver();
        break;
    }
  }

  showStartScreen() {
    document.getElementById('start-display').style.display = 'block';
  }

  runGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    snake.update(apple);
    apple.update();
    pointsDisplay.innerText = `Score: ${snake.points}`;
  }

  showGameOver() {
    snake.velocity = 0;
    document.getElementById('gameover-display').style.display = 'block';
    finalScore.innerText = `Final score: ${snake.points}`;
  }

  startGame() {
    document.getElementById('start-display').style.display = 'none';
    this.currentState = GAME_STATES.PLAYING;
  }

  gameOver() {
    this.currentState = GAME_STATES.GAME_OVER;
  }
}

const gameStateManager = new GameStateManager();

resetBtn.addEventListener('click', () => {
  snake.reset();
  apple.changePosition();
  document.getElementById('gameover-display').style.display = 'none';
  gameStateManager.startGame();
});

function gameOver() {
  gameStateManager.gameOver();
}

function gameLoop() {
  gameStateManager.update();
  requestAnimationFrame(gameLoop);
}
gameLoop();

const startButton = document.getElementById('start-button');
startButton.addEventListener('click', () => {
  gameStateManager.startGame();
});

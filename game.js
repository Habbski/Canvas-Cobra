import Snake from './snake.js';
import Food from './food.js';

const GAME_STATES = {
  START_SCREEN: 'startScreen',
  LEADERBOARD: 'leaderboard',
  PLAYING: 'playing',
  GAME_OVER: 'gameOver',
};

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const finalScore = document.getElementById('final-score');

const pointsDisplay = document.getElementById('points-display');
const startDisplay = document.getElementById('start-display');
const leaderBoardDisplay = document.getElementById('leaderboard-display');
const gameoverDisplay = document.getElementById('gameover-display');

const mainMenuBtn = document.getElementById('main-menu-button');
const startButton = document.getElementById('start-button');
const leaderBoardBtn = document.getElementById('leaderBoard-button');
const backToMenuBtn = document.getElementById('back-to-menu-button');
const resetBtn = document.getElementById('reset-button');

const gridSize = 40;
const gridCount = 20;

canvas.width = gridSize * gridCount;
canvas.height = gridSize * gridCount;

const background = new Image();
background.src = 'assets/grass-background.jpg';

function drawBackground() {
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
}

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
      case GAME_STATES.LEADERBOARD:
        this.leaderboardScreen();
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
    drawBackground();
    startDisplay.style.display = 'block';
    leaderBoardDisplay.style.display = 'none';
    gameoverDisplay.style.display = 'none';

    this.currentState = GAME_STATES.START_SCREEN;
  }

  leaderboardScreen() {
    leaderBoardDisplay.style.display = 'block';
    startDisplay.style.display = 'none';

    this.currentState = GAME_STATES.LEADERBOARD;
  }

  runGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBackground();
    snake.update(apple);
    apple.update();
    updateScore(snake.points);
  }

  showGameOver() {
    gameoverDisplay.style.display = 'block';
    finalScore.innerText = `Final score: ${snake.points}`;
  }

  startGame() {
    startDisplay.style.display = 'none';
    this.currentState = GAME_STATES.PLAYING;
  }

  gameOver() {
    this.currentState = GAME_STATES.GAME_OVER;
  }
}

const gameStateManager = new GameStateManager();

function gameOver() {
  gameStateManager.gameOver();
}

function updateScore(score) {
  pointsDisplay.innerText = `${score}`;
}

function gameLoop() {
  gameStateManager.update();
  requestAnimationFrame(gameLoop);
}
background.onload = gameLoop();

startButton.addEventListener('click', () => {
  gameStateManager.startGame();
});

leaderBoardBtn.addEventListener('click', () => {
  gameStateManager.leaderboardScreen();
  console.log('Click');
});

mainMenuBtn.addEventListener('click', () => {
  gameStateManager.showStartScreen();
  snake.reset();
  apple.changePosition();
});

backToMenuBtn.addEventListener('click', () => {
  gameStateManager.showStartScreen();
});

resetBtn.addEventListener('click', () => {
  snake.reset();
  apple.changePosition();
  gameoverDisplay.style.display = 'none';
  gameStateManager.startGame();
});

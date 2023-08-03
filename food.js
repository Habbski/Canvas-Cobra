class Food {
    constructor(ctx, canvas, snake) {
      this.ctx = ctx;
      this.canvas = canvas;
      this.snake = snake;
      this.width = 40;
      this.height = 40;

      this.appleImg = new Image();
      this.appleImg.src = 'assets/apple.png';

      this.changePosition();
  
      setInterval(() => {
        this.changePosition();
      }, 5000);
    }
  
    #draw() {
      this.ctx.drawImage(this.appleImg, this.x, this.y, this.width, this.height);
    }
  
    update() {
      this.#draw();
    }
  
    getRandomPosition() {
      const rows = this.canvas.height / this.height;
      const cols = this.canvas.width / this.width;
      const x = Math.floor(Math.random() * cols) * this.width;
      const y = Math.floor(Math.random() * rows) * this.height;
      return { x, y };
    }
  
    isValidPosition(x, y) {
      return !this.snake.body.some(
        (segment) => segment.x === x && segment.y === y
      );
    }
  
    changePosition() {
      let newPosition;
      do {
        newPosition = this.getRandomPosition();
      } while (!this.isValidPosition(newPosition.x, newPosition.y));
      this.x = newPosition.x;
      this.y = newPosition.y;
    }
  }
  
  export default Food;
  
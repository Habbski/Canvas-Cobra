class Food {
    constructor(ctx, canvas, snake) {
      this.ctx = ctx;
      this.canvas = canvas;
      this.snake = snake;
      this.width = 40;
      this.height = 40;
      this.changePosition();
  
      setInterval(() => {
        this.changePosition();
      }, 100000);
    }
  
    #draw() {
      this.ctx.beginPath();
      this.ctx.fillStyle = 'red';
      this.ctx.fillRect(this.x, this.y, this.width, this.height);
      this.ctx.closePath();
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
  
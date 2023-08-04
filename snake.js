class Snake {
  constructor(ctx, gameOver) {
    this.ctx = ctx;
    this.body = [{ x: 400, y: 400 }];
    this.width = 40;
    this.height = 40;
    this.velocity = 2;
    this.growthSegments = 0;
    this.gameOver = gameOver;
    this.points = 0;
    this.controller();
    this.direction = 'RIGHT';
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.fillStyle = 'black';
    this.body.forEach((segment) => {
      this.ctx.fillRect(segment.x, segment.y, this.width, this.height);
    });
    this.ctx.closePath();
  }

  update(food) {
    this.draw();

    const head = { ...this.body[0] };

    switch (this.direction) {
      case 'UP':
        head.y -= this.velocity;
        break;
      case 'DOWN':
        head.y += this.velocity;
        break;
      case 'LEFT':
        head.x -= this.velocity;
        break;
      case 'RIGHT':
        head.x += this.velocity;
        break;
    }

    this.boundaries(head);
    this.collision(food, head);
    this.growthHandling(head);
  }

  collision(food, head) {
    const SEGMENT_SIZE = 6;

    // Collision with food
    if (
      head.x < food.x + food.width &&
      head.x + this.width > food.x &&
      head.y < food.y + food.height &&
      head.y + this.height > food.y
    ) {
      this.growthSegments += SEGMENT_SIZE;
      this.points += 10;
      food.changePosition();
      food.resetInterval();
    }

    // Collision with snake body
    this.body.slice(1).forEach((segment) => {
      if (head.x === segment.x && head.y === segment.y) {
        this.gameOver();
      }
    });
  }

  growthHandling(head) {
    if (this.growthSegments > 0) {
      this.body.unshift(head);
      this.growthSegments--;
    } else {
      this.body.unshift(head);
      this.body.pop();
    }
  }

  controller() {
    addEventListener('keydown', (event) => {
      switch (event.key) {
        case 'ArrowUp':
          if (this.direction !== 'DOWN') this.direction = 'UP';
          break;
        case 'ArrowDown':
          if (this.direction !== 'UP') this.direction = 'DOWN';
          break;
        case 'ArrowLeft':
          if (this.direction !== 'RIGHT') this.direction = 'LEFT';
          break;
        case 'ArrowRight':
          if (this.direction !== 'LEFT') this.direction = 'RIGHT';
          break;
      }
    });
  }

  boundaries(head) {
    if (head.x + this.width > 40 * 20 || head.x < 0 || head.y + this.height > 40 * 20 || head.y < 0)
      this.gameOver();
  }

  reset() {
    this.body = [{ x: 400, y: 400 }];
    this.velocity = 2;
    this.growthSegments = 0;
    this.direction = 'RIGHT';
    this.points = 0;
  }
}

export default Snake;

class Snake {
  constructor(ctx, gameOver) {
    this.ctx = ctx;
    this.gameOver = gameOver;
    this.body = [{ x: 400, y: 400 }];
    this.width = 40;
    this.height = 40;
    this.velocity = 40;
    this.growthSegments = 0;
    this.maxFrequencySpeed = 50;

    this.controller();
    this.direction = 'RIGHT';

    this.lastUpdate = 0;
    this.updateFrequency = 200;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.fillStyle = 'black';
    this.body.forEach((segment) => {
      this.ctx.fillRect(segment.x, segment.y, this.width, this.height);
    });
    this.ctx.closePath();
  }

  update(food, timestamp) {
    this.draw();
    if (timestamp - this.lastUpdate < this.updateFrequency) return;
    this.lastUpdate = timestamp;

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

    this.x = head.x;
    this.y = head.y;

    this.boundaries(head);
    this.collision(food, head);
    this.growthHandling(head);
  }

  collision(food, head) {
    const SEGMENT_SIZE = 1;

    // Collision with food
    if (
      head.x < food.x + food.width &&
      head.x + this.width > food.x &&
      head.y < food.y + food.height &&
      head.y + this.height > food.y
    ) {
      this.growthSegments = SEGMENT_SIZE;
      food.changePosition();
      if (this.updateFrequency > this.maxFrequencySpeed) {
        this.updateFrequency -= 5;
      } else {
        this.updateFrequency = this.maxFrequencySpeed;
      }
    }

    // Collision with snake body
    this.body.forEach((segment, index) => {
      if (index === 0) return; // Dont check the head

      if (
        head.x < segment.x + this.width &&
        head.x + this.width > segment.x &&
        head.y < segment.y + this.height &&
        head.y + this.height > segment.y
      ) {
        this.gameOver();
      }
    });
  }

  growthHandling(head) {
    this.body.unshift(head);

    if (this.growthSegments > 0) {
      this.growthSegments--;
    } else {
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
    if (head.x > 40 * 20 || head.x < 0 || head.y > 40 * 20 || head.y < 0)
      this.gameOver();
  }

  reset() {
    this.body = [{ x: 400, y: 400 }];
    this.velocity = 40;
    this.growthSegments = 0;
    this.direction = 'RIGHT';

    document.getElementById('reset-button').style.display = 'none';
  }
}

export default Snake;

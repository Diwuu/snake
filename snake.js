let snake;
let size = 20;
let food;
let lastKey = 'd'

function setup() {
  createCanvas(size * 30, size * 30);
  snake = new Snake();
  frameRate(10);
  pickLocation();
}

function pickLocation() {
  let cols = floor(width / size);
  let rows = floor(height / size);
  food = createVector(floor(random(cols)), floor(random(rows)));
  food.mult(size);
}


function draw() {
  background(0);
  if (snake.eat(food)) {
    pickLocation();
  }
  snake.death();
  snake.update();
  snake.show();
  fill(255, 0, 100);
  rect(food.x, food.y, size, size);
}

function keyPressed() {
  if ((key === 'w' || keyCode === UP_ARROW) && lastKey!='s') {
    snake.dir(0, -1);
	lastKey = 'w';
  } else if ((key === 's' || keyCode === DOWN_ARROW) && lastKey!='w') {
    snake.dir(0, 1);
	lastKey = 's';
  } else if ((key === 'd' || keyCode === RIGHT_ARROW) && lastKey!='a') {
    snake.dir(1, 0);
	lastKey = 'd';
  } else if ((key === 'a' || keyCode === LEFT_ARROW) && lastKey!='d') {
    snake.dir(-1, 0);
	lastKey = 'a';
  }
}

function Snake() {
  this.x = 200;
  this.y = 300;
  this.xspeed = 1;
  this.yspeed = 0;
  this.total = 0;
  this.tail = [];

  this.eat = function(pos) {
    let d = dist(this.x, this.y, pos.x, pos.y);
    if (d < 1) {
      this.total++;
      return true;
    } else {
      return false;
    }
  };

  this.dir = function(x, y) {
    this.xspeed = x;
    this.yspeed = y;
  };

  this.death = function() {
    for (let i = 0; i < this.tail.length; i++) {
      let pos = this.tail[i];
      let d = dist(this.x, this.y, pos.x, pos.y);
      if (d < 1) {
        console.log('starting over');
        this.total = 0;
        this.tail = [];
      }
    }
  };

  this.update = function() {
    for (let i = 0; i < this.tail.length - 1; i++) {
      this.tail[i] = this.tail[i + 1];
    }
    if (this.total >= 1) {
      this.tail[this.total - 1] = createVector(this.x, this.y);
    }

    this.x = this.x + this.xspeed * size;
    this.y = this.y + this.yspeed * size;

    this.x = constrain(this.x, 0, width - size);
    this.y = constrain(this.y, 0, height - size);
  };

  this.show = function() {
    fill(0, 255, 0);
    for (let i = 0; i < this.tail.length; i++) {
      rect(this.tail[i].x, this.tail[i].y, size, size);
    }
    rect(this.x, this.y, size, size);
  };

}
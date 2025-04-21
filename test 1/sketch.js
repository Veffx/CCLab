let confettis = [];
let numConfetti = 100;
let backgroundHUE;
let groundLevels = [];

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");
  colorMode(HSB);
  backgroundHUE = random(0, 255);
  for (let i = 0; i < width; i++) {
    groundLevels[i] = height; // 初始地面是
  }
}

function draw() {
  background(backgroundHUE, 10, 190);

  for (let i = 0; i < 5; i++) {
    confettis.push(new Confetti(width / 2, height / 2));
  }

  for (let confetti of confettis) {
    confetti.update();
    confetti.display();
  }

  confettis = confettis.filter(c => !c.offScreen); // 移除太远的

  text(confettis.length, 20, 20);
}

function mousePressed() {
  for (let i = 0; i < numConfetti; i++) {
    confettis.push(new Confetti(mouseX, mouseY));
  }
}

class Confetti {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    this.size = random(5, 10);
    this.confettiHue = random(255);
    this.speedX = random(-2, 2);
    this.speedY = random(-1, -3);
    this.gravity = 0.2;
    this.bounceDamping = 0.6;
    this.onCanvas = true;
    this.isResting = false;
    this.offScreen = false;
  }

  update() {
    if (this.isResting) return;

    this.x += this.speedX;
    this.y += this.speedY;
    this.speedY += this.gravity;
    this.speedX *= 0.99;

    let bottomY = this.y + this.size * 0.8;
    let groundY = this.getGroundLevelAt(this.x);

    if (bottomY >= groundY) {
      // 反弹
      this.y = groundY - this.size * 0.8;
      this.speedY *= -this.bounceDamping;

      // 如果速度太小，认为落地堆积
      if (abs(this.speedY) < 1) {
        this.isResting = true;
        this.y = groundY - this.size * 0.8;
        this.updateGroundLevel();
      }
    }

    if (this.y > height + 100) {
      this.offScreen = true;
    }
  }

  getGroundLevelAt(x) {
    let xi = constrain(floor(x), 0, width - 1);
    return groundLevels[xi];
  }

  updateGroundLevel() {
    // 增加当前位置附近的地面高度
    for (let dx = -this.size / 2; dx <= this.size / 2; dx++) {
      let xi = constrain(floor(this.x + dx), 0, width - 1);
      groundLevels[xi] -= this.size * 0.5;
    }
  }

  display() {
    push();
    translate(this.x, this.y);
    fill(this.confettiHue, 255, 255);
    noStroke();
    this.drawSkull(0, 0, this.size);
    pop();
  }

  drawSkull(x, y, size) {
    let eyeSize = size * 0.2;
    let noseSize = size * 0.1;
    let jawHeight = size * 0.3;
    let toothWidth = size * 0.05;
    let toothHeight = jawHeight * 0.6;

    noStroke();
    ellipse(x, y - jawHeight / 2, size, size); // Skull
    rectMode(CENTER);
    rect(x, y + jawHeight * 0.8, size * 0.6, jawHeight, 20); // Jaw

    fill(0);
    ellipse(x - size * 0.25, y - size * 0.2, eyeSize, eyeSize);
    ellipse(x + size * 0.25, y - size * 0.2, eyeSize, eyeSize);

    triangle(
      x - noseSize * 0.5, y,
      x + noseSize * 0.5, y,
      x, y + noseSize
    );

    stroke(0);
    strokeWeight(2);
    for (let i = -2; i <= 2; i++) {
      let tx = x + i * toothWidth;
      line(tx, y + jawHeight * 0.4, tx, y + jawHeight * 0.4 + toothHeight);
    }
  }
  
}


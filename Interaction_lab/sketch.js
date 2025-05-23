let w = [];
let timer = 0;
let ac = 0;
let player_input = "";
let game = true;
let begin = false;
let con = true;
let end = false;
let beep;

function preload() {
  beep = loadSound('assets/sound/beep.mp3'); // 确保路径正确
}

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");
  textAlign(CENTER, CENTER);
  textSize(24);
}

function draw() {
  background(0);

  if (!begin) {
    fill(255);
    text("Press R to escape depression by working.", width / 2, height / 2);
    return;
  }

  textAlign(LEFT, TOP);
  textSize(18);
  fill(255);
  text(player_input, width - 100, height - 20);

  text(con ? "✅" : "❌", 20, 20);

  if (game) {
    timer++;

    // 每100帧添加一个 work,work
    if (timer % 100 === 0) {
      w.push(new Work());
    }

    for (let i = w.length - 1; i >= 0; i--) {
      w[i].update();
      w[i].display();
      w[i].gameOver(i);

      if (player_input === "work,work") {
        w.splice(i, 1);
        player_input = "";
      }
    }
  } else {
    textSize(32);
    fill(255);
    text("EMO\nPress R to restart", width / 2, height / 2);
    w.splice(0, w.length);
  }
}

class Work {
  constructor() {
    this.x = width / 2;
    this.y = height;
    this.textsize = 36;
    this.speed = 1;
    this.acc = 0.000001 * timer;
    this.lastBeepTime = 0;
  }

  update() {
    this.y -= this.speed;
    this.speed += this.acc;

    // 计算当前距离顶部的接近程度
    let proximity = map(this.y, height, 0, 0.05, 1); // 越靠上值越大
    let interval = int(60 / proximity); // 越靠上间隔越小

    if (frameCount - this.lastBeepTime >= interval) {
      if (beep.isLoaded()) {
        beep.play();
        this.lastBeepTime = frameCount;
      }
    }
  }

  display() {
    fill(255, 0, 0);
    textSize(this.textsize);
    text("I am okay", this.x, this.y);
  }

  gameOver(index) {
    if (this.y <= 0) {
      game = false;
    }
  }
}

function keyTyped() {
  player_input += key;
  let target = "I am okay";
  if (!target.startsWith(player_input)) {
    player_input = player_input.slice(0, -1);
    con = false;
  } else {
    con = true;
  }
}

function keyPressed() {
  if (key === "r" || key === "R") {
    begin = true;
    game = true;
    w = [];
    timer = 0;
    player_input = "";
    con = true;
  }
}

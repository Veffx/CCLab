let w = [];
let timer = 0;
let player_input = "";
let game = true;
let begin = false;
let con = true;
let end = false;
let score = 5000;
let inCommunication = false;
let showPhone = false;
let phoneInput = "";
let inputActive = false;
let bgm, beep, commMusic, endMusic;
let endMusicPlayed = false;

function preload() {
  beep = loadSound('assets/sound/beep.mp3');
  bgm = loadSound('assets/sound/bgm.mp3');
  commMusic = loadSound('assets/sound/comm.mp3');
  endMusic = loadSound('assets/sound/end.mp3');
}

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");
  textAlign(CENTER, CENTER);
  textSize(24);
}

function draw() {
  background(0);

  if (inCommunication) {
    if (!commMusic.isPlaying()) {
      bgm.stop();
      endMusic.stop();
      commMusic.loop();
    }
    fill(255);
    textSize(20);
    text("Don't keep everything to yourself.\nTalk to us — we're always here for you.", width / 2, height / 2);
    return;
  }

  if (!begin) {
    fill(255);
    text("Press R to escape depression by working.", width / 2, height / 2);
    return;
  }

  fill(255, 215, 0);
  textAlign(LEFT, TOP);
  textSize(18);
  text("$" + score, 20, 20);

  if (showPhone) {
    drawPhoneInterface();
    return;
  }

  if (game) {
    if (!bgm.isPlaying()) {
      commMusic.stop();
      endMusic.stop();
      bgm.loop();
    }

    timer++;

    // 每30帧生成一次新的 work,work（约每0.5秒）
    if (timer % 30 === 0) {
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
    if (!endMusicPlayed) {
      bgm.stop();
      commMusic.stop();
      endMusic.loop();
      endMusicPlayed = true;
    }
    fill(255);
    textSize(32);
    text("You Are Broke! qwq\nWant another job? Press R", width / 2, height / 2);
  }

  fill(255);
  textSize(18);
  textAlign(RIGHT, BOTTOM);
  text(player_input, width - 20, height - 20);

  textAlign(LEFT, TOP);
  if (con) {
    text("✅", 60, 20);
  } else {
    text("❌", 60, 20);
  }
}

function keyTyped() {
  if (inputActive) {
    if (key === '\n') return;
    phoneInput += key;
    if (phoneInput === "133xxx333") {
      inCommunication = true;
      inputActive = false;
      showPhone = false;
    }
    return;
  }

  player_input += key;
  let target = "work,work";
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
    score = 5000;
    w = [];
    timer = 0;
    inCommunication = false;
    showPhone = true;
    phoneInput = "";
    inputActive = false;
    endMusic.stop();
    endMusicPlayed = false;
    bgm.loop();
  }
}

function mousePressed() {
  if (showPhone && mouseX > width / 2 - 40 && mouseX < width / 2 + 40 &&
      mouseY > height / 2 + 40 && mouseY < height / 2 + 80) {
    inputActive = true;
  }
}

function drawPhoneInterface() {
  fill(50);
  rect(width / 2 - 100, height / 2 - 150, 200, 300, 20);
  fill(255);
  text("Friend's number:", width / 2, height / 2 - 60);
  textSize(18);
  text(phoneInput || "click to input", width / 2, height / 2);
  fill(200);
  rect(width / 2 - 40, height / 2 + 40, 80, 40, 10);
  fill(0);
  text("Input", width / 2, height / 2 + 60);
}

class Work {
  constructor() {
    this.x = width / 2;
    this.y = height;
    this.textsize = 36;
    this.speed = 1;
    this.acc = 0.000001 * timer;
  }

  update() {
    this.y -= this.speed;
    this.speed += this.acc;
  }

  display() {
    fill(255, 0, 0);
    textSize(this.textsize);
    text("work,work", this.x, this.y);
  }

  gameOver(index) {
    if (this.y <= 0) {
      score -= 1000;
      w.splice(index, 1);
      if (score <= 0) {
        game = false;
      }
    }
  }
}

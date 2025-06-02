let w = [];
let timer = 0;
let ac = 0;
let player_input = "";
let game = true;
let begin = false;
let con = true;
let end = false;
let beep;
let communicationMode =false;
let myPhone;

function preload() {
  beep = loadSound('assets/sound/beep.mp3'); // 确保路径正确
  bgm = loadSound('assets/sound/bgm.mp3');
  comm =loadSound('assets/sound/comm.mp3');
  end=loadSound('assets/sound/end.mp3');
  //begin=loadSound('assets/sound/begin.mp3');
}

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");
  textAlign(CENTER, CENTER);
  textSize(24);
  myPhone = new Phone(width / 2-250, height / 2, 120, 200); 
}

function draw() {
  background(0);
  if (communicationMode) {
    if (!comm.isPlaying()) {
      bgm.stop();
      end.stop();
      comm.loop();
    }

    fill(255);
    textAlign(CENTER, CENTER);
    textSize(32);
    text("Don't keep everything to yourself.\nTalk to us — we're always here for you.", width / 2, height / 2);
    return;
  }


  if (!begin) {
    fill(255);
    text("Ready for your LONELY life?\n Press R to wake up.", width / 2, height / 2);
    if (!bgm.isPlaying()) {
      bgm.play(); // 只播放一次
    }
    return;
  }
  
    if (comm.isPlaying()) {
      comm.stop();
    }



  textAlign(CENTER, CENTER);
  textSize(18);
  fill(255);
  text(player_input, width - 100, height - 20);

  if (con) {
    text("✅", 20, 20);
  } else {
    text("❌", 20, 20);
  }
  

  if (game) {
    timer++;
    myPhone.display();
    // 每100帧添加一个 work,work
    if (timer % 100 === 0) {
      w.push(new Work());
    }

    for (let i = w.length - 1; i >= 0; i--) {
      w[i].update();
      w[i].display();
      w[i].gameOver(i);

      if (player_input === "i am okay") {
        w.splice(0, 1);
        player_input = "";
      }
    }
  } else {
    textAlign(CENTER,CENTER);
    textSize(32);
    fill(255);
    text("A terrible day.\n Maybe tommorrow will be better.\nPress R for another day.", width / 2, height / 2);
    w.splice(0, w.length);
    if (!end.isPlaying()) {
      bgm.stop();
      comm.stop();
      end.loop();
    }
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
    let proximity = map(this.y, height, 0, 0.05, 4); // 越靠上值越大
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
    textAlign(CENTER,CENTER);
    textSize(this.textsize);
    text("i am okay", this.x, this.y);
  }

  gameOver(index) {
    if (this.y <= 0) {
      game = false;
    }
  }
}

function keyTyped() {
  player_input += key;
  let target = "i am okay";
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
class Phone {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.screenMargin = 20;
    this.buttonHeight = 40;
  }
  isButtonClicked(mx, my) {
    let buttonX = this.x;
    let buttonY = this.y + this.h / 2 - this.buttonHeight / 2 - this.screenMargin;
    let buttonW = this.w / 2;
    let buttonH = this.buttonHeight;
  
    let left = buttonX - buttonW / 2;
    let right = buttonX + buttonW / 2;
    let top = buttonY - buttonH / 2;
    let bottom = buttonY + buttonH / 2;
  
    if (mx > left && mx < right && my > top && my < bottom) {
      return true;
    } else {
      return false;
    }
  }
  display() {
    // 手机外壳
    fill(50);
    rectMode(CENTER);
    rect(this.x, this.y, this.w, this.h, 20);

    // 屏幕
    fill(255);
    let screenTop = this.y - this.h / 2 + this.screenMargin;
    let screenHeight = this.h - this.screenMargin * 2 - this.buttonHeight;
    rect(this.x, screenTop + screenHeight / 2, this.w - this.screenMargin * 2, screenHeight, 10);

    // 屏幕上的文字
    fill(0);
    textSize(16);
    text("friend", this.x, screenTop + screenHeight / 2);

    // 绿色按钮
    fill(0, 255, 0);
    rect(this.x, this.y + this.h / 2 - this.buttonHeight / 2 - this.screenMargin, this.w / 2, this.buttonHeight, 10);
  }
}
function mousePressed() {
  if (myPhone.isButtonClicked(mouseX, mouseY)) {
    communicationMode = true;
    begin = false;
    game = false;
    player_input = "";
  }
}



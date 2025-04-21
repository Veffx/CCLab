let bghue;
let instruments = [];
let beep;
let interacted = false;
function preload(){
  beep = loadSound("assets/sounds/beat.mp3")
}
function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");
  colorMode(HSB);

  bghue = random(255);


  let a = new Instrument(200, 200);
  instruments.push(a)
}

function draw() {
  background(bghue, 180, 30);
if(interacted == true){
  for(let i = 0; i < instruments.length; i++){
    instruments[i].update();
    instruments[i].display();
  }}
}
function mousePressed(){
  interacted=true;
  let a =new Instrument(mouseX,mouseY);
  instruments.push(a);
}


class Instrument{
  constructor(startX, startY){
    this.x = startX;
    this.y = startY;

    this.possibleSize = [10, 30, 50, 70, 90];
    this.size  = random(this.possibleSize);

    this.speedX = random(-4, 4);
    this.speedY = random(-4, 4);
    this.myRate = map(this.size,10,90,5,0.1);
    this.myHue = random(0, 50);
  }
  update(){
    this.x += this.speedX;
    this.y += this.speedY;

    if(this.x < this.size/2 || this.x > width+this.size/2){
      this.speedX = -this.speedX;
      beep.rate(this.myRate)
      beep.play();
    }
    if(this.y < this.size/2 || this.y > height+this.size/2){
      this.speedY = -this.speedY;
      beep.play(this.myRate);
    }
  }
  display(){
    push();
    translate(this.x, this.y);
    noStroke();
    fill(this.myHue, 255, 255);

    circle(0, 0, this.size);

    pop();
  }

}
  

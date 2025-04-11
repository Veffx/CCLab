let confettis = [];
let numConfetti = 100;
let backgroundHUE;
function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");
  // HUE SATURATION BRIGHTNESS
  colorMode(HSB);
  backgroundHUE= random(0,255)
}

function draw() {
  background(backgroundHUE,10,190);
 for(let i= 0; i<5;i++){
  confettis.push(new Confetti(width/2,height/2))
 }

  for(let i = 0; i < confettis.length; i++){
    confettis[i].update();
    confettis[i].display();
  }
  while(confettis.length>500){
    confettis.splice(0,1);
  }
text(confettis.length,20,20)
}
function mousePressed(){
  for(let i = 0; i < numConfetti; i++){
    confettis.push(new Confetti(mouseX, mouseY))
}}
class Confetti{
  constructor(startX, startY){
    this.x = startX;
    this.y = startY;
    this.size = random(2, 10);
    this.confettiHue =random(255);
    this.speedX = random(-2, 2);
    this.speedY = random(-1, -3);
    this.onCanvas =true;   
  }
  update(){
    this.x+=this.speedX;
    this.y+=this.speedY;
    this.speedY +=0.1;
    this.speedX *= 0.99;
  }
  checkOutOfCanvas(){
    if(this.y >height+100){
      this.onCanvas=false;
    }
  }
  display(){    
    push();
    translate(this.x, this.y);

      fill(this.confettiHue, 255,255);
      noStroke();
      circle(0, 0, this.size);
   
    pop();
  }

}
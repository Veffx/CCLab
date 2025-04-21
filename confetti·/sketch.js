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
      this.drawSkull(0, 0, this.size);
   
    pop();
  }
  drawSkull(x, y, size) {
    let eyeSize = size * 0.2;
    let noseSize = size * 0.1;
    let jawHeight = size * 0.3;
    let toothWidth = size * 0.05;
    let toothHeight = jawHeight * 0.6;
  
    // Skull outline
    noStroke();
    ellipse(x, y - jawHeight / 2, size, size); // Main skull
  
    rectMode(CENTER);
    rect(x, y + jawHeight * 0.8, size * 0.6, jawHeight, 20); // Jaw
  
    // Eyes
    fill(0);
    ellipse(x - size * 0.25, y - size * 0.2, eyeSize, eyeSize);
    ellipse(x + size * 0.25, y - size * 0.2, eyeSize, eyeSize);
  
    // Nose
    triangle(
      x - noseSize * 0.5, y,
      x + noseSize * 0.5, y,
      x, y + noseSize
    );
  
    // Teeth (simple vertical lines)
    stroke(0);
    strokeWeight(2);
    for (let i = -2; i <= 2; i++) {
      let tx = x + i * toothWidth;
      line(tx, y + jawHeight * 0.4, tx, y + jawHeight * 0.4 + toothHeight);
    }
  }

}
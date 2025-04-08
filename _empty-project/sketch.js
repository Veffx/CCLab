let egg1;
let egg2;
function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");
  for(leti=0;i<100;i++){
    let egg =new Egg(random(0,width),random(0,height));
    basket.push(egg)
}}

function draw() {
  background(220);
 for(let i=0; i<basket.length; i++){
  basket[i].update();
  basket[i].diaplay();
 }
}
class Egg{
  constructor(startX){
    this.x=startX;
    this.y=200;
    this.radius =50;
    this.speedx = 1;
    this.speedy = 1;
    this.diaX=80;
    this.diaY=130;
    }
    update(){
      this.x+=this.speedx;
      this.y+=this.speedy;
      if(this.x<0||this.x>width){
        this.speedx= -this.speedx;
      }
      if(this.y<0||this.y>height){
        this.speedy= -this.speedy;
      }
    }
  dispaly(){
    push();
    translate(this.x,this.y);
    noStroke();
    fill(255,200);
    ellipse(0,0, this.diaX, this.diaY)
    arc(0,0, this.diaX, this.diaX,0,PI)
    pop();
  }
  
}
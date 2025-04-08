let egg1;
let egg2;
function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");
  egg1 =new Egg(100);
  egg2 =new Egg(200);
}

function draw() {
  background(220);
  egg1.update()
  egg1.dispaly()
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
let egg1;

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");
}

function draw() {
  background(10,210,230);
  egg1.update()
  egg1.dispaly()
}
class Egg{
  constructor(){
    this.x=200;
    this.y=200;
    this.radius =50;
    this.speedx = 1;
    this.speedy = 1;
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
    circle(0,0,this.radius);
    pop();
  }
  
}
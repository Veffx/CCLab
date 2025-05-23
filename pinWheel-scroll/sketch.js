function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");
  p = new PinWheel(width/2,height/2);
  }

function draw() {
  background(0,220,0);
//how much have we scroll
let alreadyScrolled = document.getElementById("scrolllContainer").scrollTop;
let entireScrollSpace =document.getElementById("scrollBox").scrollHeight-height;
let scrollPercentage = alreadyScrolled/entireScrollSpace;
fill(0);
textSize(20)
text(scrollPercentage,20,20);


  p.update();
  p.display();

 }
class PinWheel{
  constructor(startX,startY){
    this.x =startX;
    this.y = startY;
    this.angle =0;
    this.scaleFactor=1;
    this.radius =100;
  }
  update(){

  }
  display(){
    push();
    translate(this.x,this.y);
    strokeWeight(5)
    line(0,0,0,this.radius*2)
    noStroke();
    push();
    translate(0,0);
    for(let i = 0;i<4;i++){
      rotate(radians(360/4));
      this.drawSingleWing()
    }
    pop();
    fill("red");
    circle(0,0,5);
    pop();

  }
  drawSingleWing(){
     //small triangle;
     fill(30,90,100);
     triangle(0,0,0,-this.radius/2,this.radius/2,-this.radius/2);
     //big triangle;
     fill(220,150,30)
     triangle(0,0,this.radius/2,-this.radius/2,this.radius,0)
  }
}

  

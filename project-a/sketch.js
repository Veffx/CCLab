/*
Template for IMA's Creative Coding Lab 

Project A: Generative Creatures
CCLaboratories Biodiversity Atlas 
*/

let angle=0;
let x =200;
let y =200;
let l =0.019;
let liveliness = 0;
function setup() {
  let canvas = createCanvas(400, 400);
canvas.id("p5-canvas")
canvas.parent("p5-canvas-container")
  angleMode(DEGREES);
}

function draw() {
  background(0,0,225,100);
  liveliness+=sin(frameCount*l)
  push();
  translate(200,200);
  goalx=150*(1-2*noise(frameCount*l));
  goaly=150*(1-2*noise(1000+frameCount*l));
  for(let o=0;o<100;o++){
  x=lerp(x,goalx,0.02);
  y=lerp(y,goaly,0.02);}
  //noStroke()
  drawTentacles(x,y,25,10);
   fill(0,150+90*sin(frameCount),170+90*cos(frameCount))
  circle(x,y,50*sin(frameCount));
  pop();
  
}
function drawTentacleright(xpos,ypos,size,t,k){
  
  for(i=0;i<36;i++){
    push();
    translate(xpos,ypos);
    //stroke(angle);
    rotate(k);
      let x=40*(i/24)*cos(angle+t*i);
      let y2=40*(i/24)*sin(angle+t*i);
      fill(0,255,i/24*155)
      circle(x,y2,size-i*1.01);
    pop();
  }angle=90*sin(frameCount)}
  
function drawTentacleleft(xpos,ypos,size,t,k){
  
  for(i=0;i<36;i++){
    push();
    translate(xpos,ypos);
    //stroke(angle);
    rotate(k);
      let x=40*(i/24)*-cos(angle+t*i);
      let y2=40*(i/24)*sin(angle+t*i);
      fill(0,255,i/24*155)
      circle(x,y2,size-i*1.01);
    pop();
  }angle=90*sin(frameCount)
}
function drawTentacles(xpos,ypos,size,t){
  push();
  translate(xpos,ypos);
  for(let k=0;k<360;k+=15){
    let x=50*sin(k);
    let y=50*cos(k);
    drawTentacleright(x,y,size,t,k);            
    drawTentacleleft(x,y,size,t,k);
  }pop();
}
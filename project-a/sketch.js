/*
Template for IMA's Creative Coding Lab 

Project A: Generative Creatures
CCLaboratories Biodiversity Atlas 
*/

let circlesize;
let horizonLine=100;
let time = 15;
let t= 10;
let angle1 =0;
let size =10;
let phase = 0;


let angle=0;
let x =200;
let y =200;
let l =0.019;
let liveliness = 0;
let totalsize =30;
let barlength1=0;
let barlength2=0;
let barlength3=0;
let r=0;
let g=0;
let b=255;
let temp=500-500*5/16*1.2-20+140;
let w=500-500*5/16*1.2-20+140;
let w2=500-500*5/16*1.2-20+140;
let waterLevel=500-500*5/16*1.2-20+140;
function setup() {
  createCanvas(800, 500);
  canvas.id("p5-canvas");
  canvas.parent("p5-canvas-container");
  angleMode(DEGREES);
}
function draw() {
 background(255);
  fill(150,100,10);
  beginShape();
  vertex(-180,height);
  vertex(width-80,height);
  vertex(width,height-50-100);
  vertex(30,height-50-100);
  vertex(-180,height);
  endShape();
  
  let tankX = 20;
  let tankY = height - height * 5/ 16 * 1.2 - 20;
  let tankWidth = width * 5/ 16 * 1.2;
  let tankHeight = height * 5 / 16 * 1.2;
  liveliness+=sin(frameCount*l);
  
  push();
  translate((20+tankWidth+20)/2+10,(tankY+w2)/2-15);
  stroke(1);
  goalx=60*(1-2*noise(frameCount*l));
  goaly=60*(1-2*noise(1000+frameCount*l));
  for(let o=0;o<100;o++){
  x=lerp(x,goalx,0.02);
  y=lerp(y,goaly,0.02);}
  heat=map(temp,500-500*5/16*1.2-20+180,500-500*5/16*1.2-20+100,0,255)
  w=map(w2,500-500*5/16*1.2-20+180,500-500*5/16*1.2-20+100,480-100,290)
  s=map(barlength1,140,0,0,1);
  p=map(barlength2,0,140,0,255);
  t=map(barlength3,0,140,10,100);
  //noStroke()
  drawTentacles(x,y,25,10,totalsize*s,heat);
  bubble(0,0,t)
  fill(p,150+90*sin(frameCount),170+90*cos(frameCount))
  circle(x,y,totalsize*sin(frameCount)*s);
  pop();
  // 画立方体水缸（前面部分透明以显示水面）
  noFill();
  stroke(0);
  rect(tankX, tankY, tankWidth, tankHeight); // 前面
  line(tankX, tankY, tankX + tankWidth / 2, tankY - tankHeight / 2); // 左侧上边缘
  line(tankX + tankWidth, tankY, tankX + tankWidth * 1.5, tankY - tankHeight / 2); // 右侧上边缘
  line(tankX + tankWidth / 2, tankY - tankHeight / 2, tankX + tankWidth * 1.5, tankY - tankHeight / 2); // 顶部
  line(tankX + tankWidth, tankY + tankHeight, tankX + tankWidth * 1.5, tankY + tankHeight - tankHeight / 2); // 右侧底边
  line(tankX + tankWidth * 1.5, tankY - tankHeight / 2, tankX + tankWidth * 1.5, tankY + tankHeight - tankHeight / 2); // 右侧边
  line(tankX + tankWidth / 2, tankY - tankHeight / 2, tankX + tankWidth / 2, tankY + tankHeight - tankHeight / 2); // 左侧边
  line(tankX + tankWidth, tankY + tankHeight, tankX, tankY + tankHeight); // 前底边
  line(tankX, tankY + tankHeight, tankX + tankWidth / 2, tankY + tankHeight - tankHeight / 2); // 左侧底边
  line(tankX + tankWidth / 2, tankY + tankHeight - tankHeight / 2, tankX + tankWidth * 1.5, tankY + tankHeight - tankHeight / 2); // 后底边

  // 画水面
  fill(r, g, b, 150);
  noStroke();
  beginShape();
  vertex(tankX, w);
  vertex(tankX + tankWidth, w);
  vertex(tankX + tankWidth * 1.5, w - tankHeight / 2);
  vertex(tankX + tankWidth / 2, w - tankHeight / 2);
  endShape();
  
  // 画水面下方部分
  fill(0, 0, 255, 150);
  beginShape();
  vertex(tankX, w);
  vertex(tankX + tankWidth, w);
  vertex(tankX + tankWidth, tankY + tankHeight);
  vertex(tankX, tankY + tankHeight);
  endShape();
  
  beginShape();
  vertex(tankX + tankWidth, w);
  vertex(tankX + tankWidth * 1.5, w - tankHeight / 2);
  vertex(tankX + tankWidth * 1.5, tankY + tankHeight - tankHeight / 2);
  vertex(tankX + tankWidth, tankY + tankHeight);
  endShape();
 // Draw control panel as a 3D box
  let panelX = tankX + tankWidth + 80;
  let panelY = tankY;
  let panelWidth = 80;
  let panelHeight = tankHeight;
  let depth = 30;

  fill(100);
  stroke(0);
  //bottum
  beginShape();
  vertex(panelX, panelY+panelHeight); 
  vertex(panelX + depth, panelY - depth+panelHeight);
  vertex(panelX + panelWidth + depth, panelY - depth+panelHeight);
  vertex(panelX + panelWidth, panelY+panelHeight);
  endShape();
  
  //back
  beginShape();
  vertex(panelX+depth, panelY + panelHeight-depth); 
  vertex(panelX + depth, panelY - depth);
  vertex(panelX + panelWidth + depth, panelY - depth);
  vertex(panelX + panelWidth + depth, panelY+panelHeight-depth);
  endShape();
  //up
  beginShape();
  vertex(panelX, panelY); 
  vertex(panelX + depth, panelY - depth);
  vertex(panelX + panelWidth + depth, panelY - depth);
  vertex(panelX + panelWidth, panelY);
  endShape();
  //left
  beginShape();
  vertex(panelX+panelWidth,panelY);
  vertex(panelX+panelWidth+depth,panelY-depth);
  vertex(panelX+panelWidth+depth,panelY-depth+panelHeight);
  vertex(panelX+panelWidth,panelY+panelHeight);
  vertex(panelX+panelWidth,panelY);
  endShape();
  //front
  rect(panelX, panelY, panelWidth, panelHeight);

  // Draw buttons
  textSize(8);
  fill(255);
  ellipse(panelX + panelWidth/2,panelY+20,27,27);
  text('Sault',panelX+panelWidth/2-10,panelY+20);
  fill(255,0,255);
  ellipse(panelX+panelWidth/2,panelY +50,27,27);
  text('poison',panelX+panelWidth/2-12,panelY +50);
  fill(255,255,0);
  ellipse(panelX+panelWidth/2,panelY+80,27,27);
  text('oxygen',panelX+panelWidth/2-9,panelY+80);
let rectWidth = 140;
let rectHeight = 25;
let buttonSize = 20;
let spacing = 15;
let boardX = width - 280; // 黑板的左上角 x 坐标
let boardY = 300; // 黑板的左上角 y 坐标
let boardWidth = 200; // 黑板宽度
let boardHeight = 150; // 黑板高度
  if(mouseIsPressed==true &&(mouseX-panelX-panelWidth/2)**2+(mouseY-panelY-20)**2<=(27/2)**2&&barlength1<rectWidth){
    barlength1+=10
  }if(mouseIsPressed==true &&(mouseX-panelX-panelWidth/2)**2+(mouseY-panelY-50)**2<=(27/2)**2&&barlength2<rectWidth){
    barlength2+=10
  }if(mouseIsPressed==true &&(mouseX-panelX-panelWidth/2)**2+(mouseY-panelY-80)**2<=(27/2)**2&&barlength3<rectWidth){
    barlength3+=10
  }if(mouseIsPressed==true &&(mouseX-(boardX + 10 + rectWidth + buttonSize / 2 + 5))**2+(mouseY-(boardY + 15 + 0 * (rectHeight + spacing)+rectHeight/2))**2<=(buttonSize/2)**2&&barlength1<=rectWidth){
    barlength1=0
  }if(mouseIsPressed==true &&(mouseX-(boardX + 10 + rectWidth + buttonSize / 2 + 5))**2+(mouseY-(boardY + 15 + 1 * (rectHeight + spacing)+rectHeight/2))**2<=(buttonSize/2)**2&&barlength2<=rectWidth){
    barlength2=0
  }if(mouseIsPressed==true &&(mouseX-(boardX + 10 + rectWidth + buttonSize / 2 + 5))**2+(mouseY-(boardY + 15 + 2 * (rectHeight + spacing)+rectHeight/2))**2<=(buttonSize/2)**2&&barlength3<=rectWidth){
    barlength3=0
  }

if(mouseY<panelY+180&&mouseY>panelY+100&&mouseX>panelX+10&&mouseX<panelX+30&&mouseIsPressed==true){
  temp =mouseY;
}
if(mouseY<panelY+180&&mouseY>panelY+100&&mouseX>panelX+50&&mouseX<panelX+70&&mouseIsPressed==true){
  w2 =mouseY;
}
// Draw temperature gauge inside the panel
fill(200);
rect(panelX + 10, panelY + 100, 20, 80);

// Draw temperature indicator
fill(255, 0, 0);
rectMode(CORNERS);
rect(panelX + 10, panelY+180, panelX+30, temp);
rectMode(CORNER);

// Draw temperature scale
fill(0);
textSize(7); 
for (let t = 200; t >= -100; t -= 50) {
  let scaleY = map(t, 200, -100, panelY + 100, panelY + 180);
  line(panelX +10, scaleY, panelX +15, scaleY); 
  text(t + "°C", panelX+20, scaleY + 3); 
}



  // Draw water level gauge inside the panel
  fill(200);
  rect(panelX + 50, panelY + 100, 20, 80);
  fill(0, 0, 255);
  rectMode(CORNERS);
  rect(panelX + 50, panelY + 180, panelX+70, w2);
  rectMode(CORNER);


fill(30, 30, 30); // 黑板颜色
stroke(255); // 白色边框
rect(boardX, boardY, boardWidth, boardHeight);

// 画三个横向长方形

for (let i = 0; i < 3; i++) {
  let rectY = boardY + 15 + i * (rectHeight + spacing);
  
  fill(80); // 长方形颜色
  rect(boardX + 10, rectY, rectWidth, rectHeight);
  fill(255, 0, 0); // 按钮颜色
  ellipse(boardX + 10 + rectWidth + buttonSize / 2 + 5, rectY + rectHeight / 2, buttonSize);
}
fill(0,255,255);
rect(boardX + 10,boardY + 15,barlength1,rectHeight);
rect(boardX + 10,boardY + 15+rectHeight+spacing,barlength2,rectHeight);
rect(boardX + 10,boardY + 15+2*(rectHeight+spacing),barlength3,rectHeight)

}
function drawTentacleright(xpos,ypos,size,t,k,size2,dry){
  
  for(i=0;i<36;i++){
    push();
    translate(xpos,ypos);
    //stroke(angle);
    rotate(k);
      let x=size2*(i/24)*cos(angle+t*i);
      let y2=size2*(i/24)*sin(angle+t*i);
      fill(dry,255,i/24*155)
      circle(x,y2,size-i*1.01);
    pop();
  }angle=90*sin(frameCount)}
  
function drawTentacleleft(xpos,ypos,size1,t,k,size2,dry){
  
  for(i=0;i<36;i++){
    push();
    translate(xpos,ypos);
    //stroke(angle);
    rotate(k);
      let x=size2*(i/24)*-cos(angle+t*i);
      let y2=size2*(i/24)*sin(angle+t*i);
      fill(dry,255,i/24*155)
      circle(x,y2,size1-i*1.01);
    pop();
  }angle=90*sin(frameCount)
}
function drawTentacles(xpos,ypos,size,t,size2,dry){
  push();
  translate(xpos,ypos);
  for(let k=0;k<360;k+=15){
    let x=size2*sin(k);
    let y=size2*cos(k);
    drawTentacleright(x,y,size,t,k,size2,dry);            
    drawTentacleleft(x,y,size,t,k,size2,dry);
  }pop();
}
function bubble(q,p,t){
  push()
translate(q,p) 
frameRate(t);
 noStroke()
  for(i=0;i<15;i++){ 
    fill(random(150,255))
      let x=random(-70,200-15)+15*(i/(time-1))*cos(angle1+20*i);
      let y2=random(10,95)+15*(i/(time-1))*sin(angle1+20*i);
      circle(x,y2,size+1.5*i);
      angle1+=0.0001
      }
pop()  
}

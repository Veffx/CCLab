let paperImg;
let particles=[];
let numParticles=5;
 function preload(){
  paperImg = loadImage("assets/Paper-Texture-4.jpg")
 }
 function setup(){
  let canvas =createCanvas(800,500);
  canvas.parent("p5-canvas-container");
  for(let i=0;i<numParticles;i++){
  particles.push(new Particle())
  imgW=paperImg.width;
  imgH=paperImg.height;
 }
 function draw(){
  backgroundHUE(220);

  image(paperImg,0,0);
  for(let i=0;i<numParticles;i++){
    particles[i].update();
    particles[i].dispaly();
    let navigationSpeed =4;
    if(keyIsPressed==true){
      if(key=="a"){
        worldX+=navigationSpeed;}
        else if(key=="d"){
          wordX-=navigationSpeed;}
          else if(key=="s"){
            worldY+=navigationSpeed;}
            else if(key=="w"){
              worldY-=navigationSpeed;
            }
          }
        }
      }
    }



 class Particle{
  conductor(){
    this.x=random(0,width);
    this.y=random(0,height);
    this.speed=random(-2,2);
    this.dia =20
  }
  update(){
    this.x+=this.speed;
    this.y+=this.speed;
  }
  dispaly(){
    circle(this.x,this.y,dia)
  }
 }
mainCharacter = new Fish();

let fragments =[];
let fragmentImages =[];
let fragmentSounds=[];
let placedCount= 0;
let finalMessageShow=false;
let messageSound;

function preload(){
  fragmentImages[0]=loadImage('assets/images/0.jpg');
  fragmentSounds[0]=loadSound('assets/sound/0.mp3');
  fragmentImages[1]=loadImage('assets/images/1.jpg');
  fragmentSounds[1]=loadSound('assets/sound/1.mp3');
  fragmentImages[2]=loadImage('assets/images/2.jpg');
  fragmentSounds[2]=loadSound('assets/sound/2.mp3');
  fragmentImages[3]=loadImage('assets/images/3.jpg');
  fragmentSounds[3]=loadSound('assets/sound/3.mp3');
  messageSound =loadSound('assets/sound/message.mp3');
}

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");
  textSize(18);
  textFont('Georgia');
  textAlign(CENTER);

  for(i=0;i<4;i++){
    fragments.push(new Fragment(
      random(50,700),random(100,400),120,120,fragmentImages[i],fragmentSounds[i],i
    ));
  }
}

function draw(){
  background(10,20,40);
  // stroke(255);
  // noFill();
  // rectMode(CENTER);
  // rect(width/2,height/2,520,150);
  fill(255);
  noStroke();
  text("Drag the puzzle pieces and put our memories back in place",width/2,40);
  // text(placedCount,width/2+30,height/2);
  // text(fragments.length,width/2,height/2);
  // text(checkFragmentsAligned(),width/2+60,height/2);
  
  for(let frag of fragments){
    frag.update();
    frag.display();
  }
  if(checkFragmentsAligned() && !finalMessageShow){
    finalMessageShow=true;
    userStartAudio();
    setTimeout(()=>{
      messageSound.play();
      showFinalMessage();
    },1000);
  }
  if(finalMessageShow){
    fill(255,230,250);
    textSize(22);
    
    text("Dear Future:\nwe have deeply loved the Earth, but we didn't cherish it.\nPlease do better than us.",width/2,height-60);
  }
}

function mousePressed(){
  for(let frag of fragments){
    frag.pressed(mouseX,mouseY);
  }
}

function mouseReleased(){
  for(let frag of fragments){
    frag.released();
  }
}

function showFinalMessage(){
  //push();
  fill(255,230,250);
  textSize(22);
  text("Dear Future:\nwe have deeply loved the Earth, but we have also harmed it.\nPlease do better than us.",width/2,height-60);
  //pop();
}

function checkFragmentsAligned(){
  if(placedCount<fragments.length) return false;
  let sorted = [...fragments].sort((a,b)=>a.x-b.x)
  for(let i=0;i<sorted.length;i++){
    if(sorted[i].id!==i) return false;
  }
  for(let i=1;i<sorted.length;i++){
    let dx = sorted[i].x-sorted[i-1].x;
    let dy = abs(sorted[i].y-sorted[i-1].y);
    if(dx<90||dx>140) return false;
    if(dy>50)return false;
  }
  return true;
}


class Fragment{
  constructor(x,y,w,h,img,sound,id){
    this.x=x;
    this.y=y;
    this.w=w;
    this.h=h;
    this.img=img; 
    this.sound=sound;
    this.id=id;

    this.offsetX=0;
    this.offsetY=0;
    this.dragging=false;
    this.placed=false;

   //this.targetX=100+ id*130;
    //this.targetY=100;
    //this.threshold=100;
  }
  display(){
    image(this.img,this.x,this.y,this.w,this.h);
    //if(!this.placed){
     // image(this.img,this.x,this.y,this.w,this.h);
    // }else{
    //   for(let i = 0;i<this.w;i+=10){
    //     for(let j=0;j<this.h;j+=10){
    //       let c=this.img.get(i,j);
    //       fill(c);
    //       noStoke();
    //       rect(this.targetX+i,this.targetY+j,10,10);
    //     }
    //   }
    // }
  }

  pressed(mx,my){
    if(mx>this.x&&
      mx<this.x+this.w&&
      my>this.y&&
      my<this.y+this.h&&
      !this.placed
    ){
      this.dragging=true;
      this.offsetX=mx-this.x;
      this.offsetY=my-this.y;
    }
  }

  released(){
    if(this.dragging){
      this.dragging =false;
      //if(dist(this.x,this.y,this.targetX,this.targetY)<this.threshold){
        //  this.x=this.targetX;
        //  this.y=this.targetY;
        // this.placed=true;
        // this.sound.play();
        placedCount++;
      //}
    }
  }

  update(){
    if(this.dragging){
      this.x =mouseX -this.offsetX;
      this.y =mouseY-this.offsetY;
    }
  }
}
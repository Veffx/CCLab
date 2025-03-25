let greetings =["Hallo","哈罗,你吃了吗","你好"]

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");
}

function draw() {
  background(10,210,230);
  // text(greetings[1],width/2,height/2);
  for(let i = 0;i<greetings.length;i++){
    text(greetings[i],width/2,height/2+i*12)
  }
}
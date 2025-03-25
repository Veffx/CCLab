let greetings =["Hallo","哈罗,你吃了吗","你好",'1']

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");
}

function draw() {
  background(10,210,230);
  for(let i = 0;i<3;i++){
    text(greetings[i],width/2,heigth/2+i*12)
  }
}
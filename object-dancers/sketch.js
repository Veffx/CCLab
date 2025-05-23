/*
  Check our the GOAL and the RULES of this exercise at the bottom of this file.
  
  After that, follow these steps before you start coding:

  1. rename the dancer class to reflect your name (line 35).
  2. adjust line 20 to reflect your dancer's name, too.
  3. run the code and see if a square (your dancer) appears on the canvas.
  4. start coding your dancer inside the class that has been prepared for you.
  5. have fun.
*/

let dancer;

function setup() {
  // no adjustments in the setup function needed...
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5-canvas-container");

  // ...except to adjust the dancer's name on the next line:
  dancer = new YourNameDancer(width / 2, height / 2);
}

function draw() {
  // you don't need to make any adjustments inside the draw loop
  background(0);
  drawFloor(); // for reference only

  dancer.update();
  dancer.display();
}

// You only code inside this class.
// Start by giving the dancer your name, e.g. LeonDancer.
class YourNameDancer {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    this.angle = 0;
    this.scale = 1;
    this.bob = 0;
    this.targetX = random(width);
    this.targetY = random(height);
    // add properties for your dancer here:
    //..
    //..
    //..
  }
  update() {
    // update properties here to achieve
    // your dancer's desired moves and behaviour
    this.angle += 0.05;
    this.bob = sin(this.angle) * 5;
    this.x = lerp(this.x, this.targetX, 0.02);
    this.y = lerp(this.y, this.targetY, 0.02);


    if (dist(this.x, this.y, this.targetX, this.targetY) < 10) {
      this.targetX = random(0,width);
      this.targetY = random(0,height);
}

  }
  display() {
    // the push and pop, along with the translate 
    // places your whole dancer object at this.x and this.y.
    // you may change its position on line 19 to see the effect.
    push();
    translate(this.x, this.y+this.bob);
    scale(this.scale);
    rotate(this.angle);


    // ******** //
    // ⬇️ draw your dancer from here ⬇️
    
    // outline
    noStroke();
    fill(220);
    ellipse(0, 0, 100, 100); // skull
    //下巴
    rect(-30,25,55,40);
    // 眼窝
    stroke(0);
    fill(0);
    ellipse(-20, -15, 20, 25);
    ellipse(20, -15, 20, 25);
    // 鼻孔
    ellipse(5, 10, 8, 12);
    ellipse(-5, 10,8,12);
    // 牙齿
    fill(255);
    rect(-25, 35, 9, 13);
    rect(-16.25, 35, 9, 13);
    rect(-7.5, 35, 9, 13);
    rect(1.25, 35, 9, 13);
    rect(10, 35, 9, 13);

    rect(-25, 50, 10, 13);
    rect(-16.25, 50, 10, 13);
    rect(-7.5, 50, 10, 13);
    rect(1.25, 50, 10, 13);
    rect(10, 50, 10, 13);


    // draw reference (可选删除)
    // this.drawReferenceShapes();





    // ⬆️ draw your dancer above ⬆️
    // ******** //

    // the next function draws a SQUARE and CROSS
    // to indicate the approximate size and the center point
    // of your dancer.
    // it is using "this" because this function, too, 
    // is a part if your Dancer object.
    // comment it out or delete it eventually.
    //this.drawReferenceShapes()
    

    pop();
  }
  drawReferenceShapes() {
    noFill();
    stroke(255, 0, 0);
    line(-5, 0, 5, 0);
    line(0, -5, 0, 5);
    stroke(255);
    rect(-100, -100, 200, 200);
    fill(255);
    stroke(0);
  }
}



/*
GOAL:
The goal is for you to write a class that produces a dancing being/creature/object/thing. In the next class, your dancer along with your peers' dancers will all dance in the same sketch that your instructor will put together. 

RULES:
For this to work you need to follow one rule: 
  - Only put relevant code into your dancer class; your dancer cannot depend on code outside of itself (like global variables or functions defined outside)
  - Your dancer must perform by means of the two essential methods: update and display. Don't add more methods that require to be called from outside (e.g. in the draw loop).
  - Your dancer will always be initialized receiving two arguments: 
    - startX (currently the horizontal center of the canvas)
    - startY (currently the vertical center of the canvas)
  beside these, please don't add more parameters into the constructor function 
  - lastly, to make sure our dancers will harmonize once on the same canvas, please don't make your dancer bigger than 200x200 pixels. 
*/
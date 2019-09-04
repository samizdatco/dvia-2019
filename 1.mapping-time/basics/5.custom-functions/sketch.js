// functions example

// after defining a custom function, we can call it by name from within *other* functions
function drawCross(aX, aY){
  stroke(0, 0, 0);
  line(aX-10, aY, aX+10, aY);
  line(aX, aY-10, aX, aY+10);
}

// regular setup function
function setup(){
  createCanvas(400, 300);
  background(255, 255, 255);
}

// regular draw function
function draw(){
  background(255, 255, 255);

  // mouseX & mouseY are automatic variables that give the current mouse position,
  // let's pass them to our custom function
  drawCross(mouseX, mouseY);
}
// functions example

// after defining a custom function, we can call it by name from within *other* functions
function drawCross(aX, aY){
  stroke(255);
  line(aX-50, aY, aX+50, aY);
  line(aX, aY-50, aX, aY+50);
}

// regular setup function
function setup(){
  createCanvas(400, 300);
  background(255, 255, 255);
}

// regular draw function
function draw(){
  background(0);

  // mouseX & mouseY are automatic variables that give the current mouse position,
  // let's pass them to our custom function
  drawCross(mouseX, mouseY);
}
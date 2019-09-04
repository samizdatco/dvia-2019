function setup() {
  createCanvas(720, 400);
}

// define global variables to hold the current rotation of each polygon across draw() calls
var hRot = 0
var mRot = 0
var sRot = 0

function draw() {
  var now = clock()

  // set rotational speed limits for each polygon independently
  var hMax = PI/14;
  var mMax = PI/14;
  var sMax = PI/14;

  // divide each time component by its range (to turn it into a 0-1.0 value) then
  // rotate the polygon by that percent of its max speed
  hRot += now.hours/24 * hMax;
  mRot += now.min/60 * mMax;
  sRot += now.sec/60 * sMax;

  background(102, 70);
  noStroke()

  /*hour*/
  push();
  translate(width*0.2, height*0.5);
  rotate(hRot);
  fill(255);
  polygon(0, 0, 82, 3);
  pop();

  /*time colons*/
  push();
  fill('black');
  ellipse( 250, 180, 15, 15);
  ellipse( 250, 210, 15, 15);
  pop();

  /*minute*/
  push();
  translate(width*0.5, height*0.5);
  rotate(mRot);
  fill(210);
  polygon(0, 0, 70, 4);
  pop();

  /*second*/
  push();
  translate(width*0.8, height*0.5);
  rotate(sRot);
  fill(180);
  polygon(0, 0, 60, 5);
  pop();
}

function polygon(x, y, radius, npoints) {
  var angle = TWO_PI / npoints;
  beginShape();
  for (var a = 0; a < TWO_PI; a += angle) {
    var sx = x + cos(a) * radius;
    var sy = y + sin(a) * radius;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}
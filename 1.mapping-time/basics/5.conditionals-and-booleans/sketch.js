/*
A Boolean variable has only two possible values: true or false.
It is common to use Booleans with control statements to determine
the flow of a program.

In this example, when the boolean value "isLeft" is true, shapes
are drawn in black (otherwise they are white).

When "isUpper" is true, a circle is drawn (otherwise a square is)
*/

function setup() {
  createCanvas(700, 400);
  ellipseMode(CORNER);
}

// our custom 'drawShape' function takes a pair of coordinates and will draw a shape at that
// location whose style is based on where the coordinates are relative to the center of the screen
function drawShape(x, y){
  var isLeft = x < width/2 // will be 'true' if x is less than 350
  if (isLeft){
    fill(0)
  }else{
    fill(255)
  }

  var isUpper = y < height/2 // will be 'false' if y is greater than 200
  if (isUpper){
    circle(x, y, 25)
  }else{
    rect(x, y, 25, 25)
  }
}


// try adjusting these starting positions and notice how the block of shapes
// changes based on where each individual shape is positioned
var horiz = 200
var vert = 50

function draw(){
  background(127)

  // draw lines through the horizontal and vertical midpoints of the canvas
  stroke(0)
  line(width/2, 0, width/2, height)
  line(0, height/2, width, height/2)
  noStroke()

  // draw the upper row of shapes
  drawShape(horiz, vert)
  drawShape(horiz+50, vert)
  drawShape(horiz+100, vert)

  // draw the middle row of shapes
  drawShape(horiz, vert+50)
  drawShape(horiz+50, vert+50)
  drawShape(horiz+100, vert+50)

  // draw the lower row of shapes
  drawShape(horiz, vert+100)
  drawShape(horiz+50, vert+100)
  drawShape(horiz+100, vert+100)

  /*
   * Try uncommenting one or both of the blocks below. In each case, the starting position for the
   * block of shapes will be shifted by a little bit each frame and then will be reset back to
   * zero when the shapes have been pushed entirely off the bottom or right edge of the canvas.
   */

  // horiz += 1
  // if (horiz > width){
  //   horiz = 0
  // }

  // vert += 1
  // if (vert > height){
  //   vert = 0
  // }
}
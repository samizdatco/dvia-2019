/*
A Boolean variable has only two possible values: true or false.
It is common to use Booleans with control statements to determine
the flow of a program. In this example, when the boolean value "x"
is true, vertical black lines are drawn and when the boolean value
"x" is false, horizontal gray lines are drawn.
*/

function setup() {
  createCanvas(720, 400);
  background(0);
  stroke(255);

  var step = 20;
  var middle = width/2;;
  var leftOfCenter = false;

  for (var i = step; i <= width; i += step) {
    // set the color by mapping `i` from x-axis coordinates to 0-255 grey values
    stroke(map(i, 0,width, 0,255))

    if (i < middle) {
      leftOfCenter = true;
    } else {
      leftOfCenter = false;
    }

    if (leftOfCenter == true) {
      // Vertical line
      line(i, step, i, height-step);
    }

    if (leftOfCenter == false) {
      // Horizontal line
      line(middle, i-middle+step, width-step, i-middle+step);
    }

  }
}
// Variables are used for storing values. In this example, try changing the values of variables to affect the composition.
// Note that we're only defining a setup() function (and no draw() function). As a result the screen is only updated a single time.

function setup() {
  createCanvas(720, 400);
  background(0);
  stroke(150);
  strokeWeight(4);

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  // define three variables to determine how & where our lines will be drawn
  var x = 90;
  var y = 120;
  var w = 180;
  print(`left side: x:${x} y:${y} w:${w}`)

  // draw the leftmost group of four lines
  line(x, y, x+w, y);
  line(x, y+10, x+w, y+10);
  line(x, y+20, x+w, y+20);
  line(x, y+30, x+w, y+30);

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  // Change the values in the variables
  x = x + w;
  y = height - y;
  print(`middle: x:${x} y:${y} w:${w}`)

  // draw the middle batch of lines
  // (note that the line drawing code is identical to the previous batch)
  line(x, y, x+w, y);
  line(x, y+10, x+w, y+10);
  line(x, y+20, x+w, y+20);
  line(x, y+30, x+w, y+30);

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  // Change the variables again in the exact same way (but to different effect)
  x = x + w;
  y = height - y;
  print(`right side: x:${x} y:${y} w:${w}`)

  // draw the rightmost batch of lines
  // (once again use the same drawing code but with different values in the variables)
  line(x, y, x+w, y);
  line(x, y+10, x+w, y+10);
  line(x, y+20, x+w, y+20);
  line(x, y+30, x+w, y+30);
}
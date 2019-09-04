// Variables are used for storing values. In this example, try changing the values of variables to affect the composition.
// Note that we're only defining a setup() function (and no draw() function). As a result the screen is only updated a single time.

function setup() {
  createCanvas(720, 400);
  background(0);
  stroke(150);
  strokeWeight(4);

  // change these variables to see how the composition is affected
  var x = 90;
  var y = 120;
  var w = 180;


  // -- draw the first batch of four lines ----------------------------------------------

  // line(x1, y1, x2, y2) connects (x1,y1) to (x2,y2)
  line(x, y, x+w, y);
  line(x, y+10, x+w, y+10);
  line(x, y+20, x+w, y+20);
  line(x, y+30, x+w, y+30);


  // -- draw the middle batch of lines --------------------------------------------------

  // the values in the variables are changed...
  x = x + w;
  y = height - y;

  // ...but the line drawing code is identical to the previous batch
  line(x, y, x+w, y);
  line(x, y+10, x+w, y+10);
  line(x, y+20, x+w, y+20);
  line(x, y+30, x+w, y+30);


  // -- draw the rightmost batch of lines -----------------------------------------------

  // Change the variables again in the exact same way (but to different effect)
  x = x + w;
  y = height - y;

  // once again use the same drawing code but with different values in the variables
  line(x, y, x+w, y);
  line(x, y+10, x+w, y+10);
  line(x, y+20, x+w, y+20);
  line(x, y+30, x+w, y+30);
}
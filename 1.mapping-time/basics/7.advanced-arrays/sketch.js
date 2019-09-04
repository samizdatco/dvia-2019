function setup() {
  createCanvas(720, 360);

  // assigning a variable to '[]' creates an array object with a length of zero and nothing in it
  var coswave = [];

  // Before drawing anything, we'll fill the 'coswave' array with values using a loop.
  // After the loop is complete, the array will have as many values as the canvas's width.
  // It will have values near 1 and the beginning and end, and approach 0 at its midpoint.
  for (var i=0; i<width; i++){
    var amount = map(i, 0, width, 0, PI); // map `i` (0 to 720) to `amount` (0 to PI)
    var cosVal = abs(cos(amount)); // get the cosine (-1 to 1) of the amount and assign its absolute value (0 to 1) to the array
    coswave.push(cosVal) // or, equivalently: coswave[i] = cosVal
  }
  // Let's now use the range of pre-computed values to draw some gradients...
  var top = 0
  var bot = height/3

  var spacing = 8 // we'll draw vertical lines this many pixels apart from one another
  strokeWeight(1) // try setting this equal to `spacing` to remove the space between lines
  background(0);

  // draw the top row
  for (var i=0; i<width; i+=spacing){
    stroke(coswave[i]*255);
    line(i, 0, i, height/3);
  }

  // draw the middle row
  translate(0, height/3)
  for (var i=0; i<width; i+=spacing){
    stroke(255 - coswave[i]*255);
    line(i, 0, i, height/3);
  }

  // draw the bottom row
  translate(0, height/3)
  for (var i=0; i<width; i+=spacing){
    stroke(coswave[i] * 255/2);
    line(i, 0, i, height/3);
  }
}


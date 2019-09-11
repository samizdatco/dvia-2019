function setup() {
  createCanvas(720, 360);
  background(0);

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
  var spacing = 10 // we'll draw vertical lines this many pixels apart from one another
  strokeWeight(2) // try setting this equal to `spacing` to remove the space between lines
  translate(spacing/2, 0) // center things within each of the spacing 'lanes'

  for (var i=0; i<width; i+=spacing){
    /* use the 0–1 `coswave` value for this x location to pick a grey value in the 0–255 range */
    stroke(coswave[i]*255);           // 0=black, 1=white
    // stroke(255 - coswave[i]*255);  // 0=white, 1=black
    // stroke(coswave[i] * 255/2);    // 0=black, 1=grey

    /* draw a vertical line at the current x location from the top to bottom of the canvas */
    line(i, 0, i, height);
  }

}


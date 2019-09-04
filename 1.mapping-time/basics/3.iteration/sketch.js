/*
   Iteration with a "for" loop to construct repetitive forms.

   loop syntax works like this:
     for(initialize; test; update){
       ... loop body (i.e., the steps to be repeated)
     }
     ... rest of program

   the basic flow of this kind of loop is:
     1. do the 'initialize' operation
     2. is 'test' true? YES: execute the statements in the 'body' of the loop
                        NO: 'break' from looping and move on to the rest of the program
     3. do the 'update' operation
     4. go to step 2

   Updating a variable by modifying its existing value is extremely common when looping.
   Some convenient shorthands for this include:
     x++     is equivalent to:  x = x + 1
     x--     is equivalent to:  x = x - 1
     x += a  is equivalent to:  x = x + a
     x -= b  is equivalent to:  x = x + b
     x *= c  is equivalent to:  x = x * c
     x /= c  is equivalent to:  x = x / c
*/

var y;
var num = 14;

function setup() {
  createCanvas(575, 360);
  background('dimgrey');
  noStroke();

  // Draw white bars
  fill('white');
  y = 60;
  for(var i=0; i<num/3; i++) {
    rect(50, y, 475, 10);
    y += 20; // shorthand for: "y = y + 20"
  }

  // Orange bars (leftward)
  fill('goldenrod');
  y = 40;
  for(var i=0; i<num; i++) {
    rect(405, y, 30, 10);
    y += 20;
  }

  // Orange bars (rightward)
  y = 50;
  for(var i=0; i<num; i++) {
    rect(425, y, 30, 10);
    y += 20;
  }

  // Thin lines
  fill('black');
  y = 45;
  for(var i=0; i<num-1; i++) {
    rect(120, y, 280, 1);
    y += 20;
  }
}

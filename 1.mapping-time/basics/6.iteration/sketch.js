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
  createCanvas(600, 600);
  background(0);
  noStroke();

  var spacing = 60
  var radius = 30

  push()

  translate(100, 50)
  fill('red')
  circle(0, 0, radius)
  circle(0, spacing, radius)
  circle(0, 2*spacing, radius)
  circle(0, 3*spacing, radius)
  circle(0, 4*spacing, radius)
  circle(0, 5*spacing, radius)

  translate(200, 0)
  fill('orange')
  for (var i=0; i<6; i++){
    circle(0, i*spacing, radius)
  }

  translate(200, 0)
  fill('yellow')
  for (var y=0; y<6*spacing; y+=spacing){
   circle(0, y, radius)
  }

  pop()

  translate(100, 400)
  var xPositions = [0, 5, 10, 20, 40, 80, 160, 320, 640]
  xPositions.forEach(function(x, i){
    stroke(255 - 30*i)
    line(x, 0, x, 150)
  })

}


function setup() {
  createCanvas(512, 256); // set the size of the canvas
  frameRate(60) // redraw the screen 60 times per second
  background(0) // fill the canvas with black pixels
  print("Hello, javascript console.")
}

function draw() {
  // set parameters that will affect our drawing commands below
  ellipseMode(CENTER)
  textAlign(CENTER)
  textSize(72)
  noStroke()

  // pick random values to decide on location, size, and opacity of the next dot
  var x = random(width),
      y = randomGaussian(height/2, height/8),
      r = random(3, 30),
      c = color(255, random(100));

  // set the color & draw the dot
  fill(c)
  ellipse(x, y, r)

  // switch back to drawing in black and print our greeting on top
  fill(0)
  text("Hello, world.", width/2, height/2 + textSize()/3)
}

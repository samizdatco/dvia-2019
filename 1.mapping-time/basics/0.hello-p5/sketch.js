
function setup() {
  createCanvas(512, 256); // set the size of the canvas
  background(255) // fill the canvas with black pixels
  print("Hello, javascript console.")
  print(`The P5 canvas is ${width}px wide and ${height}px tall`)

  // display out greeting message in medium grey
  fill(127) // grey value between 0–255
  textSize(60) // size in pixels
  text("Hello P5 👋", 90, height/2) // (message, x, y)

  // pick a light grey fill and bright red stroke to draw shapes with
  fill(200)         // a single value is greyscale
  stroke(200, 0, 0) // three values are red/green/blue
  strokeWeight(4)   // line weight in pixels

  // draw three shapes
  square(100, 200, 40) // (x, y, size)
  circle(200, 200, 40) // (x, y, radius)
  arc(300, 200, 100, 100, -PI, -HALF_PI) // (x, y, w, h, start, stop)
}


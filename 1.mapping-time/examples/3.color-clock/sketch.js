// the colors we'll be using as 'stops' in our gradient. these can be color names or hex strings (e.g., '#2b7c09')
// for reference see: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value
var colors = ['darkred','orange','green','steelblue','darkslategrey']

// the colorForProgress() function takes a 'progress' value between 0.0 and 1.0 and returns a hex string
// that can be passed to p5 functions like background(), fill(), stroke(), etc.
// see the chroma.js docs for details: https://vis4.net/chromajs
var gradient = chroma.scale(colors).mode('lab')
function colorForProgress(pct){
  return gradient(pct).hex()
}

function setup() {
  // set the width & height of the sketch
  createCanvas(400, 200)

  // draw will be called this many times per second
  frameRate(60)
}

function draw() {
  // check the clock for the current time and unpack some of its fields to generate a time-string
  var now = clock()

  // use the current 'doneness' of the current hour to choose the background color from our gradient
  // (note that setting the background also clears the canvas from our previous round of drawing)
  var color = colorForProgress(now.progress.hour)
  background(color)

  // set up typography & drawing-color
  let pointSize = 42
  textFont("Nixie One")
  textSize(pointSize)
  textAlign(CENTER)
  fill('white')

  // print the time string to the canvas
  text(now.text.time, width/2, height/2 + pointSize/3)
}

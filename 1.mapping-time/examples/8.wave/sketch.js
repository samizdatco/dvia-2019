function setup() {
  createCanvas(800, 600)
}

function drawWave(y, amplitude, count, phase){
  // y: the vertical position of the *middle* of the waveform
  // amplitude: the height between the top of a peak and depth of a trough
  // count: the number of peaks to be drawn (a.k.a. 'frequency')
  // phase: the amount to shift the wave by horizontally

  beginShape()
  let resolution = 2
  for (var x=0; x<=canvas.width+resolution; x+=resolution){
    vertex(x, amplitude*cos(TWO_PI*count * x/width - phase*count) + y)
  }
  vertex(canvas.width, canvas.height)
  vertex(0, canvas.height)
  endShape(CLOSE)
}

var hrsPhase = 0,
    minPhase = 0,
    secPhase = 0;

function draw() {
  background(0)
  noStroke()

  let now = clock(),
      amp = 50, // the vertical size of the largest wave
      speed = .08 // the maximum horizontal drift speed

  hrsPhase += speed * now.progress.day
  minPhase += speed * now.progress.hour
  secPhase += speed * now.progress.min

  fill('red')
  drawWave(height*.3, amp, 24*now.progress.day, hrsPhase)

  fill('orange')
  drawWave(height*.5, amp/2, 60*now.progress.hour, minPhase)

  fill('yellow')
  drawWave(height*.66, amp/4, 60*now.progress.min, secPhase)
}

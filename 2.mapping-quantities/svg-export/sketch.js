function setup(){
  // Add a final argument of `SVG` to your createCanvas command
  createCanvas(300, 200, SVG)

  background(100)
  noStroke()
  fill(60, 80)
  for (var i=0; i<1200; i++){
    circle(randomGaussian(width/2, 66), randomGaussian(height/2, 66), 6)
  }
  fill(180)
  circle(width/2, height/2, 100)

  // After you've finished drawing, use the `save` command to pick a filename. 
  // Now, every time you reload  the page the browser will download a new SVG 
  // file with that name
  save('my-sketch.svg')
}

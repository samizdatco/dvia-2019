function setup() {
	createCanvas(400, 400)
}

function draw() {
	background(255)
	textSize(32)

  let now = clock(),
      x = 10,
      top = 30,
      spacing = 30;

  // draw the time in the upper left corner
	fill(200)
	text(now.hours, x, top)

  fill(100)
	text(now.min, x, top + spacing)

  fill(0)
	text(now.sec, x, top + 2*spacing)


  push() // save the state of the canvas (including font & transformation settings)

    // make some state changes that will apply until we call pop()
    textAlign(RIGHT)
    translate(width, 0)

    // draw the date in the upper right corner
    fill('#cc0000')
    text(now.year, -x, top)
    translate(0, spacing)

    fill('#992200')
    text(now.month, -x, top)
    translate(0, spacing)

    fill('#331010')
    text(now.day, -x, top)

  pop() // undo our textAlign() & translate() changes for the next draw() call

}

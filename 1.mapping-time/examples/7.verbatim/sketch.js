function setup() {
	createCanvas(700, 600)
}

function showVal(name, val){
  textAlign(RIGHT)
  textFont('Courier')
  text(name, 0, 0)

  textAlign(LEFT)
  textFont('Helvetica')
  text(val, 10, 0)
}

function draw() {
	background(255)
	textSize(32)

  var now = clock(),
      timeFields = ['hours','hour','min','sec','ms','am','pm'],
      dateFields = ['year', 'season', 'month', 'moon', 'day', 'weekday'],
      progressFields = ['year', 'season', 'month', 'moon', 'week', 'day', 'halfday', 'hour', 'min', 'sec'];

  fill(0)
  textFont('Helvetica')
  textStyle(BOLD)
  text(now.timestamp, 200, 75)
  textStyle(NORMAL)
  textSize(18)

  push()
    translate(170, 100)

    timeFields.forEach(function(field){
      translate(0, 32)
      showVal(`now.${field}`, now[field])
    })

    translate(0, 32)
    dateFields.forEach(function(field){
      translate(0, 32)
      let val = field=='moon' ? now[field].toFixed(3) : now[field]
      showVal(`now.${field}`, val)
    })
  pop()

  push()
    translate(550, 100)
    textSize(18)

    progressFields.forEach(function(field){
      translate(0, 32)
      let val = now.progress[field].toFixed(3)
      showVal(`now.progress.${field}`, val)
    })
  pop()
}

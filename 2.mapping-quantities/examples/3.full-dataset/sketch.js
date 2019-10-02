var data

function preload(){
  data = loadJSON('data/all-activity.json')
}

function setup(){
  createCanvas(3200, 600)
  background(230)

  // log the whole dataset to the console so we can poke around in it
  print(data)

  // set up typography
  textFont("Rokkitt")
  textSize(16)
  fill(30)
  noStroke()

  var x = 200
  var y = 100
  var rowHeight = 60
  var colWidth = 40

  // draw country name labels on the left edge of the table
  textStyle(BOLD)
  textAlign(RIGHT)
  for (var c=0; c<data.countries.length; c++){
    var country = data.countries[c]
    text(country, x-colWidth, y)
    y += rowHeight
  }

  // draw the year labels for columns & counts for each country per year
  textStyle(NORMAL)
  textAlign(CENTER)
  for (var i=0; i<data.years.length; i++){
    var info = data.years[i] // grab the next year's data
    y = 100

    // draw the year labels in the header row
    fill(30)
    text(info.year, x, y-rowHeight)

    // print out the atmospheric tests in blue & underground in red for each country, one column at a time
    data.countries.forEach(function(country){
      textAlign(RIGHT)
      fill(0,0,180)
      text(info.details[country].atmosphere, x-1, y)

      textAlign(LEFT)
      fill(200,0,0)
      text(info.details[country].underground, x+1, y)

      y += rowHeight // shift downward to next row
    })

    x += colWidth // shift rightward to next col
  }

}

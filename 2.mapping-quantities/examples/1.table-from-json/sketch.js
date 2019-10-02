var totals
var atmospheric
var underground

function preload(){
  totals = loadJSON('data/totals.json')
  atmospheric = loadJSON('data/atmospheric.json')
  underground = loadJSON('data/underground.json')
}

function setup(){
  createCanvas(3200, 600)
  background(230)

  // pick one of the three data files to work with and call it 'data'
  var data = totals

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
  for (var country in data.tests){
    text(country, x-colWidth, y)
    y += rowHeight
  }


  textStyle(NORMAL)
  textAlign(CENTER)
  for (var i=0; i<data.years.length; i++){
    y = 100

    // draw the year labels in the header row
    var year = data.years[i]
    fill(30)
    text(year, x, y-rowHeight)

    // print out the total for each country, one row at a time
    for (var country in data.tests){
      var value = data.tests[country][i]
      text(value, x, y)
      y += rowHeight
    }

    x += colWidth
  }

}

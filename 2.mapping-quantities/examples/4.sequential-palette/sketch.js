var table

function preload(){
  table = loadTable('data/totals.csv', 'csv', 'header')
}

function setup(){
  createCanvas(3900, 250)
  background(127)
  noStroke()
  textAlign(CENTER)
  textSize(16)

  // calculate the total number of tests per year (and also the max in any given year)
  var years = []
  var totals = []
  var lowest = 0
  var highest = 0
  for (var r=0; r<table.getRowCount(); r++){
    var sum = 0
    var year = table.getString(r, 0)
    for (var c=1; c<table.getColumnCount(); c++){
      sum += table.getNum(r, c)
    }

    years.push(year)
    totals.push(sum)
    highest = Math.max(sum, highest)
  }

  // draw a box for each year and set its color based on the total number of tests
  var x = 100
  var y = 100
  var dim = 50
  var numberOfShades = 9
  var palette = Brewer.sequential('BuPu', numberOfShades, lowest, highest)

  for (var i=0; i<years.length; i++){
    // draw the box
    var color = palette.colorForValue(totals[i])
    fill(color)
    rect(x, y, dim, dim)

    // draw the year number on top
    fill('white')
    text(years[i], x+dim*.5, y+dim*.6)
    x+=dim
  }

}

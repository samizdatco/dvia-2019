var table

function preload() {
  table = loadTable("data/significant_month.csv", "csv", "header")
}

function setup() {
  createCanvas(720, 405)
  background(200)

  // define top left and bottom right corner of our plot
  var x_left = 50;
  var x_right = width - x_left;
  var y_top = 50;
  var y_bot = height- y_top;

  // draw a background rectangle for the plot
  fill(255)
  noStroke()
  rectMode(CORNERS)
  rect(x_left, y_top, x_right, y_bot)

  // calculate minimum and maximum values for both
  var magnitudeMin = 0.0;
  var magnitudeMax = columnMax(table, "mag")

  var depthMin = 0.0;
  var depthMax = columnMax(table, "depth")

  // get the two arrays of interest: depth and magnitude
  // then cycle through the parallel arrays
  var depths = columnValues(table, "depth")
  var magnitudes = columnValues(table, "mag")
  for(var i=0; i<depths.length; i++){
    //map the x position to the time
    var x = map(depths[i],depthMin, depthMax, x_left, x_right)

    // map the y position to magnitude
    var y = map(magnitudes[i],magnitudeMin, magnitudeMax, y_bot, y_top)

    // draw the dot
    strokeWeight(5)
    stroke(255,0,0)
    point(x,y)
  }

  // // alternatively, iterate through the rows of the table and request 
  // // the column values by name
  // for (var r=0; r<table.getRowCount(); r++){
  //   var row = table.getRow(r)

  //   //map the x position to the time
  //   var x = map(row.getNum('depth'), depthMin, depthMax, x_left, x_right)

  //   // map the y position to magnitude
  //   var y = map(row.getNum('mag'), magnitudeMin, magnitudeMax, y_bot, y_top)

  //   // draw the dot
  //   strokeWeight(5)
  //   stroke(255,0,0)
  //   point(x,y)
  // }
}

// get the values of a given column as an array of numbers
function columnValues(tableObject, columnName){
  // get the array of strings in the specified column
  var colStrings = tableObject.getColumn(columnName)
  // convert to a list of numbers by running each element through the `float` function
  return _.map(colStrings, _.toNumber)
}

// get the maximum value within a column
function columnMax(tableObject, columnName){
    return _.max(columnValues(tableObject, columnName))
}

// get the minimum value within a column
function columnMin(tableObject, columnName){
    return _.min(columnValues(tableObject, columnName))
}


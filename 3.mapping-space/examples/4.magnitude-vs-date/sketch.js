// position for the plot
var x_left, y_top; // top left corner
var x_right, y_bot; // bottom right corner

// minimum and maximum values for data and time
var magnitudeMin, magnitudeMax;
var table;

function preload() {
  //my table is comma separated value "csv"
  //and has a header specifying the columns labels
  table = loadTable("data/significant_month_simple.csv", "csv", "header");
}

function setup() {
  createCanvas(720, 405);
  background(200);

  // define top left and bottom right corner of our plot
  x_left = 50;
  x_right = width - x_left;
  y_top = 50;
  y_bot = height- y_top;

  // draw a background rectangle for the plot
  fill(255);
  noStroke();
  rectMode(CORNERS);
  rect(x_left, y_top, x_right, y_bot);

  strokeWeight(5);
  stroke(255,0,0);
  drawDataPoints();
}

function drawDataPoints(){
  // get the two arrays of interest: time and magnitude
  var times = columnValues(table, "timestamp");
  var magnitudes = columnValues(table, "mag");

  // get minimum and maximum values for both
  var magnitudeMin = 0.0;
  var magnitudeMax = columnMax(table, "mag");
  var timeMin = columnMin(table, 'timestamp')
  var timeMax = columnMax(table, 'timestamp')

  // cycle through array
  for(var i=0; i<times.length; i++){
    //map the x position to the time
    var x = map(times[i],timeMin, timeMax, x_left, x_right);
    // map the y position to magnitude
    var y = map(magnitudes[i],magnitudeMin, magnitudeMax, y_bot, y_top);
    point(x,y);
  }
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


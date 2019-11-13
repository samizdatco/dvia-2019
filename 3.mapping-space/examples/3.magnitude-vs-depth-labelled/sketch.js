// position for the plot
var x_left, y_top; // top left corner
var x_right, y_bot; // bottom right corner

// an array for the magnitude
var magnitudes;
// an array for depth
var depths;


// minimum and maximum values for magnitude and depth
var magnitudeMin, magnitudeMax;
var depthMin, depthMax;

var magnitudeInterval = 1.0;
var depthInterval = 50.0;

// table as the data set
var table;


function preload() {
  //my table is comma separated value "csv"
  //and has a header specifying the columns labels
  table = loadTable("data/significant_month.csv", "csv", "header");
}

function setup() {
  createCanvas(720, 405);
  background(200);

  // define top left and bottom right corner of our plot
  x_left = 110;
  x_right = width - 80;
  y_top = 60;
  y_bot = height- 80;

  // draw a background rectangle for the plot
  fill(255);
  noStroke();
  rectMode(CORNERS);
  rect(x_left, y_top, x_right, y_bot);

  // get the two arrays of interest: depth and magnitude
  depths = columnValues(table, "depth");
  magnitudes = columnValues(table, "mag");

  // get minimum and maximum values for both (rounding up the max value to leave a visual margin at the top)
  magnitudeMin = 0.0;
  magnitudeMax = ceil(columnMax(table, "mag")/magnitudeInterval) * magnitudeInterval;

  depthMin = 0.0;
  depthMax = columnMax(table, "depth");
  depthMax = ceil(columnMax(table, "depth")/depthInterval) * depthInterval;

  //draw the title for the current plot
  fill(0);
  textSize(16);
  text("Significant Earthquakes - Past 30 days", x_left, y_top-16);

  // label the axes
  drawMagnitudeLabels();
  drawDepthLabels();
  drawAxisLabels();

  // draw the data points
  drawDataPoints();
}


// draw labels for magnitude on the left
function drawMagnitudeLabels(){
  fill(128);
  // we increase i by the interval, which are the sections
  for (var i=0; i<=magnitudeMax; i+=magnitudeInterval){
    noStroke();
    textSize(8);
    textAlign(RIGHT, CENTER);

    // map y to the plotting surface
    var y = map(i, magnitudeMin, magnitudeMax, y_bot, y_top);

    // write value
    text(floor(i), x_left-10, y);

    // add visual tick mark
    stroke(128);
    strokeWeight(1);
    line(x_left-4, y, x_left-1, y);
  }
}

// draw labels for magnitude on the left
function drawDepthLabels(){
  fill(128);
  // we increase i by the interval, which are the sections
  for (var i=0; i<=depthMax; i+=depthInterval){
    noStroke();
    textSize(8);
    textAlign(CENTER, CENTER);
    
    // map y to the plotting surface
    var x = map(i, depthMin, depthMax, x_left, x_right);

    // draw a line for each interval
    strokeWeight(1);
    stroke(240);
    line(x, y_top,x,y_bot);

    // write value
    noStroke();
    text(floor(i), x, y_bot+15);
  }
}

// draw labels "Magnitude" and "Depth" next to each of the axes
function drawAxisLabels(){
  fill(0);
  textSize(13);
  textAlign(CENTER, CENTER);
  text("Magnitude", 50, (y_top+y_bot)/2);
  textAlign(CENTER);
  text("Depth", (x_left+x_right)/2, y_bot+40);
}


function drawDataPoints(){
  strokeWeight(5);
  stroke(255,0,0);
  // cycle through array
  for(var i=0; i<depths.length; i++){
    //map the x position to the depth
    var x = map(depths[i],depthMin, depthMax, x_left, x_right);
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


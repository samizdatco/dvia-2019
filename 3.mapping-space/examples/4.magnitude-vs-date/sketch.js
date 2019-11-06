// position for the plot
var plotX1, plotY1; // top left corner
var plotX2, plotY2; // bottom right corner

// minimum and maximum values for data and time
var magnitudeMin, magnitudeMax;
var timeMin, timeMax;

// table as the data set
var table;

// an array for the time
var times;
// an array for the magnitude
var magnitudes;

function preload() {
  //my table is comma separated value "csv"
  //and has a header specifying the columns labels
  table = loadTable("data/significant_month_simple.csv", "csv", "header");
}

function setup() {
  createCanvas(720, 405);
  background(200);

  // define top left and bottom right corner of our plot
  plotX1 = 50;
  plotX2 = width - plotX1;
  plotY1 = 50;
  plotY2 = height- plotY1;

  // draw a background rectangle for the plot
  fill(255);
  noStroke();
  rectMode(CORNERS);
  rect(plotX1, plotY1, plotX2, plotY2);

  strokeWeight(5);
  stroke(255,0,0);
  drawDataPoints();
}

function drawDataPoints(){
  // get the two arrays of interest: time and magnitude
  times = table.getColumn("timestamp");
  magnitudes = table.getColumn("mag");

  // get minimum and maximum values for both
  magnitudeMin = 0.0;
  magnitudeMax = getColumnMax("mag");
  timeMin = times[0];
  timeMax = times[times.length-1];

  // cycle through array
  for(var i=0; i<times.length; i++){
    //map the x position to the time
    var x = map(times[i],timeMin, timeMax, plotX1, plotX2);
    // map the y position to magnitude
    var y = map(magnitudes[i],magnitudeMin, magnitudeMax, plotY2, plotY1);
    point(x,y);
  }
}

// get the maximum value within a column
function getColumnMax(columnName){
  var col = table.getColumn(columnName);
  // m is the maximum value
  // purposefully start this very low
  var m = 0.0;
  for(var i =0; i< col.length; i++){
    // each value within the column
    // that is higher than m replaces the previous value
    if(float(col[i])>m){
      m = float(col[i]);
    }
  }
  // after going through all rows, return the max value
  return m;
}

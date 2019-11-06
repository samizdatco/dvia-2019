// position for the plot
var plotX1, plotY1; // top left corner
var plotX2, plotY2; // bottom right corner

// an array for the magnitude
var magnitudes;
// an array for depth
var depths;


// minimum and maximum values for magnitude and depth
var magnitudeMin, magnitudeMax;
var depthMin, depthMax;

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
  plotX1 = 50;
  plotX2 = width - plotX1;
  plotY1 = 50;
  plotY2 = height- plotY1;

  // draw a background rectangle for the plot
  fill(255);
  noStroke();
  rectMode(CORNERS);
  rect(plotX1, plotY1, plotX2, plotY2);

  drawDataPoints();
}

function drawDataPoints(){
  strokeWeight(5);
  stroke(255,0,0);

  // get the two arrays of interest: depth and magnitude
  depths = table.getColumn("depth");
  magnitudes = table.getColumn("mag");
  // get minimum and maximum values for both
  magnitudeMin = 0.0;
  magnitudeMax = getColumnMax("mag");

  depthMin = 0.0;
  depthMax = getColumnMax("depth");

  // cycle through array
  for(var i=0; i<depths.length; i++){
    //map the x position to the time
    var x = map(depths[i],depthMin, depthMax, plotX1, plotX2);
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

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
  plotX1 = 110;
  plotX2 = width - 80;
  plotY1 = 60;
  plotY2 = height- 80;

  // draw a background rectangle for the plot
  fill(255);
  noStroke();
  rectMode(CORNERS);
  rect(plotX1, plotY1, plotX2, plotY2);


  // get the two arrays of interest: depth and magnitude
  depths = table.getColumn("depth");
  magnitudes = table.getColumn("mag");
  // get minimum and maximum values for both
  magnitudeMin = 0.0;
  // rounding up the max value to leave a visual margin at the top
  magnitudeMax = ceil(getColumnMax("mag")/magnitudeInterval) * magnitudeInterval;

  depthMin = 0.0;
  depthMax = getColumnMax("depth");
  depthMax = ceil(getColumnMax("depth")/depthInterval) * depthInterval;

  //draw the title for the current plot
  fill(0);
  textSize(16);
  text("Significant Earthquakes - Past 30 days", plotX1, plotY1-16);


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
    var y = map(i, magnitudeMin, magnitudeMax, plotY2, plotY1);

    // write value
    text(floor(i), plotX1-10, y);

    // add visual tick mark
    stroke(128);
    strokeWeight(1);
    line(plotX1-4, y, plotX1-1, y);
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
    var x = map(i, depthMin, depthMax, plotX1, plotX2);

   // draw a line for each interval
    strokeWeight(1);
    stroke(240);
    line(x, plotY1,x,plotY2);

    // write value
    noStroke();
    text(floor(i), x, plotY2+15);

  }
}

// draw labels "Magnitude" and "Year" next to each of the axes
function drawAxisLabels(){
  fill(0);
  textSize(13);
  textAlign(CENTER, CENTER);
  text("Magnitude", 50, (plotY1+plotY2)/2);
  textAlign(CENTER);
  text("Depth", (plotX1+plotX2)/2, plotY2+40);
}


function drawDataPoints(){
  strokeWeight(5);
  stroke(255,0,0);
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

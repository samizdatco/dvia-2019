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

//How much is one day in milliseconds?
// we will need this for calculations later
// 1000 milliseconds * 60 seconds * 60 minutes * 24 hours
var tsDay = 1000 * 60 * 60 * 24;

var magnitudeInterval = 1.0;

function preload() {
  //my table is comma separated value "csv"
  //and has a header specifying the columns labels
  table = loadTable("data/significant_month_simple.csv", "csv", "header");
}

function setup() {
  createCanvas(720, 405);
  background(230);

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

  // get the two arrays of interest: time and magnitude
  times = table.getColumn("timestamp");
  magnitudes = table.getColumn("mag");

  // get minimum and maximum values for both
  magnitudeMin = 0.0;
  // rounding up the max value to leave a visual margin at the top
  magnitudeMax = ceil(getColumnMax("mag")/magnitudeInterval) * magnitudeInterval;

  // the minimum for time should be the first date - one day
  timeMin = times[0]-tsDay;

  // the maximum for time should be the last date + one day
  timeMax = float(times[times.length-1]) + tsDay;

  //draw the title for the current plot
  fill(0);
  textSize(16);
  text("Significant Earthquakes - Past 30 days", plotX1, plotY1-16);

  // draw the lables for magnitude on the left
  drawMagnitudeLabels();

  // draw the lables for date at the bottom
  drawDateLabels();

  // draw the labels for both axes
  drawAxisLabels();

  // draw the actual points
  drawDataPoints();
}


// draw the two data points
function drawDataPoints(){
  strokeWeight(5);
  stroke(255,0,0);
  // cycle through array
  for(var i=0; i<times.length; i++){
    //map the x position to the time
    var x = map(times[i],timeMin, timeMax, plotX1, plotX2);
    // map the y position to magnitude
    var y = map(magnitudes[i],magnitudeMin, magnitudeMax, plotY2, plotY1);
    point(x,y);
  }
}

// draw labels "Magnitude" and "Year" next to each of the axes
function drawAxisLabels(){
  fill(0);
  textSize(13);
  textAlign(CENTER, CENTER);
  text("Magnitude", 50, (plotY1+plotY2)/2);
  textAlign(CENTER);
  text("Year", (plotX1+plotX2)/2, plotY2+40);

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

// draw date labels
// we need to find full days, independent of the actual earthquake events
function drawDateLabels(){
    textSize(8);
    textAlign(CENTER);
    // what is the first day in our plot?
    var firstDay = Math.floor(timeMin);

    // how many days are we plotting total?
    var totalDays = Math.floor((timeMax - timeMin))/1000/60/60/24;

  for(var i=0; i<totalDays; i++){
    var dayCount = firstDay+(i*tsDay);
    // find the x position for each day
    var x = map(dayCount,timeMin, timeMax, plotX1, plotX2);

    // draw a line for each day
    strokeWeight(1);
    stroke(240);
    line(x, plotY1,x,plotY2);

    // write the label in clear text
    // convert the label into a date object again
    var d = new Date(firstDay+dayCount);

    // and write it out in clear text
    var dateNow =  (d.getUTCMonth()+1) + "/" + d.getUTCDate();
    noStroke();
    text(dateNow, x,plotY2+15);
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
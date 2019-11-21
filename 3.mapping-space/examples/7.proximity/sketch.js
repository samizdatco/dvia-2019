var table;

function preload() {
  table = loadTable("data/significant_month.csv", "csv", "header");
}

function setup() {
  createCanvas(1200, 600);
  textSize(10);

  // starting position for the drawing
  var xPos = 50;
  var yPos = 50;

  for (var r=0; r<table.getRowCount(); r++){
    var row = table.getRow(r)
    var lat = row.getNum('latitude')
    var lng = row.getNum('longitude')
    var closest = Cities.closestTo(lat, lng)

    var y = yPos + r*20
    var x = xPos
    text(row.getString('mag'), x, y)
    
    x+= 40
    text(row.getString('place'), x, y)

    x+= 200
    text(`closest to: ${closest[0].name}, ${closest[0].country}`, x, y)

    x+= 200
    var pop = closest[0].population
    if (pop>=1000000){
      text(`population ${(pop/1000000).toFixed(1)} million`, x, y)
    }else{
      text(`population ${numberWithCommas(pop)}`, x, y)
    }

    x+= 200
    text(`distance ${floor(closest[0].distance)} km`, x, y)

    x+= 200
    text(`compass direction: ${floor(closest[0].direction)}°`, x, y)
  }
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
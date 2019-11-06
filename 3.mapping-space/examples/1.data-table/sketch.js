// starting position for the drawing
var xPos = 50;
var yPos = 50;


var table;

function preload() {
  table = loadTable("data/significant_month.csv", "csv");
}

function setup() {
  createCanvas(1200, 600);
  textSize(10);

  textStyle(BOLD);
  for (var c = 0; c < table.getColumnCount(); c++) {
    text(table.getString(0, c), xPos + c*150, yPos);
  }

  yPos = yPos+5;
  textStyle(NORMAL);
  //cycle through the table
  for (var r = 1; r < table.getRowCount(); r++){
    for (var c = 0; c < table.getColumnCount(); c++) {
      text(table.getString(r, c), xPos + c*150, yPos+r*15);
    }
  }
}
// Given the following CSV file called "olympics.csv"
// located in the project's "assets" folder:
// year,city,winUSA
// 1980,"Moscow",false
// 1984,"Los Angeles",true
// 1988,"Seoul",false

// starting position for the drawing
var xPos = 50;
var yPos = 50;

var table;

function preload() {
  // table is comma separated value "csv" file and has a header specifying the columns labels
  // passing "header" as the final argument means that the resulting table object will exclude
  // that header row from the data for us
  table = loadTable("assets/olympics.csv", "csv", "header");
}

function setup() {
  createCanvas(800, 600);
  textSize(20);

  // dump the table to the console
  print(table);

  // count the columns
  print(table.getRowCount() + " total rows in table");
  print(table.getColumnCount() + " total columns in table");

  // title the table
  textSize(32);
  textStyle(BOLD);
  text("The Olympics in the ’80s", xPos, yPos)
  yPos += 50;

  // writing the headers
  textSize(20);
  text("Year", xPos, yPos);
  text("City", xPos+150, yPos);
  text("USA #1?", xPos+300, yPos);
  text("USA Medals", xPos+450, yPos);

  // set the text style back to normal
  textStyle(NORMAL);

  // add vertical distance between header and rows
  yPos += 30;

  // cycle through the table by counting row & column indices
  for (var r = 0; r < table.getRowCount(); r++){
    for (var c = 0; c < table.getColumnCount(); c++) {
      var val = table.getString(r, c);
      var x = xPos + c * 150;
      var y = yPos + r * 30;
      text(val, x, y);
    }
  }

  // alternatively, cycle through using iterators & row objects
  fill('grey')
  textStyle(ITALIC)
  translate(0, 120)
  table.rows.forEach(function(row, r){
    table.columns.forEach(function(col, c){
      var val = row.obj[col]; // or row.arr[c];
      var x = xPos + c * 150;
      var y = yPos + r * 30;
      text(val, x, y);
    })
  })

}
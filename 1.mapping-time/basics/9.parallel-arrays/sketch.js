// a numbers array
var years = [1980, 1984, 1988];

// a string array
var cities = ["Moscow", "Los Angeles", "Seoul"];

// a boolean array (true or false)
var winUSA = [false, true, false];

// another array of numbers
var medalsUSA = [0, 174, 94]

// starting position for the drawing
var xPos = 50;
var yPos = 50;

function setup(){
  createCanvas(800, 600);
  textStyle(BOLD);

  textSize(32);
  text("The Olympics in the ’80s", xPos, yPos)
  yPos += 50;

  // writing the headers
  textSize(20);
  text("Year", xPos, yPos);
  text("City", xPos+150, yPos);
  text("USA #1?", xPos+300, yPos);

  // writing the 3 columns in rows
  textStyle(NORMAL);

  // move down tothe line below the header row
  yPos += 30;

  for(var i=0; i<3; i++){
    text(years[i], xPos, yPos+i*30);
    text(cities[i], xPos+150, yPos+i*30);
    text(winUSA[i] ? '👍' : '👎', xPos+300, yPos+i*30);
  }
}
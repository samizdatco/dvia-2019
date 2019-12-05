// starting position for the drawing
var xPos = 50;
var yPos = 50;


var table;

function preload() {
  table = loadTable("data/significant_month.csv", "csv", "header");
}

function setup() {
  createCanvas(1200, 600);
  textSize(10);

  // sort the rows of the table from largest to smallest magnitude
  table = sortTable(table, '-mag')

  // print the column heading row
  textStyle(BOLD);
  for (var c = 0; c < table.getColumnCount(); c++) {
    text(table.columns[c], xPos + c*150, yPos);
  }
  yPos = yPos+20;

  //cycle through the table and print each row in turn
  textStyle(NORMAL);
  for (var r = 0; r < table.getRowCount(); r++){
    for (var c = 0; c < table.getColumnCount(); c++) {
      text(table.getString(r, c), xPos + c*150, yPos+r*15);
    }
  }
}


function sortTable(origTable, columnName){
  // Returns a copy of a Table object whose rows are ordered according to values in the specified column
  // 
  // By default the rows in the table will be sorted in ascending order. If you pass a 
  // column name with a '-' at the start of it, the rows will be sorted in descending order.
  // 
  const key = _.trim(columnName,'-'),
        table = _.extend(new p5.Table(), {columns:origTable.columns}),
        columnVal = ({obj}) => _.isNaN(_.toNumber(obj[key])) ? obj[key] : _.toNumber(obj[key]),
        cloneRow = ({obj, arr}) => _.extend(new p5.TableRow(), {obj, arr, table}),
        sorted = _.sortBy(origTable.rows, columnVal).map(cloneRow),
        rows = _.startsWith(columnName, '-') ? _.reverse(sorted) : sorted;

  return _.extend(table, {rows})
}

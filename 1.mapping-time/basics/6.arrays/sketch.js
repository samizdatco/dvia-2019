/*
An array is a list of data 'elements'. Each piece of data in an array is identified by an index
number representing its position in the array. Arrays are zero based, which means that the first
element in the array is [0], the second element is [1], and so on. Here we're printing out the
contents of a series of different arrays.

Arrays can contain values of any other datatype. Here, the contents are printed to the console
one at a time. Note that strings can also be treated as if they were arrays too, but containing
a list of individual characters.
*/


function setup(){
  createCanvas(200,100)
  text('look in the console ⤵', 20,20)

  var values = [0,1,2,3,4];
  var booleanValues = [false, true, false, false];
  var textValues = ["red", "blue", "white"];
  var charValues = "polymorphism☃";

  print('VALUES:', values);
  for (var i=0; i<values.length; i++){
    print(values[i]);
  }

  print('BOOL VALUES:', booleanValues);
  for (var i=0; i<booleanValues.length; i++){
    print(booleanValues[i]);
  }

  print('TEXT VALUES:', textValues);
  for (var i=0; i<textValues.length; i++){
    print(textValues[i]);
  }

  print('CHAR VALUES:', charValues);
  for (var i=0; i<charValues.length; i++){
    print(charValues[i]);
  }

  print('Iterating w/ Array.forEach():')
  textValues.forEach(function(val, i){
    print(i, val)
  })
}


var data

function preload(){
  data = loadJSON('data/totals.json')
}

function setup(){
  createCanvas(800, 600)

  print(data)
}

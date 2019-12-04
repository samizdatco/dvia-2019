var jsonData

function preload() {
  jsonData = loadJSON('data/all_day.geojson')
}

function setup() {
  createCanvas(2200, 1800);
  background(0)

  // create a color scale we can use for assigning colors based on magnitude
  var magScale = chroma.scale('YlOrRd').mode('lch').domain([0, 10])

  // convert the raw geoJSON feed we loaded from the USGS into a plain array of objects
  var quakes = unpackJSON(jsonData)
  
  /* try uncommenting the next line and sorting by different attribute */
  // quakes = sortQuakes(quakes, 'depth') // '-depth' means sort from deepest to shallowest
  quakes = sortQuakes(quakes, '-mag') // 'mag' means sort from smallest to largest

  print(`${quakes.length} seismic events found`)
  print(`largest magnitude: ${maxValue(quakes, 'mag')}`)
  print(`intensity range: ${minValue(quakes, 'mmi')}–${maxValue(quakes, 'mmi')}`)
  print('a sample item from the quakes array:', quakes[0])

  translate(100,100)
  for (var i=0; i<quakes.length; i++){
    var quake = quakes[i]

    // draw a dot for the magnitude
    noStroke()
    fill(magScale(quake.mag).hex())
    circle(0,0, quake.mag * 4)

    // draw a line for the depth
    stroke(255)
    strokeWeight(2)
    line(25,10, 25+quake.depth/5, 10)

    // typeset the place name
    noStroke()
    fill(130)
    textStyle(ITALIC)
    text(quake.place, 25, 4)

    // use translate to change position before looping to draw the next quake
    var maxRows = 50
    if ((i+1)%maxRows==0){
      // new column
      resetMatrix()
      translate(100 + 350*ceil(i/maxRows),100)
    }else{
      // move to next row
      translate(0, 32)
    }
    
  }

}



function unpackJSON(feed, sortAttr){
  // Converts the USGS's geojson feed into an array of quake objects and optionally sorts them 
  // based on the specified attribute name (if present)
  //
  // Each object in the list contains the following attributes:
  //    longitude, latitude, depth, mag, place, time, updated, tz, url, 
  //    detail, felt, cdi, mmi, alert, status, tsunami, sig, net, code, 
  //    ids, sources, types, nst, dmin, rms, gap, magType, type,
  // 
  // See the ComCat documentation page for details on what each attribute encodes:
  //    https://earthquake.usgs.gov/data/comcat/data-eventterms.php
  // 
  let quakes = _.map(feed.features, item => {
    let [longitude, latitude, depth] = item.geometry.coordinates
    return _.extend({longitude, latitude, depth}, item.properties)
  })
  return sortAttr ? sortQuakes(quakes, sortAttr) : quakes
}

function sortQuakes(quakeArray, sortAttr){
  // Sorts an array of quake objects based on the attribute name you supply. 
  // 
  // By default the list of quakes returned by the function will be sorted in ascending order.
  // If you pass an attribute name with a '-' at the start of it, the quakes will be sorted in 
  // descending order instead. e.g.,
  // 
  //    var quakes = unpackJSON(jsonData)
  //    var chronological = sortQuakes(quakes, 'time')
  //    var reverseChron = sortQuakes(quakes, '-time')
  // 
  var sorted = _.sortBy(quakeArray, _.trim(sortAttr,'-'))
  return _.startsWith(sortAttr, '-') ? _.reverse(sorted) : sorted
}

function maxValue(quakeArray, attr){
  // searches through all the quakes in an array to find the largest value for a particular attribute
  return _.max(_.map(quakeArray, attr))
}

function minValue(quakeArray, attr){
  // searches through all the quakes in an array to find the smallest value for a particular attribute
  return _.min(_.map(quakeArray, attr))
}


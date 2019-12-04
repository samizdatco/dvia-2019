var table

function preload() {
  table = loadTable("../../data/2.5_month.csv", "csv", "header")
}

function setup() {
  var globe = L.map('quake-map', {worldCopyJump: true}).setView([30, -90], 3)
  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      maxZoom: 18, id: 'mapbox.streets',
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      accessToken: 'pk.eyJ1IjoiZHZpYTIwMTciLCJhIjoiY2o5NmsxNXIxMDU3eTMxbnN4bW03M3RsZyJ9.VN5cq0zpf-oep1n1OjRSEA',
  }).addTo(globe)

  // before querying the Tectonic plate/fault data, you need to let it know which map you're using
  Tectonic.useMap(globe)

  // use lodash to count up the number of earthquakes per plate and store them in an object whose
  // attributes are place names and values are integers with the total counts
  var plateCounts = _.countBy(table.rows, function(row){
    // Tectonic.findPlate() takes a [lat,lng] coordinate and returns a string with the name of the 
    // plate that contains that point
    return Tectonic.findPlate(row.getNum('latitude'), row.getNum('longitude'))
  })
  print('plate counts:', plateCounts)

  // define a palette so we can color code the plates based on # earthquakes
  var palette = Brewer.sequential('YlGnBu', Infinity, 0, max(_.values(plateCounts)))

  // the variable Tectonic.plates is an array of geoJson 'feature' objects. Each feature has two attributes:
  // 'properties' and 'geometry'. We can use geometry to create a leaflet layer and properties to get (among other 
  // things) the name of the plate
  for (var i=0; i<Tectonic.plates.length; i++){
    var plate = Tectonic.plates[i]
    var name = plate.properties.name
    var count = _.get(plateCounts, name, 0)
    var clr = palette.colorForValue(count)

    var layer = L.geoJSON(plate.geometry)
    layer.setStyle({fillColor:clr, weight:0, fillOpacity:.5})
         .bindTooltip(`${name}: ${count} earthquakes`)
         .addTo(globe)
  }

  // for each earthquake in the csv, add a marker to the map with a radius that's proportional to the magnitude
  for (var r=0; r<table.getRowCount(); r++){
    var quake = table.getRow(r)
    var lat = quake.getNum('latitude')
    var lng = quake.getNum('longitude')
    var place = quake.getString('place')
    var style = {
      weight:0,
      fillColor:'#FA6200',
      fillOpacity:.7,
      radius:map(quake.getNum('mag'), 2.5, 7, 2, 12)
    }

    // place a marker at the quake's lat/lng coordinates
    L.circleMarker([lat, lng], style).bindTooltip(place).addTo(globe)

    // add two additional copies which appear to the  east and west of the 'real' marker on the 
    // rotations of the world that wrap around at the edges of the screen
    L.circleMarker([lat, lng-360], style).bindTooltip(place).addTo(globe) // 360° to the west
    L.circleMarker([lat, lng+360], style).bindTooltip(place).addTo(globe) // 360° to the east
  }
}



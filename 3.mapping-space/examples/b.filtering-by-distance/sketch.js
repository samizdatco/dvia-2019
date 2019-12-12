var globe
var quakes
var allDots

// these are the options we'll pass to .setStyle based on whether a given dot should be highlighted
var DEFAULT = {fillColor:'Tomato', weight:0, radius:4}
var ACTIVE = {fillColor:'OrangeRed', weight:3, radius:8}
var PASSIVE = {fillColor:'Coral', weight:0, radius:2}

function preload() {
  quakes = loadTable("data/all_month.csv", 'csv', 'header')
}

function setup() {
    // first, create a leaflet map (look in the html's style tag to set its dimensions)
    globe = L.map('quake-map', {worldCopyJump:true}).setView([37, -120], 7);
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.streets',
        accessToken: 'pk.eyJ1IjoiZHZpYTIwMTciLCJhIjoiY2o5NmsxNXIxMDU3eTMxbnN4bW03M3RsZyJ9.VN5cq0zpf-oep1n1OjRSEA'
    }).addTo(globe);

    // add markers for a couple cities and have each of them call filterByCity when clicked
    L.marker([34.05223, -118.24368])
     .bindTooltip('Los Angeles')
     .on('click', filterByCity)
     .addTo(globe)

    L.marker([37.77493, -122.41942])
     .bindTooltip('San Francisco')
     .on('click', filterByCity)
     .addTo(globe)

    // have clicks on the map itself (i.e. anywhere that's not a marker) reset the current filter
    globe.on('click', clearFilter)

    // create an empty list where we can hold onto references to all the earthquake markers we're about to create
    allDots = []

    // add a marker to the map for each earthquake in the feed
    for (var r=0; r<quakes.rows.length; r++){
      var row = quakes.getRow(r)

      // skip rows with missing data (otherwise you'll get a NaN error if the magnitude or depth column is blank)
      if (row.getString('mag')=='' || row.getString('depth')=='') continue

      var quakeLat = row.getNum('latitude')
      var quakeLng = row.getNum('longitude')
      var quakeMag = row.getNum('mag').toFixed(1)
      var quakeDepth = row.getNum('depth').toFixed(2)
      var popupHTML = `<h3>${row.getString('place')}</h3><b>Magnitude</b> ${quakeMag}<br><b>Depth</b> ${quakeDepth} km`

      var dot = L.circleMarker([quakeLat, quakeLng], {fillOpacity:1, color:'white'})
                 .setStyle(DEFAULT)
                 .bindPopup(popupHTML)
                 .addTo(globe)

      // keep a reference to this marker around so we can show/hide it later on
      allDots.push(dot)
    }
}



/*
 *   This pair of functions will change the style of the dots to highlight the ones that are near the city
 *   whose marker was just clicked. The clearFilter function will reset all their colors to the default when
 *   you click anywhere else on the map.
 */

function filterByCity(e){
  var cityLoc = e.target.getLatLng() // the coords of the city we just clicked on
  var cutoff = 200 // how close a quake needs to be to the city to be considered 'nearby' (in km)

  // step through each of markers we added earlier and change the dot's style based on whether it's
  // within our cutoff radius of the selected city
  for (var i=0; i<allDots.length; i++){
    var quakeDot = allDots[i]
    var quakeLoc = quakeDot.getLatLng()
    var distance = cityLoc.distanceTo(quakeLoc) / 1000 // divide by 1000 to convert to km

    if (distance<=cutoff){
      quakeDot.setStyle(ACTIVE)
    }else{
      quakeDot.setStyle(PASSIVE)
    }
  }
}

function clearFilter(){
  for (var i=0; i<allDots.length; i++){
    var quakeDot = allDots[i]
    quakeDot.setStyle(DEFAULT)
  }
}



/*
 *   This pair of functions actually removes the non-nearby earthquakes from the map rather than just drawing them
 *   differently. Note that you need to do a bit more checking in the if-statement to make sure you don't try to
 *   re-add a marker that's already on the map or remove one that's already been yanked.
 *
 *   If you uncomment these functions, make sure to comment out the other implementations of filterByCity
 *   and clearFilter above...
 */

// function filterByCity(e){
//   var cityLoc = e.target.getLatLng() // the coords of the city we just clicked on
//   var cutoff = 200 // how close a quake needs to be to the city to be considered 'nearby' (in km)
//
//   for (var i=0; i<allDots.length; i++){
//     var quakeDot = allDots[i]
//     var quakeLoc = quakeDot.getLatLng()
//     var distance = cityLoc.distanceTo(quakeLoc) / 1000 // divide by 1000 to convert to km
//     var isOnMap = globe.hasLayer(quakeDot)
//
//     if (distance<=cutoff && !isOnMap){
//       globe.addLayer(quakeDot)
//     }else if (distance>cutoff && isOnMap){
//       globe.removeLayer(quakeDot)
//     }
//   }
// }

// function clearFilter(){
//   for (var i=0; i<allDots.length; i++){
//     var quakeDot = allDots[i]
//     var isOnMap = globe.hasLayer(quakeDot)
//     if (!isOnMap){
//       globe.addLayer(quakeDot)
//     }
//   }
// }
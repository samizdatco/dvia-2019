var table

function preload() {
    // load the CSV data into our `table` variable and clip out the header row
    table = loadTable("../../data/2.5_month.csv", "csv", "header");
}

function setup() {
    // first, create a leaflet map (look in the html's style tag to set its dimensions)
    var globe = L.map('quake-map', {worldCopyJump: true}).setView([30, -90], 3)
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.streets',
        accessToken: 'pk.eyJ1IjoiZHZpYTIwMTciLCJhIjoiY2o5NmsxNXIxMDU3eTMxbnN4bW03M3RsZyJ9.VN5cq0zpf-oep1n1OjRSEA',
    }).addTo(globe);

    // before querying the Tectonic plate/fault data, you need to let it know which map you're using
    Tectonic.useMap(globe)

    // use lodash to count up the number of earthquakes per faultline and store them in an object whose
    // attributes are fault names and values are integers with the total counts
    var faultCounts = _.countBy(table.rows, function(row){
      // Tectonic.findFault() takes a [lat,lng] coordinate and returns an object with fields for
      // 'latitude', 'longitude', 'distance', and 'name' describing which fault (and where along it)
      // the quake is closest to. The distance value is in kilometers and latitude/longitude are the 
      // the closest point to the quake on the fault.
      return Tectonic.findFault(row.getNum('latitude'), row.getNum('longitude')).name
    })

    // the variable Tectonic.plates is an array of geoJson 'feature' objects. 
    // Add each to the map as a blue line...
    for (var i=0; i<Tectonic.faults.length; i++){
        var fault = Tectonic.faults[i]
        var name = fault.properties.name

        var layer = L.geoJSON(fault.geometry)
        layer.setStyle({
            color:'blue', 
            weight:1, 
            opacity:1, 
            fillOpacity:0
        }).bindTooltip(`${name} fault: ${faultCounts[name]} quakes`).addTo(globe)
    }

    // step through the earthquakes csv and add a small dot for each one
    for (var r=0; r<table.rows.length; r++){
        var row = table.getRow(r)
        var lat = row.getNum('latitude')
        var lng = row.getNum('longitude')
        var mag = row.getNum('mag')
        var place = row.getString('place')

        // find the intersection point with the nearest fault
        var closest = Tectonic.findFault(lat, lng)

        // draw a line connecting the quake to the closest faultline nearby
        L.polyline([[lat, lng], [closest.latitude, closest.longitude]], {
            color:'red',
            weight:1
        }).bindTooltip(`${closest.distance.toFixed(1)} km from ${closest.name} fault`).addTo(globe)

        // draw a marker at the location of the quake itself
        L.circleMarker([lat, lng], {
            weight:2,
            color:'red',
            fillColor:'white',
            fillOpacity:1,
            radius:3
        }).bindTooltip(`<b>${mag.toFixed(1)}</b> · ${place}`).addTo(globe)
    }

}
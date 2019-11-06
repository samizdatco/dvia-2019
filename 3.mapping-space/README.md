# Exercise 3: Mapping Space and Frames of Reference

In this exercise you will be concerned with the space on the screen as much as the marks you place on it. This will be true both because you'll be creating a traditional, cartographic map (for which space & position have obvious informational analogs) and because you'll be combining the map view with a second diagram of your own design that will exist in conversation with it.


### Preliminaries

The new library we'll be using for the mapping portion of this exercise is called **Leaflet.js**. Take a look at its [API Reference](https://leafletjs.com/reference-1.3.4.html) and [Tutorials](https://leafletjs.com/examples.html) which you'll likely find helpful as you customize your [tile set](https://leaflet-extras.github.io/leaflet-providers/preview/) and add [markers](https://leafletjs.com/reference-1.3.4.html#marker), [pop-ups](https://leafletjs.com/reference-1.3.4.html#popup), [tooltips](https://leafletjs.com/reference-1.3.4.html#tooltip), and the like.

Take a look at the P5 wiki page on [Integrating other Libraries](https://web.archive.org/web/20171006203545/https://github.com/processing/p5.js/wiki/Integrating-other-libraries) for an overview of how to interact with the functions provided by external libraries.

The Leaflet.js [Quick Start](http://leafletjs.com/examples/quick-start/) provides a good introduction to setting up a map and adding markers to it.

### Goal

- Create both a diagrammatic _and_ a geospatial visualization of recent seismic activity using one of the [live data feeds](http://earthquake.usgs.gov/earthquakes/feed/v1.0/csv.php) provided by the USGS in CSV format. All the fields are explained in the left column and links to the feeds are in the sidebar on the right. For your convenience a snapshot of all the feeds (some of which are quite large) is in the `data` folder alongside your `sketch.js` file.
- Either choose from one of the ‘significant earthquakes’ feeds ([hourly](https://github.com/samizdatco/dvia-2019/blob/master/3.mapping-space/data/significant_hour.csv), [daily](https://github.com/samizdatco/dvia-2019/blob/master/3.mapping-space/data/significant_day.csv), [weekly](https://github.com/samizdatco/dvia-2019/blob/master/3.mapping-space/data/significant_week.csv), [monthly](https://github.com/samizdatco/dvia-2019/blob/master/3.mapping-space/data/significant_month.csv)), or pick your own quake-magnitude threshold from the items in the sidebar.
  - Note that if you pick a shorter timescale, your visualization should  account for the fact that there may be no datapoints and/or pick a lower threshold to increase the number of points.
- Use the depth, magnitude, location, time, and text fields to design a visualization that reflects current earthquake activity in terms of magnitude and recency. Examine quantitative differences in 1-hour, 1-day, 7-day, or 30-day data sets.
- Incorporate magnitude and one other earthquake attribute (depth, time, etc) and experiment with different ways of encoding numerical values using size, shape, texture, and color.
- To get a feel for the ways you can combine and separate different aspects of the data, try opening one of the CSVs in a spreadsheet program and using pivot tables, histograms, filters, etc. to explore what’s available in the feed.
- For the extra-ambitious:
  - Add at least one UI element to control the representation of your data (e.g. range, focus, filter)
  - Experiment with pre-processing the data. Try grouping different events based on commonalities (e.g., location, size, depth range) and reporting them in terms of sums or averages. In other words, just because there are 36 rows in your CSV, that doesn't mean there have to be precisely 36 dots in your visualization!


### Process

- As before, we’ll be loading data from external files and will need to use the local HTTP server. Remember to run `make server` from the command line before opening up `http://localhost:8000` in your browser.
- The USGS provides ‘live’ data via its [feeds](http://earthquake.usgs.gov/earthquakes/feed/v1.0/csv.php) but for ease of development, I've created a snapshot of today’s feeds in the `data` folder. Also note that there are snapshots from previous years in the `data/2017` and `data/2018` folders. Try selecting different feeds by changing the `loadTable()` call in your sketch and see how your representation changes based on different data.
	- If you want to pull new data down from the USGS, try running the script at [`data/update.sh`](https://github.com/samizdatco/dvia-2019/blob/master/3.mapping-space/data/update.sh). It will replace the contents of all the CSV files in the `data` folder with the newest information.

### Review

For this assignment, brush up on these commands & constructs from last time:

- The [coordinate system](https://processing.org/tutorials/drawing/)
- Shape primitives: [`rect()`](https://p5js.org/reference/#/p5/rect)/[`ellipse()`](https://p5js.org/reference/#/p5/ellipse)/[`arc()`](https://p5js.org/reference/#/p5/arc)/[`line()`](https://p5js.org/reference/#/p5/line)
- Setting colors: [`fill()`](https://p5js.org/reference/#/p5/fill)/[`stroke()`](https://p5js.org/reference/#/p5/stroke)
- Mixing colors: [`color()`](https://p5js.org/reference/#/p5/color)/[`lerpColor()`](https://p5js.org/reference/#/p5/lerpColor)/[`Brewer`](https://github.com/samizdatco/dvia-2019/blob/master/2.mapping-quantities/libraries/brewer.js#L24)
- Iteration: [`for(…;…;…)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for)/[`[].forEach(…)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)/[`while(…)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/while)

Also recall the utility functions for dealing with data files & normalizing or interpolating numerical values:

- Structured data: [`loadTable()`](https://p5js.org/reference/#/p5/loadTable)/[`loadJSON()`](https://p5js.org/reference/#/p5/loadJSON)
- Interpolation: [`map()`](https://p5js.org/reference/#/p5/map)/[`norm()`](https://p5js.org/reference/#/p5/norm)


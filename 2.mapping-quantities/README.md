# Exercise 2: Mapping Quantities, Categories, and Summarized Data

For this second exercise, we'll be examining a simple time-series dataset: the history of nuclear testing by the eight (declared) nuclear nations. In the first phase of this project we will consider only the total number of test explosions across three dimensions:

1. the state conducting the test
2. the year in which it occurred
3. whether it was above- or underground

Despite the simplicity of the data, there are a number of ways to slice and group the data. Some things to consider:

* Is each year plotted separately, or are the totals grouped into decades or some other multi-year chunk
* Is time represented by position on the *x* or *y* axis? Or by angle? Or using color?
* What are the 'objects' being represented in your diagram? Are they the countries, the years, or the individual tests?
* How will your diagram address the 'lull' that resulted from the [Comprehensive Test Ban Treaty](https://en.wikipedia.org/wiki/Comprehensive_Nuclear-Test-Ban_Treaty) in ’96 and the more recent resurgence in testing?


### Preliminaries

Starting with this project, we'll be making use of external files to separate the data we're plotting from the code that does the actual drawing. Getting this to work means becoming acquainted with a couple implementational details of the browser environment.

The first is the idea that retrieving information over the network is not instantaneous and that some time will pass between when you ‘request’ your data file and the moment where its contents are available to your script. To work around this, p5 allows you to define a function called [preload](https://p5js.org/reference/#/p5/preload) which will run before your `setup` or `draw` functions begin. In our case, that function will be used to call either [`loadTable`](https://p5js.org/reference/#/p5/loadTable) (which fetches a CSV file) or [`loadJSON`](https://p5js.org/reference/#/p5/loadJSON) (for, unsurprisingly, JSON data). In either case, you'll want to make sure you follow a procedure along the lines of:

```js
var externalData; // declare a global variable to store the data

function preload() {
  // start fetching the data and assign it to your global
  externalData = loadJSON('http://example.com/some/file.json');
}

function setup(){
    // ... use the global externalData variable here (or in draw)
}
```

The second browser-related issue is the [Same-origin Policy](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy) which requires that all the files your page touches come from the same domain. Thus far, we've been opening our `index.html` files directly (which gives them a URL beginning with `file:///`). Unfortunately, this is incompatible with loading external data files, so we’ll need to run a local web server (giving everything an `http://localhost/` URL).

To install the server, navigate to your `dvia-2018` folder in the Terminal, and then type:

```sh
npm install
```

After a few seconds you should see messages indicating that the ‘http-server’ package (among others) have been installed. This is a one-time step that won't be required again in the future.

From now on, you'll be able to start the server by navigating to that folder in the Terminal and then typing:

```sh
npm start
```

You'll then see a message along the lines of:

```
Starting up http-server, serving .
Available on:
  http://localhost:8080
Hit CTRL-C to stop the server
```

Now try pasting that `http://localhost:8080` url into your browser, and then start clicking on folders to navigate to your student directory. Once you're done working, you can type Control-c in the terminal window to shut down the server (or just close its window and click the **Terminate** button).

### Getting started

Begin your investigation with this simplified dataset collected from the Natural Resources Defense Council's pages on the [original](https://web.archive.org/web/20160326002858/http://www.nrdc.org/nuclear/nudb/datab15.asp) and [subcontinental](https://web.archive.org/web/20160326003901/http://www.nrdc.org/nuclear/nudb/datab22.asp) nuclear powers.

Examine the [`data`](https://github.com/samizdatco/dvia-2018/2.mapping-quantities/data) subdirectory of the project folder which contains JSON & CSV versions of the table below. Then look at the scripts in the [`examples`](https://github.com/samizdatco/dvia-2018/2.mapping-quantities/examples) folder. These scripts build on our work learning the p5 drawing primitives in three major ways:

1. setting drawing parameters with structured, [tabular data](https://p5js.org/reference/#/p5.Table) rather than hard-coded values
2. working with serialized [JSON](https://p5js.org/reference/#/p5/loadJSON) and [CSV](https://p5js.org/reference/#/p5/loadTable) data
3. using loops to render multiple ‘instances’ (a.k.a. rows) of a data set using the same procedure each time

Start by modifying the code in the example scripts and explore some of the different ways to represent the country, year, and test-count values. Make 'snapshot' copies of your script as you modify it so you can build up an array of different approaches.

### Next steps

Over the next week, continue working with this dataset and sketch out **three different approaches** to representing it in a way that tells a story.

Confine yourself to static, non-interactive representations for now, but consider any medium that could represent these values; posters, projections, and physical representations are all just as valid as pixels on a screen.

In at least one of your three variations, bring in **one additional variable** using data you find on the web and be sure to cite your source. This additional variable could be anything from a timeline of world events to the military budgets of the countries (or even the astrological signs of their leaders). Just make sure you can defend how it is in some way adding useful context to the data.

Feel free to use whatever tools you're comfortable with. Programmatic drawing can be very handy but so can Excel…

### Data sources

This [spreadsheet](https://docs.google.com/spreadsheets/d/1ysSAHVZtK3KImoHR2LXT3C_ZQbNCVihu3Fk6Y-bk9Yg/edit?usp=sharing) on Google Docs has a tidied up copy of the NRDC data and provides both the total number of tests as well as distinguishing between 'atmospheric' or 'underground' tests. Consider making use of a [pivot table](https://support.google.com/docs/answer/1272900?co=GENIE.Platform%3DDesktop&hl=en) to modify/summarize the information, and then export it as a csv for your own usage.

Also consider taking a look at the Wikipedia page [listing the various tests](https://en.wikipedia.org/wiki/List_of_nuclear_weapons_tests) and providing links to country-specific pages with background information about the individual tests.

For geographical data, take a look at the materials collected at [“Johnston's Archive”](http://www.johnstonsarchive.net/nuclear/tests/). But keep in mind that using a map opens quite a few cans of worms, so be sure to have a clear idea of what you're trying to communicate before diving in...

#### Supplemental materials

I've assembled a cleaned-up [csv file](https://github.com/samizdatco/dvia-2018/2.mapping-quantities/data/johnstons-archive.csv) with most of the Johnston's Archive data. If you're looking for information about the naming schemes of the individual tests, yield estimates, locations, dates, etc. it may be helpful...

Lawrence Livermore National Laboratory recently released the declassified 2400 FPS films of many of their atmospheric nuclear tests. Those of you whose projects are dealing with specific tests rather than the summary statistics may find stills from the videos useful in your work. Take a look at their [playlist](https://www.youtube.com/playlist?list=PLvGO_dWo8VfcmG166wKRy5z-GlJ_OQND5) on YouTube.



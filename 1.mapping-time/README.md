# Exercise 1: Mapping Time

### Preliminaries

Gather all the necessary software and files to get started:

- The [Sublime Text 3](http://www.sublimetext.com) (or comparable) text editor
- The [GitHub Desktop](https://desktop.github.com) GUI client
- Create *your own fork* of https://github.com/samizdatco/dvia-2019

The P5.js [site](https://p5js.org) has an extensive [Reference](https://p5js.org/reference/) section with a full listing of the drawing commands that make up its API. It’s also got a somewhat sparser set of [Tutorials](https://p5js.org/learn/) that *might* help you get started (but mostly seem to be written to an audience that’s familiar with the original [Processing](http://processing.org/) environment so YMMV).

For this assignment, make sure you’ve got a handle on these basics:

- The [coordinate system](https://processing.org/tutorials/drawing/)
- Shape primitives: [`rect()`](https://p5js.org/reference/#/p5/rect)/[`ellipse()`](https://p5js.org/reference/#/p5/ellipse)/[`arc()`](https://p5js.org/reference/#/p5/arc)/
[`line()`](https://p5js.org/reference/#/p5/line)
- Setting colors: [`fill()`](https://p5js.org/reference/#/p5/fill)/[`stroke()`](https://p5js.org/reference/#/p5/stroke)/[`background()`](https://p5js.org/reference/#/p5/background)
- Mixing colors: [`color()`](https://p5js.org/reference/#/p5/color)/[`lerpColor()`](https://p5js.org/reference/#/p5/lerpColor)
- Iteration: [`for(…;…;…)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for)/[`[].forEach(…)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)/[`while(…)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/while)

Your project files are also set up to allow you to use a pair of exceedingly useful libraries (though don’t feel like you need to learn them immediately). Take a look at their documentation pages and see if anything jumps out at you:

* [lodash](https://lodash.com/docs) – the unnoficial 'standard library' of javascript with utility functions for every use-case under the sun
* [chroma](https://vis4.net/chromajs/) – powerful color-math functions useful for interpolating between colors, applying hue/saturation/brightness transformations, etc.

To get yourself situated, try looking over the sample code in the [examples](./examples) directory. Note the basic form of each of the programs (i.e., their `setup()` and `draw()` definitions), how they employ the drawing commands listed above, and particularly their use of *variables* to hold partial computations and *for-loops* to encapsulate repeated procedures.


### Dataset

For this project the ‘data’ you'll be working with are the numerical aspects of time. You should familiarize yourself with the [`clock()`](libraries/clock.js) function I've provided to help access the current date & time. The function returns a time [Object](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Basics) with the current instant broken down into individual components. You can get numerical values for `hour`, `min`, `sec`, and `ms` on the time side of things and `year`, `season`, `month`, `moon`, `day`, and `weekday` if you’re interested in dates.

For instance, you can use the current year to work backwards:

```js
var now = clock(),
    age = 64,
    born = now.year - age;
print(`A ${age}-year-old would have been born in ${born}`)
```

To determine what half of the day it currently is, access the `am` and `pm` attributes, each of which contains a Boolean. You could conceivably use this to set the background color depending on whether it’s before- or afternoon.

```js
function draw(){
  var now = clock()
  if (now.pm){
    background(0)
  }else{
    background(255)
  }
}
```

The object returned by *clock()* also provides a mechanism for measuring the current time in terms of the cyclic features of the calendar. By accessing fields of its `progress` attribute, you can get the fraction of various periods that have elapsed before the current moment. The clock represents progress as a number between *0* and *1* for each of: `year`, `season`, `moon`, `month`, `week`, `day`, `halfday`, `hour`, `min`, and `sec`.

For instance, if you wanted to be fairly literal and draw a progress bar for the day, try drawing a black rectangle whose width is proportional to the ‘doneness’ of the current 24-hour cycle:

```js
function draw(){
  background(255)
  noStroke()
  fill(0)

  var now = clock(),
      pct = now.progress.day;
  rect(0,0, width*pct, height)
}
```


The full set of attributes you can access via the clock function is as follows:

```js
var now = clock()

// numerical values for elements of current time
now.hours // hour in 0–23 'military' time
now.hour  // hour in 1–12 'am/pm' time
now.min   // minute
now.sec   // seconds
now.ms    // milliseconds
now.am    // true for hours 0-11
now.pm    // true for hours 12-23

// numerical values for elements of current date
now.year    // the full 4-digit year
now.month   // month number 1–12
now.moon    // the fullness of the moon 0–1.0
now.day     // the day 1–{28,29,30,31}
now.weekday // the day of the week 1-7
now.season  // the current season 1-4 (starting with spring)

// a string-based representation that can be used as an argument to clockStart
now.timestamp // "2001/12/31 23:45:56"

// values between 0.0 and 1.0 measuring the current time's %-completion of various cycles
now.progress.year
now.progress.season
now.progress.month
now.progress.moon
now.progress.week
now.progress.day
now.progress.halfday
now.progress.hour
now.progress.min
now.progress.sec

// string versions of the date & time (in case you want to print it out)
now.text.time    // "11:45:56 P.M."
now.text.hour    // "11"
now.text.hours   // "23"
now.text.min     // "45"
now.text.sec     // "56"
now.text.ampm    // "P.M."
now.text.date    // "31 Dec 2001"
now.text.year    // "2001"
now.text.season  // "Winter"
now.text.month   // "December"
now.text.mon     // "Dec"
now.text.day     // "31"
now.text.weekday // "Monday"
```

### Goal

- Create a visual representation of the current local time using only graphics primitives, symbols, and formal elements like color/texture/size — no text or alphanumeric characters!
- Use the *clock()* function so that your sketch is always displaying the *current* time in your [`draw()`](https://p5js.org/reference/#/p5/draw) function.
- This is to be a creative interpretation of the idea of a clock. Your focus should be on inventiveness and polished visuals. 
- Your interpretation needs to be legible to you (the author), and you need to be able to explain how the time is derived visually at any given point. 
- Your clock concept needs a name (put that in the `<title>` tag of the `index.html` file).
- For the extra-ambitious:
  * Rather than just plotting the current time as a static quantity, plot the relative amount of time between 2 or more ‘events’ in a given day. Consider tracking your own behavior or the occurrence of a repeating event in the world and depicting when it happens – relative either to the time-of-day or to other occurrences.
  * Calendar time is **much** more [complicated](http://infiniteundo.com/post/25326999628/falsehoods-programmers-believe-about-time) than ‘wall clock’ time. But you can attempt to visualize days, weeks, months, seasons, years, etc. using the date-related fields in the `progress` attribute ... if you dare.
  * The *clock()* function uses the [Moment.js](https://momentjs.com) library behind the scenes for its calculations. You can access the `moment` attribute of the time object if you want to do anything more sophisticated than what *clock()* is already unpacking.


### Process

- Start off by making some hand-drawn (or mocked up in a drawing app) sketches of clock ideas and put these images into the `process` folder of your subdirectory.
- Update the `README.md` file in your `process` folder describing what’s in your various sketch files, the logic of the representation, etc. Be sure to explain, either in words or diagrammatically, your chosen mapping of time components to Bertin-ian Retinal Variables.
- Start coding by editing the `project/sketch.js` file. If you want to explore multiple options in parallel, use the Finder’s **Duplicate** command to clone the whole `project` directory and give it a sensible name (i.e., not just `project copy` or `project2`). You can then start working on the `sketch.js` in the new folder without disturbing your previous work.
- Commit your changes whenever you’ve made some modifications that feel like they’re in a stable state (or if you stumble onto a glitchy visual that points in a direction you’d like to explore). This will let you ‘rewind’ to that point in the future if you’ve hit a dead-end or need to remember how you did something.
- When you make a commit, select just the files (or even just the lines within one) that are part of the ‘conceptual unit’ of change that you made and type a brief description of what changed into the Summary field.
- Sync your local repository with the copy on GitHub before the start of class next week.

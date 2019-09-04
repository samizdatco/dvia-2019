// clock.js
// © 2018 Samizdat Drafting Co. All Rights Reserved.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

(function(){
  // ---- accessor functions --------------------------------------------------
  function clockSpeed(multiplier){
    if (isNaN(multiplier))
      return console.error(`Clock speed must be a positive or negative number (not "${multiplier}")`)
    _epoch = now()
    _since = moment()
    _speed = multiplier
  }

  function clockStart(timestamp){
    if (!moment(timestamp, _formats, true).isValid())
      return console.error('Specify start time using a string of the form:', _formats.map(f => moment().endOf('year').format(f)))
    _epoch = moment(timestamp, _formats)
  }

  function clockOffset(steps, stepSize){
    let stepSizes = ['years', 'quarters', 'months', 'weeks', 'days', 'hours', 'minutes', 'seconds', 'milliseconds']
    if (isNaN(steps) || stepSizes.indexOf(stepSize.replace(/s?$/,'s'))==-1)
      return console.error('Offsets must be specified with a number of steps, and a step-size such as:', stepSizes)
    _epoch.add(steps, stepSize);
  }


  // ---- snapshot of current moment  -----------------------------------------
  function clock(){
    let t = now(),
        {phase, light} = moon(t),
        {name, num, doneness} = season(t);

    return {
      // numerical values for elements of current time
      hours:t.hour(),     // hour in 0–23 'military' time
      hour:to12hour(t),   // hour in 1–12 'am/pm' time
      min:t.minute(),     // minute
      sec:t.second(),     // seconds
      ms:t.millisecond(), // milliseconds
      am:isAM(t),         // true for hours 0-11
      pm:!isAM(t),        // true for hours 12-23

      // numerical values for elements of current date
      year:t.year(),     // the full 4-digit year
      month:t.month()+1, // month number 1–12
      moon:light,        // the fullness of the moon 0–1.0
      day:t.date(),      // the day 1–{28,29,30,31}
      weekday:t.day()+1, // the day of the week 1-7
      season:num,        // the current season 1-4 (starting with spring)

      // a string-based representation that can be used as an argument to clockStart
      timestamp:t.format('Y/M/D H:mm:ss'),

      // values between 0.0 and 1.0 measuring the current time's %-completion of various cycles
      progress:{
        year:progress(t, 'year'),
        season:doneness,
        month:progress(t, 'month'),
        moon:phase,
        week:progress(t, 'week'),
        day:progress(t, 'day'),
        halfday:progress(t, 'day') % .5 / .5,
        hour:progress(t, 'hour'),
        min:progress(t, 'minute'),
        sec:progress(t, 'second')
      },

      // string versions of the date & time (in case you want to print it out)
      text:{
        time:t.format('h:mm:ss A'),
        hour:t.format('h'),
        hours:t.format('HH'),
        min:t.format('mm'),
        sec:t.format('ss'),
        ampm:t.format('A'),

        date:t.format('D MMM Y'),
        year:t.format('Y'),
        season:name,
        month:t.format('MMMM'),
        mon:t.format('MMM'),
        day:t.format('D'),
        weekday:t.format('dddd'),

        // for custom text-formatting see https://momentjs.com/docs/#/displaying/format/
        format:(fmt) => t.format(fmt)
      },

      // the datetime object itself
      moment:t
    }
  }

  // ---- internal state & helpers --------------------------------------------
  let _formats = ['Y/M/D h:m:s a', 'Y/M/D H:m:s', 'Y/M/D h:m a', 'Y/M/D H:m', 'Y/M/D', 'h:m:s a', 'H:m:s', 'h:m a', 'H:m'],
      _seasons = [{months:[3,4,5], name:'Spring'}, {months:[6,7,8], name:'Summer'}, {months:[9,10,11], name:'Autumn'}, {months:[12,1,2], name:'Winter'} ],
      _epoch = moment(),
      _since = moment(),
      _speed = 1.0;

  const now = () => moment(_epoch).add(_speed * moment().diff(_since), 'ms'),
        isAM = t => t.hour() < 12,
        to12hour = t => (t.hour() + 11) % 12 + 1,
        progress = (t, timeslice) => {
          let start = moment(t).startOf(timeslice),
              end = moment(t).endOf(timeslice);
          return t.diff(start) / end.diff(start)
        },
        season = t => {
          let [mt, yr] = [t.month()+1, t.year()];
          for (var i=0; i<_seasons.length; i++){
            if (_seasons[i].months.indexOf(mt)<0) continue
            let {months, name} = _seasons[i],
                start = moment({month:months[0]-1, year:months[0]>mt ? yr-1 : yr}).startOf('month'),
                end = moment({month:months[2]-1, year:months[2]<mt ? yr+1 : yr}).endOf('month');
            return {name, num:i+1, doneness:t.diff(start) / end.diff(start)}
          }
        };

  // ---- moon-math -----------------------------------------------------------
  // (adapted from https://github.com/ryanseys/lune/blob/master/lib/lune.js)
  const fixangle = (a) => a - 360.0 * Math.floor(a / 360.0),
        torad = (d) => (Math.PI / 180.0) * d,
        todeg = (r) => (180.0 / Math.PI) * r,
        dsin = (d) => Math.sin(torad(d)),
        dcos = (d) => Math.cos(torad(d));

  function kepler (m, ecc) {
    const epsilon = 1e-6

    m = torad(m)
    let e = m
    while (1) {
      const delta = e - ecc * Math.sin(e) - m
      e -= delta / (1.0 - ecc * Math.cos(e))

      if (Math.abs(delta) <= epsilon) break
    }

    return e
  }

  function moon(t){
    const EPOCH = 2444238.5,
          ECLIPTIC_LONGITUDE_EPOCH = 278.833540, // Ecliptic longitude of the Sun at epoch 1980.0
          ECLIPTIC_LONGITUDE_PERIGEE = 282.596403, // Ecliptic longitude of the Sun at perigee
          ECCENTRICITY = 0.016718, // Eccentricity of Earth's orbit
          MOON_MEAN_LONGITUDE_EPOCH = 64.975464, // Moon's mean longitude at the epoch
          MOON_MEAN_PERIGEE_EPOCH = 349.383063, // Mean longitude of the perigee at the epoch
          phase_date = +t / 86400000 + 2440587.5,
          day = phase_date - EPOCH;

    // calculate sun position
    const sun_mean_anomaly =
      (360.0 / 365.2422) * day +
      (ECLIPTIC_LONGITUDE_EPOCH - ECLIPTIC_LONGITUDE_PERIGEE)
    const sun_true_anomaly =
      2 * todeg(Math.atan(
        Math.sqrt((1.0 + ECCENTRICITY) / (1.0 - ECCENTRICITY)) *
        Math.tan(0.5 * kepler(sun_mean_anomaly, ECCENTRICITY))
      ))
    const sun_ecliptic_longitude =
      ECLIPTIC_LONGITUDE_PERIGEE + sun_true_anomaly
    const sun_orbital_distance_factor =
      (1 + ECCENTRICITY * dcos(sun_true_anomaly)) /
      (1 - ECCENTRICITY * ECCENTRICITY)

    // calculate moon position
    const moon_mean_longitude =
      MOON_MEAN_LONGITUDE_EPOCH + 13.1763966 * day
    const moon_mean_anomaly =
      moon_mean_longitude - 0.1114041 * day - MOON_MEAN_PERIGEE_EPOCH
    const moon_evection =
      1.2739 * dsin(
        2 * (moon_mean_longitude - sun_ecliptic_longitude) - moon_mean_anomaly
      )
    const moon_annual_equation =
      0.1858 * dsin(sun_mean_anomaly)
    const moon_mp =
      moon_mean_anomaly +
      moon_evection -
      moon_annual_equation -
      0.37 * dsin(sun_mean_anomaly)
    const moon_equation_center_correction =
      6.2886 * dsin(moon_mp)
    const moon_corrected_longitude =
      moon_mean_longitude +
      moon_evection +
      moon_equation_center_correction -
      moon_annual_equation +
      0.214 * dsin(2.0 * moon_mp)
    const moon_age =
      fixangle(
        moon_corrected_longitude -
        sun_ecliptic_longitude +
        0.6583 * dsin(
          2 * (moon_corrected_longitude - sun_ecliptic_longitude)
        )
      )

      return {
        phase:(1.0 / 360.0) * moon_age,
        light:0.5 * (1.0 - dcos(moon_age))
      }
  };

  // ---- configure dependencies ----------------------------------------------
  moment.updateLocale('en', {
    meridiem:function(hour, minute, isLowercase){
      let ampm = hour<12 ? 'A.M.' : 'P.M.'
      return isLowercase ? ampm.toLowerCase() : ampm
    }
  });

  // ---- exports -------------------------------------------------------------
  window.clockStart = clockStart
  window.clockSpeed = clockSpeed
  window.clockOffset = clockOffset
  window.clock = clock
})()

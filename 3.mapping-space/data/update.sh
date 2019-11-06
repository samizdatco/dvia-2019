#!/bin/sh
#
# Fetch local copies of the various USGS feeds
# (see https://earthquake.usgs.gov/earthquakes/feed/v1.0/csv.php for details)
#
# You can also use these full URLs in a loadTable call in your preload() function, but loading
# them from this folder will prevent you from repeatedly downloading potentially large files
# over the internet (meaning reloads will be faster and you won't annoy the USGS...).
#
# You can run this script by typing `./update.sh` after `cd`ing into the data directory
#

cd "$( dirname "${BASH_SOURCE[0]}" )"
mv *.csv $HOME/.Trash

# Past Hour
curl -O https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_hour.csv # 'significant' quakes
curl -O https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_hour.csv # magnitude ≥ 4.5
curl -O https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_hour.csv # magnitude ≥ 2.5
curl -O https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_hour.csv # magnitude ≥ 1.0
curl -O https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.csv # 'all' quakes (even tiny ones)

# Past Day
curl -O https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_day.csv
curl -O https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_day.csv
curl -O https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_day.csv
curl -O https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_day.csv
curl -O https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.csv

# Past 7 Days
curl -O https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_week.csv
curl -O https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.csv
curl -O https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.csv
curl -O https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_week.csv
curl -O https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.csv

# Past 30 Days
curl -O https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.csv
curl -O https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_month.csv
curl -O https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_month.csv
curl -O https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_month.csv
curl -O https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.csv

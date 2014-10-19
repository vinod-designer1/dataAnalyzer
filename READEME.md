Right now app only support csv files uploaded.
can be extend to use url or live data.
very basic ui need a lot of improvement.
Datasets are not stored need to add that capability
Requirment Node
run server by typing
node app.js
Structure
Build on concept of single page app
Everything in it is module
public/js 
 namespace analyzer is all app content
 widget.js - can be extend to use in any app. helps in creating graph widget
 graph.js - utilized by widget to produce graphs using highcharts.
 analyzer.dashboard.js - manages all app data and help in creating widgets
 analyzer.shell.js - Responsible for intiating app
 analyzer.util.js - basics utils used every where.
 analyzer.util_b.js - basics browser dependent utils.
 analyzer.reuquest.js - handles reuqest right now not being used need to modifications
 analzer.js - which intiates whole app.

BACKEND:
 parser.js - helps in extracting data from csv file

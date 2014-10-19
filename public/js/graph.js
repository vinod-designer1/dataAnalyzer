/*
 * graph.js
 * Helps to draw graph
*/

/*jslint         browser : true, continue : true,
  devel  : true, indent  : 2,    maxerr   : 50,
  newcap : true, nomen   : true, plusplus : true,
  regexp : true, sloppy  : true, vars     : false,
  white  : true
*/
/*global $ */

function Graph( data, $container, col, title) {
  this.data = data;
  this.title = title;
  this.$container = $container;
  this.xAxisCol = col;
  this.options = this.getChartOptions();
  this.charts = new Highcharts.Chart(this.options);
}

Graph.prototype.setXAxis = function (col) {
  Highcharts.setOptions({
    xAxis : {
      categories : analyzer.data.getDistinctValues(this.data, col)
    }
  });
};

Graph.prototype.addGraph = function( col, type ) {
  var graphOptions = {}, data, yData = {}, i,
      xval, yval,
      cols = {
        x: col,
        y: this.xAxisCol
      };
  if ( type === 'column' ) {
    data = analyzer.data.getFrequencies( this.data, cols );
    console.log(data);
    for (xval in data) {
      for (yval in data[xval]) {
      	console.log(yval);
        if (yData[yval] === undefined) {
          yData[yval] = [];
        }
        yData[yval].push(data[xval][yval]);
      }
    }

    for (yval in yData) {
      graphOptions = {};
      graphOptions.type = type;
      graphOptions.data = yData[yval];
      graphOptions.name = yval;

      this.charts.addSeries(graphOptions);
    }
  }
};

Graph.prototype.getChartOptions = function() {
  var options = {};
  options.chart = {
    renderTo : this.$container[0],
    height   : 400
  };
  options.title = {
    text : this.title
  };

  options.xAxis = {
    categories : analyzer.data.getDistinctValues(this.data, this.xAxisCol)
  };

  options.series = [];

  return options;
};

Graph.prototype.drawGraph = function() {
};

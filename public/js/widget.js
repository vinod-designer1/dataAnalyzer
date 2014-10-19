/*
 * widget.js
 * Graph Widgets
*/

/*jslint         browser : true, continue : true,
  devel  : true, indent  : 2,    maxerr   : 50,
  newcap : true, nomen   : true, plusplus : true,
  regexp : true, sloppy  : true, vars     : false,
  white  : true
*/
/*global $ */

// Widget
// Purpose: help to create graph widgets from data
// Arguments :
//   * data - which data to use fro graphs
//   * graphs - what graphs to produce using the data.
//
function Widget( id, data, $container ) {
  var that = this;
  this.data = data;
  this.id = id;
  this.$container = $container;
  this.graphLst = ['column'];
  this.addhtml();
  this.$mainContainer = this.$container.find('#widget_' + this.id);
  this.$graphContainer = this.$mainContainer.find('.dashborad-widget-graph');

  this.$mainContainer.find('.dashborad-widget-save').click(function(){
    that.save(that);
  });
}

Widget.prototype.addGraph = function( cols, graphType ) {
};

Widget.prototype.save = function(that) {
  var yAx = that.$mainContainer.find('.graphY').val(),
      xAx = that.$mainContainer.find('.graphX').val(),
      grpType = that.$mainContainer.find('.graphType').val();

  that.graph = new Graph(
      that.data,
      that.$graphContainer,
      that.data.cols[xAx],
      'Widget ' + that.id
    );
  that.graph.addGraph(that.data.cols[yAx], that.graphLst[grpType]);
};

Widget.prototype.update = function( data ) {
   
};

Widget.prototype.addhtml = function() {
  var html = String()
             + '<div id="widget_' +this.id+ '" class="dashborad-widget">'
               + '<div class="dashborad-widget-head">'
                 + analyzer.util_b.getOptionsHtml('graphX', 'x-axis', this.data.cols)
                 + analyzer.util_b.getOptionsHtml('graphY', 'y-axis', this.data.cols)
                 + analyzer.util_b.getOptionsHtml('graphType', 'Graphs', this.graphLst)
                 + '<button class="dashborad-widget-save">Save</button>'
               + '</div>'
               + '<div class="dashborad-widget-graph">'
               + '</div>'
             + '</div>';
  this.$container.append(html);
};
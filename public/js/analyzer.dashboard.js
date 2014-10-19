/*
 * analyzer.dashboard.js
 * Graph Dashboard for analysis
*/

/*jslint         browser : true, continue : true,
  devel  : true, indent  : 2,    maxerr   : 50,
  newcap : true, nomen   : true, plusplus : true,
  regexp : true, sloppy  : true, vars     : false,
  white  : true
*/
/*global $, analyzer */

analyzer.dashboard = (function() {
  'use strict';
  //---------------- BEGIN MODULE SCOPE VARIABLES --------------
  var
    configMap = {
      main_html : String()
        + '<div class="analyzer-dashboard-body>'
          + '<div class="analyzer-dashboard-head>'
            + '<button class="analyzer-dashboard-widget-btn">'
              + 'Add Widget'
            + '</button>'
          + '</div>'
          + '<div class="analyzer-dashboard-widgets">'
          + '</div>'
        + '</div>',
      dynamic_last_update : ''
    },
    stateMap = {
      $container   : undefined,
      dashboard_id : '',
      source_data_type    : '',
      data : {
        cols : [],
        rows : []
      }
    },
    jqueryMap = {},
    widgetContainer = [],
    attachEvents, clickWidgetBtn,
    initModule, loadUrl, handleStaticData,
    loadData, setColLabels, updateData, setJqueryMap,
    handleDynamicData, callbackForData;

  //--------------------- BEGIN DOM METHODS --------------------
  // Begin DOM method /setJqueryMap/
  setJqueryMap = function () {
    var $container = stateMap.$container;

    jqueryMap = {
      $container       : $container,
      $addWidgetBtn    : $container.find('.analyzer-dashboard-widget-btn'),
      $widgetContainer : $container.find('.analyzer-dashboard-widgets')
    };
  };
  // End DOM method /setJqueryMap/
  //--------------------- END DOM METHODS ----------------------

  //-------------------- BEGIN CALLBACK METHODS -----------------
  // Begin callback method /callbackForData/
  // Purpose: Handle data from server
  //
  callbackForData = function( data ) {
    
  };
  // End callback method /callbackForData/

  // Begin callback method /clickWidgetBtn/
  // Purpose: Handle data from server
  //
  clickWidgetBtn = function( data ) {
    var widget = new Widget(
      widgetContainer.length,
      stateMap.data,
      jqueryMap.$widgetContainer
    );
    widgetContainer.push(widget);
  };
  // End callback method /clickWidgetBtn//
  //-------------------- END CALLBACK METHODS -----------------

  //-------------------- BEGIN UTILITY METHODS -----------------
  // Begin utility /attachEvents/
  //
  attachEvents = function () {
    jqueryMap.$addWidgetBtn.click(clickWidgetBtn);
  };
  // End utility /attachEvents/

  // Begin utility /handleStaticData/
  handleStaticData = function(url, data_type) {
    var info = {
      url : url,
      callbacks : {
        success: callbackForData
      },
      datatype : data_type
    };
    analyzer.request.get(info);
  };
  // End utitlity /handleStaticData/

  // Begin utility /handleDynamicData/
  handleDynamicData = function(url, data_type) {
    var
      data = {
        lastUpdate : dynamic_last_update,
      },
      info = {
        url : url,
        data : data,
        callbacks : {
          success: callbackForData
        },
        datatype : data_type
      };
    analyzer.request.get(info);
  };
  // End utitlity /handleDynamicData/

  // Begin Utility /setColLabels/
  setColLabels = function ( labels ) {
    stateMap.data.cols = labels;
  };
  // End Utility /setColLabels/

  // Begin Utility /updateData/
  updateData = function ( data ) {
    for (var i = 0; i < data.length; ++i) {
      stateMap.data.rows.push( data[i] );
    }

    //@TODO need to update widgets
  };
  //--------------------- END UTILITY METHODS ------------------

  //------------------- BEGIN PUBLIC METHODS -------------------
  // Begin public method /loadData/
  loadData = function (data) {
    setColLabels( data['cols'] );
    updateData( data['data'] );
  };
  // End public method /loadData/

  // Begin Public method /loadUrl/
  // Purpose: set source point for the dashboard
  // Arguments: id, URL, type of source (static|dynamic), type of data coming from url
  // Action:
  //   * set source point
  //   * triggers data loding module to get and parse data.
  // @TODO: Reduce argument replace it with object
  //
  loadUrl = function (id, url, source_type, data_type, col_labels) {
    stateMap.dashboard_id     = id;
    stateMap.source_data_type = data_type;
    $.extend(true, stateMap.col_labels, col_labels);

    if ( source_type === 'static' ) {
      handleStaticData(url, data_type);
    } else if (source_type === 'dynamic') {
      handleDynamicData(url, data_type);
    }
  };
  // End Public method /loadUrl/

  // Begin Public method /initModule/
  // Example   : analyzer.dashboard.initModule( $('#app_div_id'));
  // Purpose   :
  //   Directs the Shell to offer its capability to the user
  // Arguments :
  //   * $container (example: $('#app_div_id')).
  //     A jQuery collection that should represent 
  //     a single DOM container
  // Returns   : none 
  // Throws    : none
  //
  initModule = function ( $dashboard ) {
    // load HTML and map jQuery collections
    stateMap.$container = $dashboard;
    $dashboard.html( configMap.main_html );
    setJqueryMap();

    attachEvents();

  };
  // End PUBLIC method /initModule/
  return {
    initModule : initModule,
    loadData   : loadData
  };
  //------------------- END PUBLIC METHODS ---------------------
}());
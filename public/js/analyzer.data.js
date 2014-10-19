/*
 * analyzer.data.js
 * Helps to perform queries on data
*/
/*jslint         browser : true, continue : true,
  devel  : true, indent  : 2,    maxerr   : 50,
  newcap : true, nomen   : true, plusplus : true,
  regexp : true, sloppy  : true, vars     : false,
  white  : true
*/
/*global $, analyzer */

analyzer.data = (function() {
  'use strict';
  //---------------- BEGIN MODULE SCOPE VARIABLES --------------
  var
    configMap = {
    },
    filter,
    convertToJSON, getFrequencies, getDistinctValues;
  //---------------- END MODULE SCOPE VARIABLES ----------------

  //---------------- BEGIN DATA PARSING METHODS ----------------
  // Begin method /convertToJSON/
  // Purpose: converting every data to Json Object
  // Arguments:
  //  * data     : data of string type
  //  * dataType : datatype of data
  //
  convertToJSON = function( data, dataType ) {
    
  };
  // End method /convertToJSON/
  //---------------- END DATA PARSING METHODS ------------------

  //---------------- BEGIN DATA MANIPULATION METHODS -----------
  // Begin method /getFrequencies/
  // reuturns: all labels & y values for correspoding x values
  // 
  getFrequencies = function( data, cols ) {
    var colYIdx, colXIdx, i, curData,
        frequencyLst = {};
    colYIdx = data.cols.indexOf( cols.y );
    colXIdx = data.cols.indexOf( cols.x );

    for (i = 0; i < data.rows.length; ++i) {
      curData = data.rows[i];
      if ( frequencyLst[ curData[colYIdx] ] === undefined ) {
        frequencyLst[ curData[colYIdx] ] = {};
      }

      if ( frequencyLst[ curData[colYIdx] ][ curData[colXIdx] ] === undefined ) {
        frequencyLst[ curData[colYIdx] ][ curData[colXIdx] ] = 0;
      }

      frequencyLst[ curData[colYIdx] ][ curData[colXIdx] ]++;
    }

    return frequencyLst;
  };
  // End method /getFrequencies/

  // Begin method /getDistinctValues/
  //
  getDistinctValues = function( data, col ) {
    var colIdx, valLst = [], i;
    colIdx = data.cols.indexOf( col );

    for (i = 0; i < data.rows.length; ++i) {
      if (valLst.indexOf(data.rows[i][colIdx]) === -1)
        valLst.push(data.rows[i][colIdx]);
    }

    return valLst;
  };
  // End method /getDistinctValues/

  // Begin method /filter/
  // reuturns: all labels & y values for correspoding x values
  //
  filter = function( data, cols , condition) {
    var colRIdx, colLIdx, i, curData,
        filteredData = [];
    colRIdx = data.cols.indexOf( cols.right );
    colLIdx = data.cols.indexOf( cols.left );

    for (i = 0; i < data.rows.length; ++i) {
      curData = data.rows[i];
      switch ( condition )
      {
      case '>' :
        if ( curData[colYIdx] > curData[colXIdx] )
          filteredData.push(curData);
        break;
      case '<' :
        if ( curData[colYIdx] < curData[colXIdx] )
          filteredData.push(curData);
        break;
      case '>=' :
        if ( curData[colYIdx] >= curData[colXIdx] )
          filteredData.push(curData);
        break;
      case '<=' :
        if ( curData[colYIdx] <= curData[colXIdx] )
          filteredData.push(curData);
        break;
      case '==' :
        if ( curData[colYIdx] === curData[colXIdx] )
          filteredData.push(curData);
        break;
      default:
        filteredData.push(curData);
      }
    }

    return filteredData;
  };
  //---------------- END DATA MANIPULATION METHODS -------------

  return {
    filter : filter,
    getFrequencies : getFrequencies,
    getDistinctValues : getDistinctValues
  };
}());
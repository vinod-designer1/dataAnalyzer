/*
 * analyzer.dataset.js
 * Manages uploading dataset and parsing them
*/

/*jslint         browser : true, continue : true,
  devel  : true, indent  : 2,    maxerr   : 50,
  newcap : true, nomen   : true, plusplus : true,
  regexp : true, sloppy  : true, vars     : false,
  white  : true
*/
/*global $, analyzer */

analyzer.request = (function() {
  'use strict';
  //---------------- BEGIN MODULE SCOPE VARIABLES --------------
  var
    configMap = {
      default_data_type : 'json'
    },
    get, post;

  //------------------- BEGIN PUBLIC METHODS -------------------
  // Begin public method /get/
  // Purpose: perform get request on given url
  // Arguments : info contains object with {url, callbacks, data, datatype}
  //  * callbacks: success, failure, 
  //
  get = function (info) {
    if ( info.url === '') {
      throw makeError('Ajax GET', 'Url Not Found');
    }

    if ( !analyzer.util.isAFunction(info.callbacks.success) ) {
      throw makeError('Ajax GET', 'Success callback needed');
    }

    if ( !data ) {
      data = {};
    }

    if ( !datatype ) {
      datatype = configMap.default_data_type;
    }

    var req = $.get(
      info.url,
      info.data,
      info.callbacks.success,
      info.datatype
    );

    if ( analyzer.util.isAFunction(info.callbacks.fail) ) {
      req.fail(info.callbacks.fail);
    }
  };
  // End public method /get/

  // Begin public method /post/
  // Purpose: perform post request on given url
  // Arguments : info contains object with {url, callbacks, data, datatype}
  //  * callbacks: success, failure, 
  //
  post = function (info) {
    if ( info.url === '') {
      throw makeError('Ajax GET', 'Url Not Found');
    }

    if ( !analyzer.util.isAFunction(info.callbacks.success) ) {
      info.callbacks.success = function( data ) {
        console.log('sucessfully posted!');
      };
    }

    if ( !info.data ) {
      info.data = {};
    }

    if ( !info.datatype ) {
      info.datatype = configMap.default_data_type;
    }

    var req = $.post(
      info.url,
      info.data,
      info.callbacks.success,
      info.datatype
    );

    if ( analyzer.util.isAFunction(info.callbacks.fail) ) {
      req.fail(info.callbacks.fail);
    }
  };
  // End public method /get/  
  //------------------- END PUBLIC METHODS ---------------------

  return {
    get  : get,
    post : post
  };
}());
/*
 * routes.js - module to provide routing
*/

/*jslint         node    : true, continue : true,
  devel  : true, indent  : 2,    maxerr   : 50,
  newcap : true, nomen   : true, plusplus : true,
  regexp : true, sloppy  : true, vars     : false,
  white  : true
*/
/*global */

// ------------ BEGIN MODULE SCOPE VARIABLES --------------
'use strict';
var configRoutes,
    parser = require('./parser'),
    sendResponse,
    staticDataRequest, dynamicDataRequest;
// ------------- END MODULE SCOPE VARIABLES ---------------

// ------------- BEGIN HELPER METHODS ---------------------
// Begin helper method /sendResponse/
sendResponse = function ( result, response ) {
  var res = {
        body : '',
        status_code : 200
      };

  res.body = result;
  if ( result && result['error'] ) {
    res.status_code = 400;
  } else {
    res.status_code = 200;
  }

  response.status(res.status_code).json(res.body);
};
// End helper method /sendResponse/

// Begin helper method /staticDataRequest/
staticDataRequest = function ( request, response ) {
  var file, csvJson, failed = true, result;

  if ( request.files && request.files['file-0'] ) {
    console.log('Found File.......');
    file = request.files['file-0'];
    if (file.headers['content-type'] === 'text/csv') {
      console.log('In Parsing CSV.......');
      parser.parseCSV(file.path, function ( result ) {
          sendResponse( result, response);
        });
      failed = false;
    } else {
      result = {'error': 'NOT SUPPORTED FILETYPE!!'};
    }
  } else {
    result = {'error': 'No File Found!'};
  }

  if ( failed ) {
    sendResponse( result, response );
  }
};
// End helper method /staticDataRequest/

// Begin helper method /dynamicDataRequest/
dynamicDataRequest = function ( request ) {
  var url = request.param('url'),
      res = {
        body : '',
        status_code : 200
      };
};
// End helper method /dynamicDataRequest/
// --------------  END HELPER METHODS ---------------------

// ---------------- BEGIN PUBLIC METHODS ------------------
configRoutes = function ( app, server ) {
  app.route( '/' )
     .get(function ( request, response ) {
        response.redirect( '/analyzer.html' );
      });

  app.route( '/dataset/create' )
     .get(function ( request, response ) {
       response.send('Hello World!');
     })
     .post(function ( request, response ) {
       var dataFrom = request.param('dataFrom'),
           res;
       if ( dataFrom === 'static' ) {
        staticDataRequest( request, response );
       } else if ( dataFrom === 'dynamic' ) {

       }
     });
};

module.exports = { configRoutes : configRoutes };
// ----------------- END PUBLIC METHODS -------------------

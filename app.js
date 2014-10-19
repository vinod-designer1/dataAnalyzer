/*
 * app.js - Express server with basic auth
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
var
  http    = require( 'http'     ),
  express = require( 'express'  ),
  routes  = require( './routes' ),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override'),
  errorHandler = require('errorhandler'),
  json = require('express-json'),
  multipart = require('connect-multiparty'),


  app     = express(),
  server  = http.createServer( app ),
  env = process.env.NODE_ENV || 'development';
// ------------- END MODULE SCOPE VARIABLES ---------------

// ------------- BEGIN SERVER CONFIGURATION ---------------
app.use(json());
app.use(bodyParser.urlencoded());
app.use(multipart());
app.use( methodOverride('X-HTTP-Method-Override') );
app.use( express.static( __dirname + '/public' ) );

if ( env === 'development' ) {
  app.use( errorHandler({
    dumpExceptions : true,
    showStack      : true
  }) );
} else if ( env === 'production' ) {
  app.use( errorHandler() );
}

routes.configRoutes( app, server );
// -------------- END SERVER CONFIGURATION ----------------

// ----------------- BEGIN START SERVER -------------------
server.listen( 8080 );
console.log(
  'Express server listening on port %d in %s mode',
   server.address().port, app.settings.env
);
// ------------------ END START SERVER --------------------
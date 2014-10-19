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
var csv = require('csv'),
    fs = require('fs'),
    parseCSV;
// ------------- END MODULE SCOPE VARIABLES ---------------

// ---------------- BEGIN PUBLIC METHODS ------------------
parseCSV = function ( path, callback) {

var parser = csv.parse({delimiter: ';'}, function(err, data){
  var csvJson, result;
  if ( err )
  {
    throw {'error' : 'Damaged File'};
  } else {
    csvJson = {
      cols : [],
      data : []
    };

    csvJson.cols = data[0].toString().split(",");

    for (var i = 1; i < data.length; ++i) {
      csvJson.data.push(data[i].toString().split(","));
    }

    callback( csvJson );
    
  }
});
fs.createReadStream(path).pipe(parser);

};

module.exports = { parseCSV : parseCSV };
// ----------------- END PUBLIC METHODS -------------------

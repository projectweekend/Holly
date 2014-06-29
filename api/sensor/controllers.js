var async = require( 'async' );
var models = require( './models' );
var handleRouteError = require( '../utils' ).handleRouteError;


exports.create = function ( req, res ) {

    var validation = function ( callback ) {
        // validation stuff happens here
    };

    var data = function ( data, callback ) {
        // database stuff happens here
    };

    async.waterfall( [ validation, data ], function ( err, sensorReading ) {

        if ( err ) {
            return handleRouteError( err, res );
        }

        return res.json( sensorReading, 201 );

    } );

};

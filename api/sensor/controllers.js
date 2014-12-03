var async = require( 'async' );
var SensorReading = require( './models' ).SensorReading;
var SensorStats = require( './models' ).SensorStats;
var handleRouteError = require( '../utils' ).handleRouteError;


exports.current = function ( messageBroker ) {
    return function ( req, res ) {
        messageBroker.publish( "sensor.get", { serialMessage: "A" }, function ( err, data ) {
            if ( err ) {
                return handleRouteError( err, res );
            }
            return res.json( data, 200 );
        } );
    };
};

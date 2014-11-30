var async = require( 'async' );
var SystemTemperature = require( './models' ).SystemTemperature;
var handleRouteError = require( '../utils' ).handleRouteError;


exports.current = function ( messageBroker ) {
    return function ( req, res ) {
        messageBroker.publish( "system.get", {}, function ( err, data ) {
            if ( err ) {
                return handleRouteError( err, res );
            }
            return res.json( JSON.parse( data ), 200 );
        } );
    };
};

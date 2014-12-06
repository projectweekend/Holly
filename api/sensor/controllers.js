var systemError = require( '../utils' ).systemError;
var handleRouteError = require( '../utils' ).handleRouteError;


exports.current = function ( messageBroker ) {
    return function ( req, res ) {
        messageBroker.publish( "sensor.get", { serialMessage: "A" }, function ( err, data ) {
            if ( err ) {
                return handleRouteError( systemError( "Sensor RPC Service Error" ), res );
            }
            return res.json( data, 200 );
        } );
    };
};

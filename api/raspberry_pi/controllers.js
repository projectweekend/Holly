var systemError = require( '../utils' ).systemError;
var handleRouteError = require( '../utils' ).handleRouteError;


exports.current = function ( messageBroker ) {
    return function ( req, res ) {
        messageBroker.publish( "system.get", {}, function ( err, data ) {
            if ( err ) {
                return handleRouteError( systemError( "System RPC Service Error" ), res );
            }
            return res.json( data, 200 );
        } );
    };
};

var systemError = require( '../utils' ).systemError;
var handleRouteError = require( '../utils' ).handleRouteError;


var latitude = process.env.FORECAST_LATITUDE;
var longitude = process.env.FORECAST_LONGITUDE;


exports.current = function ( messageBroker ) {
    return function ( req, res ) {
        var message = {
            latitude: latitude,
            longitude: longitude,
            options: {
                exclude: [ "minutely", "daily", "alerts" ]
            }
        };
        messageBroker.publish( "forecast.get", message, function ( err, data ) {
            if ( err ) {
                return handleRouteError( systemError( "Forecast.io RPC Service Error" ), res );
            }
            return res.json( data, 200 );
        } );
    };
};

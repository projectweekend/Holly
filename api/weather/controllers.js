var forecastIO = require( 'weatherman.io' );
var systemError = require( '../utils' ).systemError;
var handleRouteError = require( '../utils' ).handleRouteError;



var apiKey = process.env.FORECAST_IO_KEY;
var latitude = process.env.FORECAST_LATITUDE;
var longitude = process.env.FORECAST_LONGITUDE;
var weatherman = forecastIO( apiKey );


weatherman.goOnLocation( latitude, longitude );
weatherman.options = {
    exclude: [ "minutely", "daily", "alerts" ]
};


exports.current = function ( req, res ) {

    weatherman.doForecast( function ( err, weatherReport ) {

        if ( err ) {
            var error = systemError( "Forecast.io API Error" );
            return handleRouteError( error, res );
        }

        return res.json( weatherReport, 200 );

    } );

};

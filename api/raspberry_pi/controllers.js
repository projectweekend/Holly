var async = require( 'async' );
var SystemTemperature = require( './models' ).SystemTemperature;
var handleRouteError = require( '../utils' ).handleRouteError;


exports.read = function ( req, res ) {

    SystemTemperature.latestReading( 'date temp_c temp_f', function ( err, temperatureReading ) {

        if ( err ) {
            return handleRouteError( err, res );
        }

        return res.json( temperatureReading, 200 );

    } );

};


exports.getChart = function ( req, res ) {

    SystemTemperature.chartReadings( 24, 'date temp_c temp_f', function ( err, temperatureReadings ) {

        if ( err ) {
            return handleRouteError( err, res );
        }

        return res.json( temperatureReadings, 200 );

    } );

};

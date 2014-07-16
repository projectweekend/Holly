var async = require( 'async' );
var SystemTemperature = require( './models' ).SystemTemperature;
var handleRouteError = require( '../utils' ).handleRouteError;


exports.create = function ( req, res ) {

    var validation = function ( callback ) {

        req.checkBody( "temp_c", "'temp_c' must be a float" ).isFloat();
        req.checkBody( "temp_f", "'temp_f' must be a float" ).isFloat();

        var errors = req.validationErrors();
        if ( errors ) {
            return callback( errors );
        }

        var cleanData = {
            temp_c: req.param( "temp_c" ),
            temp_f: req.param( "temp_f" )
        };

        return callback( null, cleanData );

    };

    var data = function ( cleanData, callback ) {

        SystemTemperature.add( cleanData, function ( err, newSystemTemperature ) {

            if ( err ) {
                return callback( err );
            }

            return callback( null, newSystemTemperature );

        } );

    };

    async.waterfall( [ validation, data ], function ( err, newSystemTemperature ) {

        if ( err ) {
            return handleRouteError( err, res );
        }

        return res.json( newSystemTemperature, 201 );

    } );

};


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

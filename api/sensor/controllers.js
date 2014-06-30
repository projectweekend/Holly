var async = require( 'async' );
var SensorReading = require( './models' ).SensorReading;
var systemError = require( '../utils' ).systemError;
var handleRouteError = require( '../utils' ).handleRouteError;


exports.create = function ( req, res ) {

    var validation = function ( callback ) {

        req.checkBody( "temp_c", "'temp_c' must be a float" ).isFloat();
        req.checkBody( "temp_f", "'temp_f' must be a float" ).isFloat();
        req.checkBody( "humidity", "'humidity' must be a float" ).isFloat();
        req.checkBody( "pressure", "'pressure' must be a float" ).isFloat();
        req.checkBody( "luminosity", "'luminosity' must be a float" ).isFloat();

        var errors = req.validationErrors();
        if ( errors ) {
            return callback( errors );
        }

        var cleanData = {
            temp_c: req.param( "temp_c" ),
            temp_f: req.param( "temp_f" ),
            humidity: req.param( "humidity" ),
            pressure: req.param( "pressure" ),
            luminosity: req.param( "luminosity" )
        };

        return callback( null, cleanData );

    };

    var data = function ( cleanData, callback ) {

        SensorReading.add( cleanData, function ( err, newSensorReading ) {

            if ( err ) {
                return callback( systemError( err ) );
            }

            return callback( null, newSensorReading );

        } );

    };

    async.waterfall( [ validation, data ], function ( err, newSensorReading ) {

        if ( err ) {
            return handleRouteError( err, res );
        }

        return res.json( newSensorReading, 201 );

    } );

};


exports.getChart = function ( req, res ) {

    var validation = function ( callback ) {
        // check query params for 'type' is one of:
        // 'temperature', 'humidity', 'pressure', 'luminosity'
    };

    var data = function ( cleanData, callback ) {
        // query the chart data
    };

    async.waterfall( [], function ( err, chartData ) {

        if ( err ) {
            return handleRouteError( err, res );
        }

        return res.json( chartData, 200 );

    } );

};

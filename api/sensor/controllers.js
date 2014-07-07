var async = require( 'async' );
var SensorReading = require( './models' ).SensorReading;
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
                return callback( err );
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


exports.read = function ( req, res ) {

    var validation = function ( callback ) {

        var readingTypes = ['temperature', 'humidity', 'pressure', 'luminosity', 'all'];
        req.checkParams( 'readingType', "'type' of reading must be one of: 'temperature', 'humidity', 'pressure', 'luminosity', 'all'" ).isIn( readingTypes );

        var errors = req.validationErrors();
        if ( errors ) {
            return callback( errors );
        }

        var cleanData = {
            type: req.param( 'readingType' )
        };

        return callback( null, cleanData );

    };

    var data = function ( cleanData, callback ) {

        if ( cleanData.type === 'temperature' ) {
            SensorReading.latestReading( 'date temp_c temp_f', function ( err, temperatureReadings ) {
                if ( err ) {
                    return callback( err );
                }
                return callback( null, temperatureReadings );
            } );
        }

        if ( cleanData.type === 'humidity' ) {
            SensorReading.latestReading( 'date humidity', function ( err, humidityReadings ) {
                if ( err ) {
                    return callback( err );
                }
                return callback( null, humidityReadings );
            } );
        }

        if ( cleanData.type === 'pressure' ) {
            SensorReading.latestReading( 'date pressure', function ( err, pressureReadings ) {
                if ( err ) {
                    return callback( err );
                }
                return callback( null, pressureReadings );
            } );
        }

        if ( cleanData.type === 'luminosity' ) {
            SensorReading.latestReading( 'date luminosity', function ( err, luminosityReadings ) {
                if ( err ) {
                    return callback( err );
                }
                return callback( null, luminosityReadings );
            } );
        }

        if ( cleanData.type === 'all' ) {
            SensorReading.latestReading( 'date temp_f temp_c humidity pressure luminosity', function ( err, allReadings ) {
                if ( err ) {
                    return callback( err );
                }
                return callback( null, allReadings );
            } );
        }

    };

    async.waterfall( [ validation, data ], function ( err, readingData ) {

        if ( err ) {
            return handleRouteError( err, res );
        }

        return res.json( readingData, 200 );

    } );

};


exports.getChart = function ( req, res ) {

    var validation = function ( callback ) {

        var chartTypes = ['temperature', 'humidity', 'pressure', 'luminosity'];
        req.checkParams( 'chartType', "'type' of chart must be one of: 'temperature', 'humidity', 'pressure', 'luminosity'" ).isIn( chartTypes );

        var errors = req.validationErrors();
        if ( errors ) {
            return callback( errors );
        }

        var cleanData = {
            type: req.param( 'chartType' )
        };

        return callback( null, cleanData );

    };

    var data = function ( cleanData, callback ) {

        if ( cleanData.type === 'temperature' ) {
            SensorReading.chartReadings( 24, 'date temp_c temp_f', function ( err, temperatureReadings ) {
                if ( err ) {
                    return callback( err );
                }
                return callback( null, temperatureReadings );
            } );
        }

        if ( cleanData.type === 'humidity' ) {
            SensorReading.chartReadings( 24, 'date humidity', function ( err, temperatureReadings ) {
                if ( err ) {
                    return callback( err );
                }
                return callback( null, temperatureReadings );
            } );
        }

        if ( cleanData.type === 'pressure' ) {
            SensorReading.chartReadings( 24, 'date pressure', function ( err, temperatureReadings ) {
                if ( err ) {
                    return callback( err );
                }
                return callback( null, temperatureReadings );
            } );
        }

        if ( cleanData.type === 'luminosity' ) {
            SensorReading.chartReadings( 24, 'date luminosity', function ( err, temperatureReadings ) {
                if ( err ) {
                    return callback( err );
                }
                return callback( null, temperatureReadings );
            } );
        }

    };

    async.waterfall( [ validation, data ], function ( err, chartData ) {

        if ( err ) {
            return handleRouteError( err, res );
        }

        return res.json( chartData, 200 );

    } );

};

var appModels = require( '../models' ),
 async = require( 'async' );


var errorHandler = function ( err, res ) {
    console.log( err );
    res.send( 500 );
};


exports.indoorTemperatureData = function ( req, res ) {

    if ( req.method == 'POST' ) {

        var newIndoorTemperatureData = {
            date: new Date(),
            celsius: req.body.celsius,
            fahrenheit: req.body.fahrenheit
        };

        // If we received a date on the end point, use that instead current
        if ( req.body.date ) {
            newIndoorTemperatureData.date = new Date(req.body.date);
        }

        IndoorTemperatureData.create( newIndoorTemperatureData, function ( err, indoorTemperatureData ) {

            if ( err ) {
                return errorHandler( err, res );
            }

            res.send( 201 );

        } );

    }

    if ( req.method == 'GET' ) {

        var q = IndoorTemperatureData.findOne( ).sort( '-date' );

        q.exec( function ( err, data ) {

            if ( err ) {
                return errorHandler( err, res );
            }

            res.json( data );

        } );

    }

};


exports.indoorTemperatureDataBulk = function ( req, res ) {

    var newIndoorTemperatureData = req.body.temperature_data;

    var buildAsyncCallback = function ( temperatureDataItem ) {
        
        return function ( callback ) {
            IndoorTemperatureData.create( temperatureDataItem, function ( err, newData ) {
                if ( err ) {
                    callback( err );
                } else {
                    callback();
                }
            } );
        };

    };

    var asyncTaskList = newIndoorTemperatureData.map( buildAsyncCallback );

    async.parallel( asyncTaskList, function ( err ) {
        if ( err ) {
            return errorHandler( err, res );
        }
        return res.send( 201 );
    } );

};


exports.indoorHumidityData = function ( req, res ) {

    if ( req.method == 'POST' ) {

        var newIndoorHumidityData = {
            date: new Date(),
            percent: req.body.percent
        };

        // If we received a date on the end point, use that instead current
        if ( req.body.date ) {
            newIndoorHumidityData.date = new Date(req.body.date);
        }

        IndoorHumidityData.create( newIndoorHumidityData, function ( err, indoorHumidityData ) {

            if ( err ) {
                return errorHandler( err, res );
            }

            res.send( 201 );

        } );

    }

    if ( req.method == 'GET' ) {

        var q = IndoorHumidityData.findOne( ).sort( '-date' );

        q.exec( function ( err, data ) {

            if ( err ) {
                return errorHandler( err, res );
            }

            res.json( data );

        } );

    }

};


exports.indoorHumidityDataBulk = function ( req, res ) {

    var newIndoorHumidityData = req.body.humidity_data;

    var buildAsyncCallback = function ( humidityDataItem ) {
        
        return function ( callback ) {
            IndoorHumidityData.create( humidityDataItem, function ( err, newData ) {
                if ( err ) {
                    callback( err );
                } else {
                    callback();
                }
            } );
        };

    };

    var asyncTaskList = newIndoorHumidityData.map( buildAsyncCallback );

    async.parallel( asyncTaskList, function ( err ) {
        if ( err ) {
            return errorHandler( err, res );
        }
        return res.send( 201 );
    } );

};


exports.indoorTemperatureDataRecent = function ( req, res ) {

    var numberOfReadings = req.query.numberOfReadings || 6;

    var q = IndoorTemperatureData.find( ).sort( '-date' ).limit( numberOfReadings );
    
    q.exec( function ( err, data ) {

        if ( err ) {
            return errorHandler( err, res);
        }

        return res.json( data );

    } );

};


exports.indoorHumidityDataRecent = function ( req, res ) {

    var numberOfReadings = req.query.numberOfReadings || 6;

    var q = IndoorHumidityData.find( ).sort( '-date' ).limit( numberOfReadings );

    q.exec( function ( err, data ) {

        if ( err ) {
            return errorHandler( err, res);
        }

        return res.json( data );

    } );

};

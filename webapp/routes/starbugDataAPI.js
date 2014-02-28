var appModels = require( '../models' ),
 async = require( 'async' );


var errorHandler = function ( err, res ) {
    console.log( err );
    res.send( 500 );
};


exports.starbugTemperatureData = function ( req, res ) {

    if ( req.method == 'GET') {
        
        var q = StarbugTemperatureData.findOne( ).sort( '-date' );
        
        q.exec( function ( err, data ) {
        
            if ( err ) {
                return errorHandler( err, res);
            }

            res.json( data );

        } );

    }

    if ( req.method == 'POST') {

        var newTemperatureData = {
            date: new Date(),
            celsius: req.body.celsius,
            fahrenheit: req.body.fahrenheit
        };

        StarbugTemperatureData.create( newTemperatureData, function ( err, data ) {

            if ( err ) {
                return errorHandler( err, res );
            }

            res.send( 201 );
            
        } );

    }

};


exports.starbugTemperatureDataBulk = function ( req, res ) {

    var newStarbugTemperatureData = req.body.temperature_data;

    var buildAsyncCallback = function ( temperatureDataItem ) {
        
        return function ( callback ) {
            StarbugTemperatureData.create( temperatureDataItem, function ( err, newData ) {
                if ( err ) {
                    callback( err );
                } else {
                    callback();
                }
            } );
        };

    };

    var asyncTaskList = newStarbugTemperatureData.map( buildAsyncCallback );

    async.parallel( asyncTaskList, function ( err ) {
        if ( err ) {
            return errorHandler( err, res );
        }
        return res.send( 201 );
    } );

};


exports.starbugTemperatureDataRecent = function ( req, res ) {

    var numberOfReadings = req.query.numberOfReadings || 6;

    var q = StarbugTemperatureData.find( ).sort( '-date' ).limit( numberOfReadings );
    
    q.exec( function ( err, data ) {

        if ( err ) {
            return errorHandler( err, res);
        }

        return res.json( data );

    } );

};

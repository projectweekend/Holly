var appModels = require( '../models' ),
 async = require( 'async' );


var errorHandler = function ( err, res ) {
    console.log( err );
    res.send( 500 );
};


exports.systemTemperatureData = function ( req, res ) {

    var queryFilter = {};

    var systemName = req.query.systemName || "";
    if ( systemName ) {
        queryFilter.from = systemName;
    }

    var query = SystemTemperatureData.findOne( queryFilter ).sort( '-date' );

    query.exec( function ( err, data ) {
        
        if ( err ) {
            return errorHandler( err, res);
        }

        res.json( data );

    } );

};


exports.systemTemperatureDataBulk = function ( req, res ) {
    
    var newTemperatureData = req.body.temperature_data;

    var buildAsyncCallback = function ( temperatureDataItem ) {
        
        return function ( callback ) {
            SystemTemperatureData.create( temperatureDataItem, function ( err, newData ) {
                if ( err ) {
                    callback( err );
                } else {
                    callback();
                }
            } );
        };

    };

    var asyncTaskList = newTemperatureData.map( buildAsyncCallback );

    async.parallel( asyncTaskList, function ( err ) {
        if ( err ) {
            return errorHandler( err, res );
        }
        return res.send( 201 );
    } );

};


exports.systemTemperatureDataReportingRecent = function ( req, res ) {

    var queryFilter = {};
    var numberOfReadings = req.query.numberOfReadings || 6;
    var systemName = req.query.systemName || "";

    if ( systemName ) {
        queryFilter.from = systemName;
    }

    var query = SystemTemperatureData.find( queryFilter ).sort( '-date' ).limit( numberOfReadings );

    query.exec( function ( err, data ) {

        if ( err ) {
            return errorHandler( err, res);
        }

        return res.json( data );

    } );

};


exports.systemMemoryData = function ( req, res ) {

    var query = SystemMemoryData.findOne( ).sort( '-date' );

    query.exec( function ( err, data ) {

        if ( err ) {
            return errorHandler( err, res);
        }

        res.json( data );

    } );

};


exports.systemStorageData = function ( req, res ) {

    var query = SystemStorageData.findOne( ).sort( '-date' );

    query.exec( function ( err, data ) {
        
        if ( err ) {
            return errorHandler( err, res);
        }

        res.json( data );
        
    } );

};

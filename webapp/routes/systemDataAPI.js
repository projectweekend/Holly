var appModels = require( '../models' ),
 async = require( 'async' );


var errorHandler = function ( err, res ) {
    console.log( err );
    res.send( 500 );
};


exports.systemTemperatureData = function ( req, res ) {

    var query = SystemTemperatureData.findOne( ).sort( '-date' );

    query.exec( function ( err, data ) {
        
        if ( err ) {
            return errorHandler( err, res);
        }

        res.json( data );

    } );

};


exports.systemTemperatureDataReportingAll = function ( req, res ) {

    var query = SystemTemperatureData.find().sort( '-date' );

    query.exec( function ( err, data ) {

        if ( err ) {
            return errorHandler( err, res);
        }

        return res.json( data );

    } );

};


exports.systemTemperatureDataReportingRecent = function ( req, res ) {

    var numberOfReadings = req.query.numberOfReadings || 6;

    var query = SystemTemperatureData.find().sort( '-date' ).limit( numberOfReadings );

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


exports.systemConfigData = function ( req, res ) {

    var query = SystemConfigData.findOne( ).sort( '-date' );

    query.exec( function ( err, data ) {
        
        if ( err ) {
            return errorHandler( err, res);
        }

        res.json( data );
        
    } );

};

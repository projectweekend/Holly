var appModels = require( '../models' );


var errorHandler = function ( err, res ) {
    console.log( err );
    res.send( 500 );
};


exports.create = function ( req, res ) {

    var newSensorData = {
        date: new Date(),
        temp_c: req.body.temp_c,
        temp_f: req.body.temp_f,
        pressure: req.body.pressure
    };

    IndoorSensorData.create( newSensorData, function ( err, sensorData ) {
        if ( err ) {
            return errorHandler( err, res );
        }
        res.send( 201 );
    } );

};


exports.list = function ( req, res ) {

    var numberOfReadings = req.query.numberOfReadings || 6;

    var q = IndoorSensorData.find().sort( '-date' ).limit( numberOfReadings );

    q.exec( function ( err, sensorData ) {
        if ( err ) {
            return errorHandler( err, res );
        }
        res.json( sensorData );
    } );

};

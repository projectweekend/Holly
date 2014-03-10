var appModels = require( '../models' );


var errorHandler = function ( err, res ) {
    console.log( err );
    res.send( 500 );
};


exports.indoorMovementLog = function ( req, res ) {

    if ( req.method == 'GET' ) {

        var queryFilter = {
            "from": req.query.systemName || "Holly"
        };

        var query = IndoorMovementLog.findOne( queryFilter ).sort( '-date' );

        query.exec( function ( err, data ) {
            
            if ( err ) {
                return errorHandler( err, res);
            }

            res.json( data );

        } );

    }

    if ( req.method == 'POST' ) {

        var newIndoorMovementLogEntry = {
            date: req.body.date,
            from: req.body.from
        };

        IndoorMovementLog.create( newIndoorMovementLogEntry, function ( err, data ) {

            if ( err ) {
                return errorHandler( err, res );
            }

            res.send( 201 );
            
        } );

    }

};


exports.indoorMovementLogBulk = function ( req, res ) {

	var newIndoorMovementLogEntries = req.body.movement_data;

    IndoorMovementLog.create( newIndoorMovementLogEntries, function ( err, data ) {

        if ( err ) {
            return errorHandler( err, res );
        }

        res.send( 201 );
        
    } );

};


exports.indoorMovementLogRecent = function ( req, res ) {

    var queryFilter = {};
    var numberOfReadings = req.query.numberOfReadings || 6;
    var systemName = req.query.systemName || "";

    if ( systemName ) {
        queryFilter.from = systemName;
    }

    var query = IndoorMovementLog.find( queryFilter ).sort( '-date' ).limit( numberOfReadings );

    query.exec( function ( err, data ) {

        if ( err ) {
            return errorHandler( err, res);
        }

        return res.json( data );

    } );

};

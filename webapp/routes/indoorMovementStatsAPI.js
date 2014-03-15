var appModels = require( '../models' ),
	asyncCallbackHelpers = require( '../helpers/AsyncCallbacks' ),
	async = require( 'async' );


var errorHandler = function ( err, res ) {
    console.log( err );
    res.send( 500 );
};


exports.dailyMovementStats = function ( req, res ) {

    var d = new Date();
    var currentDate = d.getDate();
    var currentMonth = d.getMonth();
    var currentYear = d.getFullYear();

    var sumConfig = {
        out: { replace: "DailyMovementStats" },
        query: {
			"date": {
				"$gte": new Date( currentYear, currentMonth, currentDate ),
				"$lt": new Date( currentYear, currentMonth, currentDate + 1 )
			},
			"from": "Nova5"
		},
        map: function () { emit( this.date.getHours(), 1 ); },
        reduce: function ( keyVal, movementValues ) { return Array.sum( movementValues ); }
    };

    IndoorMovementLog.mapReduce( sumConfig, function ( err, model, status ) {
        if ( err ) {
            console.log( err );
            return errorHandler( err, res );
        }
        model.find( {}, function ( err, data ) {
			if ( err ) {
				console.log( err );
				return errorHandler( err, res );
			}
			return res.json( data );
        } );
    } );

};

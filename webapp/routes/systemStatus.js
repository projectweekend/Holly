var appModels = require( '../models' ),
 async = require( 'async' );


var errorHandler = function ( err, res ) {
    console.log( err );
    res.send( 500 );
};

exports.systemStatusMessages = function ( req, res ) {

	if ( req.method == 'POST' ) {

	}

	if ( req.method == 'GET' ) {
		// get all, using an optional limit parameter
	}	

};

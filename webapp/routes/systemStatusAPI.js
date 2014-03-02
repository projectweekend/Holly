var appModels = require( '../models' ),
 async = require( 'async' );


var errorHandler = function ( err, res ) {
    console.log( err );
    res.send( 500 );
};


exports.messagesList = function ( req, res ) {

	if ( req.method == 'GET' ) {

		var numberOfMessages = req.query.numberOfMessages || 6;
		
		var q = SystemStatusMessage.find( ).sort('-date').limit( numberOfMessages );
		q.exec( function ( err, data ) {
			if ( err ) {
				return errorHandler( err, res );
			}
			return res.json( data );
		} );

	}

	if ( req.method == 'POST' ) {

		var newStatusMessage = {
			date: req.body.date,
			from: req.body.from,
			body: req.body.messagebody
		};

		SystemStatusMessage.create( newStatusMessage, function ( err, data ) {
			if ( err ) {
				return errorHandler( err, res );
			}
			res.send( 201 );
		} );

	}

};


exports.messagesDetail = function ( req, res ) {

	var messageID = req.params.id;

	if ( req.method == 'GET' ) {

		SystemStatusMessage.findById( messageID, function ( err, data ) {
			if ( err ) {
				return errorHandler( err, res );
			}
			return res.json( data );
		} );

	}

	if ( req.method == 'DELETE' ) {
		
		SystemStatusMessage.findById( messageID, function ( err, itemToDelete ) {
			if ( err ) {
				return errorHandler( err, res );
			}
			itemToDelete.remove();
			return res.send( 200 );
		} );

	}

};

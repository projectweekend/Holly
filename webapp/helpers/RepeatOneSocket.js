module.exports = function ( socket, handleError, config ) {

	var route = config.route;
	var model = config.model;
	var query = config.query;
	var sort = config.sort;
	var interval = config.interval;
	
	setInterval( function () {

		var q = model.findOne( query ).sort( sort );

		q.exec( function ( err, data ) {
			if ( err ) {
				console.log( err );
				return handleError( route, err );
			} else {
				socket.emit( route, data );
			}
		} );

	}, interval );

};

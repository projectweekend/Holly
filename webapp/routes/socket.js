/*
 * Serve content over a socket
 */

 var appModels = require( '../models' ),
	ERRORSocket = require( '../helpers/ERRORSocket' ),
	CRUDSocket = require( '../helpers/CRUDSocket' ),
	RepeatOneSocket = require( '../helpers/RepeatOneSocket' );


module.exports = function ( socket ) {

	var handleError = ERRORSocket( socket, {route: 'app:error'} );

};

/*
 * Serve content over a socket
 */

 var appModels = require( '../models' ),
	ERRORSocket = require( '../helpers/ERRORSocket' ),
	CRUDSocket = require( '../helpers/CRUDSocket' ),
	RepeatOneSocket = require( '../helpers/RepeatOneSocket' );


module.exports = function ( socket ) {

	var handleError = ERRORSocket( socket, {route: 'app:error'} );

	// The latest System Temperature reading is broadcast on a set interval
	RepeatOneSocket( socket, handleError, {
		route: 'updates:system:temp',
		model: SystemTemperatureData,
		query: {},
		sort: '-date',
		interval: 120000
	} );

	// The latest Starbug Temperature reading is broadcast on a set interval
	RepeatOneSocket( socket, handleError, {
		route: 'updates:starbug:temp',
		model: SystemTemperatureData,
		query: {},
		sort: '-date',
		interval: 120000
	} );

	// The latest Indoor Temperature reading is broadcast on a set interval
	RepeatOneSocket( socket, handleError, {
		route: 'updates:indoor:temp',
		model: IndoorTemperatureData,
		query: {},
		sort: '-date',
		interval: 120000
	} );

	// The latest Indoor Humidity reading is broadcast on a set interval
	RepeatOneSocket( socket, handleError, {
		route: 'updates:indoor:humidity',
		model: IndoorHumidityData,
		query: {},
		sort: '-date',
		interval: 120000
	} );

};

'use strict';


var logError = function ( data ) {
	console.log( data );
};


var svcMod = angular.module('myApp.services_system_messages', []);


svcMod.factory( "SystemMessages", function ( $http, socket ) {

	return {
		values: {
			messages: []
		},
		getValues: function () {
			var SystemMessages = this;
			var apiUrl = "/api/system/messages";

			$http.get( apiUrl ).
				success( function ( status, data ) {
					SystemMessages.values.messages = data;
				} ).
				error( function ( status, data ) {
					logError( data );
				} );
		},
		listenForUpdates: function () {
			var SystemMessages = this;
			socket.on( 'updates:system:messages', function ( data ) {
				// TODO: make this do something
			} );
		},
		init: function () {
			var SystemMessages = this;
			if ( SystemMessages.values.messages.length === 0 ) {
				SystemMessages.getValues();
			}
		}
	};

} );

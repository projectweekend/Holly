'use strict';

var dMod = angular.module( 'myApp.directives', [] );

dMod.directive( 'appVersion', function ( version ) {
	return function( scope, elm, attrs ) {
		elm.text( version );
	};
} );

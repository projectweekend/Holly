'use strict';


// Declare app level module which depends on filters, and services
var aMod = angular.module( 'myApp', [
    'ngRoute',
    'myApp.filters',
    'myApp.services',
    'myApp.directives',
    'myApp.controllers'
] );

aMod.config( [ '$routeProvider', function( $routeProvider ) {

    $routeProvider.when( '/charts', {
        templateUrl: 'partials/charts.html',
        controller: 'Charts'
    } );

    $routeProvider.when( '/view2', {
        templateUrl: 'partials/partial2.html',
        controller: 'MyCtrl2'
    } );

    $routeProvider.otherwise( {
        redirectTo: '/view1'
    } );

} ] );

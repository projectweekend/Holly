var appMod = angular.module( 'myApp', [
    'ngRoute',
    'myApp.services',
    'myApp.directives',
    'myApp.controllers',
    // Third-party modules
    'angles'
] );


appMod.config( function( $routeProvider ) {

    $routeProvider.when( '/home', {
        templateUrl: 'partials/home',
        controller: 'Home'
    } );

    $routeProvider.when( '/temperature', {
        templateUrl: 'partials/temperature',
        controller: 'Temperature'
    } );

    $routeProvider.when( '/humidity', {
        templateUrl: 'partials/humidity',
        controller: 'Humidity'
    } );

    $routeProvider.when( '/pressure', {
        templateUrl: 'partials/pressure',
        controller: 'Pressure'
    } );

    $routeProvider.when( '/about', {
        templateUrl: 'partials/about'
    } );

    $routeProvider.otherwise( {
        redirectTo: '/home'
    } );

} );

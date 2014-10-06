var appMod = angular.module( 'myApp', [
    'ngRoute',
    'myApp.services',
    'myApp.directives',
    'myApp.controller-compatibility',
    'myApp.controller-home',
    'myApp.controller-temperature-recent',
    'myApp.controller-temperature-average',
    'myApp.controller-temperature-min-max',
    'myApp.controller-humidity-recent',
    'myApp.controller-pressure-recent',
    'myApp.controller-raspberry-pi-recent',
    // Third-party modules
    'angles',
    'angular-skycons'
] );


appMod.config( function( $routeProvider ) {

    $routeProvider.when( '/home', {
        templateUrl: 'partials/home',
        controller: 'Home'
    } );

    $routeProvider.when( '/temperature/recent', {
        templateUrl: 'partials/temperature-recent',
        controller: 'TemperatureRecent'
    } );

    $routeProvider.when( '/temperature/average/weekly', {
        templateUrl: 'partials/temperature-average-weekly',
        controller: 'TemperatureAverageWeekly'
    } );

    $routeProvider.when( '/temperature/average/monthly', {
        templateUrl: 'partials/temperature-average-monthly',
        controller: 'TemperatureAverageMonthly'
    } );

    $routeProvider.when( '/temperature/average/yearly', {
        templateUrl: 'partials/temperature-average-yearly',
        controller: 'TemperatureAverageYearly'
    } );

    $routeProvider.when( '/temperature/average', {
        templateUrl: 'partials/temperature-average',
        controller: 'TemperatureAverage'
    } );

    $routeProvider.when( '/temperature/min-max', {
        templateUrl: 'partials/temperature-min-max',
        controller: 'TemperatureMinMax'
    } );

    $routeProvider.when( '/humidity', {
        templateUrl: 'partials/humidity',
        controller: 'Humidity'
    } );

    $routeProvider.when( '/pressure', {
        templateUrl: 'partials/pressure',
        controller: 'Pressure'
    } );

    $routeProvider.when( '/raspberry-pi', {
        templateUrl: 'partials/raspberry-pi',
        controller: 'RaspberryPi'
    } );

    $routeProvider.when( '/about', {
        templateUrl: 'partials/about'
    } );

    $routeProvider.otherwise( {
        redirectTo: '/home'
    } );

} );

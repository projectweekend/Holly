var appMod = angular.module( 'myApp', [
    'ngRoute',
    'myApp.service-api',
    'myApp.service-active-menu',
    'myApp.service-raspberry-pi',
    'myApp.service-sensor-reading',
    'myApp.service-stat-chart-utils',
    'myApp.service-sensor-chart-recent',
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
        templateUrl: 'build/partials/home.html',
        controller: 'Home'
    } );

    $routeProvider.when( '/temperature/recent', {
        templateUrl: 'build/partials/temperature-recent.html',
        controller: 'TemperatureRecent'
    } );

    $routeProvider.when( '/temperature/average/weekly', {
        templateUrl: 'build/partials/temperature-average-weekly.html',
        controller: 'TemperatureAverageWeekly'
    } );

    $routeProvider.when( '/temperature/average/monthly', {
        templateUrl: 'build/partials/temperature-average-monthly.html',
        controller: 'TemperatureAverageMonthly'
    } );

    $routeProvider.when( '/temperature/average/yearly', {
        templateUrl: 'build/partials/temperature-average-yearly.html',
        controller: 'TemperatureAverageYearly'
    } );

    $routeProvider.when( '/temperature/min-max/weekly', {
        templateUrl: 'build/partials/temperature-min-max-weekly.html',
        controller: 'TemperatureMinMaxWeekly'
    } );

    $routeProvider.when( '/temperature/min-max/monthly', {
        templateUrl: 'build/partials/temperature-min-max-monthly.html',
        controller: 'TemperatureMinMaxMonthly'
    } );

    $routeProvider.when( '/temperature/min-max/yearly', {
        templateUrl: 'build/partials/temperature-min-max-yearly.html',
        controller: 'TemperatureMinMaxYearly'
    } );

    $routeProvider.when( '/humidity', {
        templateUrl: 'build/partials/humidity.html',
        controller: 'Humidity'
    } );

    $routeProvider.when( '/pressure', {
        templateUrl: 'build/partials/pressure.html',
        controller: 'Pressure'
    } );

    $routeProvider.when( '/raspberry-pi', {
        templateUrl: 'build/partials/raspberry-pi.html',
        controller: 'RaspberryPi'
    } );

    $routeProvider.when( '/about', {
        templateUrl: 'build/partials/about.html'
    } );

    $routeProvider.otherwise( {
        redirectTo: '/home'
    } );

} );

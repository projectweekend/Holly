'use strict';

// Declare app level module which depends on filters, and services

angular.module('myApp', [
    'myApp.controllers',
    'myApp.filters',
    'myApp.services_indoor_temp',
    'myApp.services_indoor_humidity',
    'myApp.services_indoor_movement',
    'myApp.services_system_temp',
    'myApp.services_system_info',
    'myApp.services_system_messages',
    'myApp.services_system_config',
    'myApp.services_starbug_temp',
    'myApp.services_news_articles',
    'myApp.services_hue_lighting',
    'myApp.services_bus_tracker',
    'myApp.services_weather',
    'myApp.directives',
    'ngRoute',

    // 3rd party dependencies
    'btford.socket-io',
    'angles',
    'angular-skycons',
    'angular-fully-loaded'
]).
config( function ( $routeProvider, $locationProvider, $httpProvider ) {

    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];

    $routeProvider.
    when( '/home', {
        templateUrl: 'partials/home',
        controller: 'HomeCtrl'
    } ).
    when( '/weather', {
        templateUrl: 'partials/weather',
        controller: 'WeatherCtrl'
    } ).
    when( '/transit', {
        templateUrl: 'partials/transit',
        controller: 'TransitCtrl'
    } ).
    when( '/lights', {
        templateUrl: 'partials/lights',
        controller: 'LightsCtrl'
    } ).
    when( '/news', {
        templateUrl: 'partials/news',
        controller: 'NewsCtrl'
    } ).
    when( '/system', {
        templateUrl: 'partials/system',
        controller: 'SystemCtrl'
    } ).
    when( '/config', {
        templateUrl: 'partials/config',
        controller: 'SystemConfigCtrl'
    } ).
    otherwise( {
        redirectTo: '/home'
    } );

    $locationProvider.html5Mode( true );

} );

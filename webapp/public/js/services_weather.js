'use strict';

/* Services */

var logError = function ( data ) {
    console.log( data );
};


var svcMod = angular.module('myApp.services_weather', []);


svcMod.factory( "CurrentWeather", function ( $http ) {

    return {
        forecast: {},
        getForecast: function () {
            var self = this;
            var apiUrl = "/api/weather/current?latitude=41.8854710&longitude=-87.6430260";
            $http.get( apiUrl ).
                success( function ( data, status ) {
                    self.forecast = data;
                } ).
                error( function ( data, status ) {
                    logError( data );
                } );
        }
    };

} );

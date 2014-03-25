'use strict';

/* Services */

var logError = function ( data ) {
    console.log( data );
};


var svcMod = angular.module('myApp.services_weather', []);


svcMod.factory( "CurrentWeather", function ( $http ) {

    return {
        forecast: {},
        status: {
            loading: false,
            error: false,
        },
        getForecast: function () {
            var self = this;
            var apiUrl = "/api/weather/current?latitude=41.8854710&longitude=-87.6430260";
            self.loading = true;
            $http.get( apiUrl ).
                success( function ( data, status ) {
                    self.forecast = data;
                    self.status.loading = false;
                    self.status.error = false;
                } ).
                error( function ( data, status ) {
                    logError( data );
                    self.status.loading = false;
                    self.status.error = true;
                } );
        }
    };

} );

'use strict';

/* Services */

var logError = function ( data ) {
    console.log( data );
};


var svcMod = angular.module('myApp.services_weather', []);


svcMod.factory( "WeatherIO", function ( $http ) {

    return {
        forecast: {},
        status: {
            loading: false,
            error: false,
        },
        getForecast: function ( forecastType ) {
            var self = this;
            var apiUrl = "/api/weather/" + forecastType + "?latitude=41.8854710&longitude=-87.6430260";
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

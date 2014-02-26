'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
var makeHoursMinutesTimeString = function ( dateString ) {

    var d = new Date( dateString );
    var h = d.getHours();
    var m = d.getMinutes();

    if ( m === 0 ) {
        m = "00";
    }

    return h + ":" + m;
};

var logError = function ( data ) {
    console.log( data );
};


var svcMod = angular.module('myApp.services_bus_tracker', []);


svcMod.factory( "BusTracker", function ( $http ) {

    return {
        values: {
            stops: []
        },
        status: {
            isLoading: false,
            receivedError: false,
            isDeleting: false
        },
        getBusPredictions: function () {
            var BusTracker = this;
            var apiUrl = "/api/bustracker/predictions";
            $http.get( apiUrl ).
                success( function ( data, status ) {
                    BusTracker.values.stops = [];
                    BusTracker.values.stops = data;
                    BusTracker.status.isLoading = false;
                    BusTracker.status.isDeleting = false;
                } ).
                error( function ( data, status ) {
                    BusTracker.status.receivedError = true;
                    logError( data );
                } );
        },
        deleteFavorite: function ( favoritesID ) {
            var BusTracker = this;
            BusTracker.status.isDeleting = true;
            var apiUrl = "/api/bustracker/favorites?id=" + favoritesID;
            $http.delete( apiUrl ).
                success( function ( data, status ) {
                    BusTracker.getBusPredictions();
                } ).
                error( function ( data, status ) {
                    logError( data );
                } );
        },
        init: function () {
            var BusTracker = this;
            BusTracker.status.isLoading = true;
            BusTracker.getBusPredictions();
        }
    };

} );


svcMod.factory( "BusTrackerConfig", function ( $http, BusTracker ) {

    return {
        values: {
            favorites: [],
            routes: [],
            directions: [],
            stops: [],
            selected: {
                route: "",
                direction: "",
                stop:""
            }
        },
        getRoutes: function () {
            var BusTrackerConfig = this;
            var apiUrl = "/api/bustracker/routes";
            $http.get( apiUrl ).
                success( function ( data, status ) {
                    BusTrackerConfig.routes = data;
                } ).
                error( function ( data, status ) {
                    logError( data );
                } );
        },
        getDirections: function () {
            var BusTrackerConfig = this;
            var apiUrl = "/api/bustracker/directions?route=" + BusTrackerConfig.selected.route;
            $http.get( apiUrl ).
                success( function ( data, status ) {
                    BusTrackerConfig.directions = data;
                }).
                error( function ( data, status ) {
                    logError( data );
                });
        },
        getStops: function () {
            var BusTrackerConfig = this;
            var apiUrl = "/api/bustracker/stops?route=" + BusTrackerConfig.selected.route + "&direction=" + BusTrackerConfig.selected.direction;
            $http.get( apiUrl ).
                success( function ( data, status ) {
                    BusTrackerConfig.stops = data;
                } ).
                error( function ( data, status ) {
                    logError( data );
                } );
        },
        saveFavorite: function () {
            var BusTrackerConfig = this;
            var apiUrl = "/api/bustracker/favorites";
            var newFavorite = {
                stopID: BusTrackerConfig.selected.stop,
                route: BusTrackerConfig.selected.route
            };
            $http.post( apiUrl, newFavorite ).
                success( function ( data, status ) {
                    BusTracker.getBusPredictions();
                    BusTrackerConfig.clearSelections();
                    BusTrackerConfig.resetForm();
                } ).
                error( function ( data, status ) {
                    logError( data );
                } );
        },
        deleteFavorite: function ( favoritesID ) {
            var BusTrackerConfig = this;
            var apiUrl = "/api/bustracker/favorites?id=" + favoritesID;
            $http.delete( apiUrl ).
                success( function ( data, status ) {
                    BusTracker.getBusPredictions();
                } ).
                error( function ( data, status ) {
                    logError( data );
                } );
        },
        clearSelections: function () {
            var BusTrackerConfig = this;
            BusTrackerConfig.selected.route = "";
            BusTrackerConfig.selected.direction = "";
            BusTrackerConfig.selected.stop = "";
        },
        resetForm: function () {
            var BusTrackerConfig = this;
            BusTrackerConfig.directions = [];
            BusTrackerConfig.stops = [];
        },
        init: function () {
            var BusTrackerConfig = this;
            BusTrackerConfig.getRoutes();
        }
    };

} );

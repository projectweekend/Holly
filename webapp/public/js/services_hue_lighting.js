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


var svcMod = angular.module('myApp.services_hue_lighting', []);


svcMod.factory( "HueLighting", function ( $http ) {

    return {
        bridge: {
            ip: "",
            isAuthorized: false
        },
        isLoading: true,
        lights: [],
        buildRouteURL: function ( route ) {
            var bridge = this.bridge;
            return "http://" + bridge.ip + route;
        },
        findBridgeIP: function () {
            var HueLighting = this;
            var apiUrl = "http://www.meethue.com/api/nupnp";
            $http.get( apiUrl ).
                success( function ( data, status ) {
                    HueLighting.bridge.ip = data[0].internalipaddress;
                    HueLighting.checkBridgeAuthorization();
                } ).
                error( function ( data, status ) {
                    logError( data );
                } );
        },
        checkBridgeAuthorization: function () {
            var HueLighting = this;
            var apiUrl = HueLighting.buildRouteURL( "/api/hollydotlocal" );
            $http.get( apiUrl ).
                success( function ( data, status ) {
                    HueLighting.isLoading = false;
                    var response = data;
                    if ( response[0] !== undefined && response[0].error.type == 1 ) {
                        HueLighting.bridge.isAuthorized = false;
                    } else {
                        HueLighting.bridge.isAuthorized = true;
                        HueLighting.findLights();
                    }
                } ).
                error( function ( data, status ) {
                    logError( data );
                } );
        },
        authorizeBridge: function () {
            var HueLighting = this;
            var apiUrl = HueLighting.buildRouteURL( "/api" );
            var postData = {
                "devicetype": "Holly.local",
                "username": "hollydotlocal"
            };
            $http.post( apiUrl, postData ).
                success( function ( data, status ) {
                    var response = data[0];
                    if ( response.error.type == 101 ) {
                        HueLighting.bridge.isAuthorized = false;
                    } else {
                        HueLighting.bridge.isAuthorized = true;
                        HueLighting.findLights();
                    }
                } ).
                error( function ( data, status ) {
                    logError( data );
                } );

        },
        populateLightAttributes: function ( lightID, lightItem ) {
            var HueLighting = this;
            var apiUrl = HueLighting.buildRouteURL( "/api/hollydotlocal/lights/" + lightID );
            $http.get( apiUrl ).
                success( function ( data, status ) {
                    lightItem.data = data;
                    lightItem.turnOn = function () {
                        var apiUrl = HueLighting.buildRouteURL( "/api/hollydotlocal/lights/" + lightID + "/state" );
                        var putData = {
                            on: true
                        };
                        $http.put( apiUrl, putData ).
                            success( function ( data, status ) {
                                lightItem.data.state.on = true;
                            } ).
                            error( function ( data, status ) {
                                logError( data );
                            } );
                    };
                    lightItem.turnOff = function () {
                        var apiUrl = HueLighting.buildRouteURL( "/api/hollydotlocal/lights/" + lightID + "/state" );
                        var putData = {
                            on: false
                        };
                        $http.put( apiUrl, putData ).
                            success( function ( data, status ) {
                                lightItem.data.state.on = false;
                            } ).
                            error( function ( data, status ) {
                                logError( data );
                            } );
                    };
                    lightItem.setBrightness = function ( ) {
                        var apiUrl = HueLighting.buildRouteURL( "/api/hollydotlocal/lights/" + lightID + "/state" );
                        var putData = {
                            bri: parseInt(lightItem.data.state.bri)
                        };
                        $http.put( apiUrl, putData ).
                            success( function ( data, status ) {

                            } ).
                            error( function ( data, status ) {
                                logError( data );
                            } );
                    };
                } ).
                error( function ( data, status ) {
                    logError( data );
                } );
        },
        findLights: function () {
            var HueLighting = this;
            var apiUrl = HueLighting.buildRouteURL( "/api/hollydotlocal/lights" );
            $http.get( apiUrl ).
                success( function ( data, status ) {
                    for (var key in data) {
                        var light = {
                            id: key,
                            name: data[key].name
                        };
                        HueLighting.populateLightAttributes( key, light );
                        HueLighting.lights.push( light );
                    }
                } ).
                error( function ( data, status ) {
                    logError( data );
                } );
        },
        init: function () {
            var HueLighting = this;
            if ( HueLighting.bridge.ip === "" ) {
                HueLighting.findBridgeIP();
            }
        }
    };

} );

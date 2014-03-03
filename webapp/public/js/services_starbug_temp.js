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


var svcMod = angular.module('myApp.services_starbug_temp', []);


// Starbug Temperature Reporting
svcMod.factory( "StarbugTempReporting", function ( $http, socket ) {

    return {
        chart: {
            options: {},
            data: {
                labels: [],
                datasets: [
                    {
                        fillColor : "rgba(151,187,205,0)",
                        strokeColor : "#e67e22",
                        pointColor : "rgba(151,187,205,0)",
                        pointStrokeColor : "#e67e22",
                        data: []
                    }
                ]
            }
        },
        buildChart: function ( display_units ) {
            var chart = this.chart;
            var apiUrl = "/api/system/temperature/recent?numberOfReadings=18&systemName=Starbug";

            $http.get( apiUrl ).
                success( function ( data, status ) {
                    data.forEach( function ( element, index, array ) {

                        var parsedTime = makeHoursMinutesTimeString( element.date );
                        chart.data.labels.push( parsedTime );

                        if ( display_units == 'F' ) {
                            chart.data.datasets[0].data.push( element.fahrenheit );
                        } else {
                            chart.data.datasets[0].data.push( element.celsius );
                        }

                    } );
                }).
                error( function ( data, status ) {
                    logError( data );
                });
        },
        clearChart: function () {
            var chart = this.chart;
            chart.data.labels = [];
            chart.data.datasets[0].data = [];
        },
        listenForUpdates: function ( display_units ) {
            var chart = this.chart;
            
            // TODO: fix this to make sure it works with system temp setup in a single collection
            socket.on( 'updates:starbug:temp', function ( data ) {
            
                var newLabel = makeHoursMinutesTimeString( data.date );
                var latestLabel = chart.data.labels[0];

                if ( newLabel != latestLabel ) {
                    // remove oldest one
                    chart.data.labels.pop();
                    chart.data.datasets[0].data.pop();
                    // add new one
                    chart.data.labels.unshift( newLabel );
                    if ( display_units == 'F' ) {
                        chart.data.datasets[0].data.unshift( data.fahrenheit );
                    } else {
                        chart.data.datasets[0].data.unshift( data.celsius );
                    }

                }

            } );
        },
        init: function ( display_units ) {
            var StarbugTempReporting = this;
            var currentData = StarbugTempReporting.chart.data.datasets[0].data;
            if ( currentData.length === 0 ) {
                StarbugTempReporting.buildChart( display_units );
            }
        }
    };

} );

// Current Starbug Temp
svcMod.factory( "StarbugTempCurrent", function ( $http, socket ) {

    return {
        values: {
            date: null,
            fahrenheit: null,
            celsius: null
        },
        getValues: function () {
            var values = this.values;
            var apiUrl = "/api/starbug/temperature";

            $http.get( apiUrl ).
                success( function ( data, status) {
                    values.date = data.date;
                    values.fahrenheit = data.fahrenheit;
                    values.celsius = data.celsius;
                } ).
                error( function ( data, status ) {
                    logError( data );
                } );
        },
        listenForUpdates: function () {
            var values = this.values;
            socket.on( 'updates:starbug:temp', function ( data ) {
                if ( values.date != data.date ) {
                    values.date = data.date;
                    values.fahrenheit = data.fahrenheit;
                    values.celsius = data.celsius;
                }
            } );
        },
        init: function () {
            var StarbugTempCurrent = this;
            var currentFarenheit = StarbugTempCurrent.values.fahrenheit;
            var currentCelsius = StarbugTempCurrent.values.celsius;
            if ( currentFarenheit === null && currentCelsius === null ) {
                StarbugTempCurrent.getValues();
            }
        }
    };

} );

// Starbug Temperature Stats
svcMod.factory( "StarbugTempStats", function ( $http, socket ) {

    return {
        values: {
            label: "",
            average: null,
            min: null,
            max: null
        },
        loadingValues: false,
        loadingError: false,
        getValues: function ( breakdownType ) {
            var StarbugTempStats = this;
            var apiUrl = "/api/starbug/temperature/stats/" + breakdownType;
            StarbugTempStats.loadingValues = true;
            $http.get( apiUrl ).
                success( function ( data, status ) {
                    StarbugTempStats.values.label = data.label;
                    StarbugTempStats.values.average = data.average;
                    StarbugTempStats.values.min = data.min;
                    StarbugTempStats.values.max = data.max;
                    StarbugTempStats.loadingValues = false;
                } ).
                error( function ( data, status ) {
                    logError( data );
                    StarbugTempStats.loadingError = true;
                    StarbugTempStats.loadingValues = false;
                } );

        },
        listenForUpdates: function () {
            // TOOD: Make a socket and hook this up
            var values = this.values;
        },
        init: function () {
            var StarbugTempStats = this;
            var values = this.values;
            if ( values.average === null || values.min === null || values.max === null ) {
                StarbugTempStats.getValues( "today" );
            }
        }
    };

} );

'use strict';


var logError = function ( data ) {
    console.log( data );
};


var makeHoursMinutesTimeString = function ( dateString ) {

    var d = new Date( dateString );
    var h = d.getHours();
    var m = d.getMinutes();

    if ( m === 0 ) {
        m = "00";
    }

    return h + ":" + m;
};


var svcMod = angular.module('myApp.services_indoor_temp', []);


// Indoor Temperature Reporting
svcMod.factory( "IndoorTempReporting", function ( $http, socket ) {

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
            var apiUrl = "/api/indoor/sensors/data?numberOfReadings=24";

            $http.get( apiUrl ).
                success( function ( data, status ) {
                    data.forEach( function ( element, index, array ) {

                        var parsedTime = makeHoursMinutesTimeString( element.date );
                        chart.data.labels.push( parsedTime );

                        if ( display_units == 'F' ) {
                            chart.data.datasets[0].data.push( element.temp_f );
                        } else {
                            chart.data.datasets[0].data.push( element.temp_c );
                        }

                    } );
                } ).
                error( function ( data, status ) {
                    logError( data );
                } );
        },
        clearChart: function () {
            var chart = this.chart;
            chart.data.labels = [];
            chart.data.datasets[0].data = [];
        },
        listenForUpdates: function ( display_units ) {
            var chart = this.chart;

            socket.on( 'updates:indoor:temp', function ( data ) {

                var newLabel = makeHoursMinutesTimeString( data.date );
                var latestLabel = chart.data.labels[0];

                if ( newLabel != latestLabel ) {
                    // remove oldest one
                    chart.data.labels.pop();
                    chart.data.datasets[0].data.pop();
                    // add new one
                    chart.data.labels.unshift( newLabel );
                    if ( display_units == 'F' ) {
                        chart.data.datasets[0].data.unshift( data.temp_f );
                    } else {
                        chart.data.datasets[0].data.unshift( data.temp_c );
                    }

                }

            } );
        },
        init: function ( display_units ) {
            var IndoorTempReporting = this;
            var currentData = IndoorTempReporting.chart.data.datasets[0].data;
            if ( currentData.length === 0 ) {
                IndoorTempReporting.buildChart( display_units );
            }
        }
    };

} );

// Indoor Temperature Current
svcMod.factory( "IndoorTemperatureCurrent", function ( $http, socket ) {

    return {
        values: {
            date: null,
            fahrenheit: null,
            celsius: null
        },
        getValues: function () {
            var values = this.values;
            var apiUrl = "/api/indoor/sensors/data?numberOfReadings=1";

            $http.get( apiUrl ).
                success( function ( data, status) {
                    values.date = data.date;
                    values.fahrenheit = data.temp_f;
                    values.celsius = data.temp_c;
                } ).
                error( function ( data, status ) {
                    logError( data );
                } );
        },
        listenForUpdates: function () {
            var values = this.values;
            socket.on( 'updates:indoor:temp', function ( data ) {
                if ( values.date != data.date ) {
                    values.date = data.date;
                    values.fahrenheit = data.fahrenheit;
                    values.celsius = data.celsius;
                }
            } );
        },
        init: function () {
            var IndoorTemperatureCurrent = this;
            var currentFarenheit = IndoorTemperatureCurrent.values.fahrenheit;
            var currentCelsius = IndoorTemperatureCurrent.values.celsius;
            if ( currentFarenheit === null && currentCelsius === null ) {
                IndoorTemperatureCurrent.getValues();
            }
        }
    };

} );


svcMod.factory( "IndoorTemperatureStats", function ( $http, socket ) {

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
            var IndoorTemperatureStats = this;
            var apiUrl = "/api/indoor/temperature/stats/" + breakdownType;
            IndoorTemperatureStats.loadingValues = true;
            $http.get( apiUrl ).
                success( function ( data, status ) {
                    IndoorTemperatureStats.values.label = data.label;
                    IndoorTemperatureStats.values.average = data.average;
                    IndoorTemperatureStats.values.min = data.min;
                    IndoorTemperatureStats.values.max = data.max;
                    IndoorTemperatureStats.loadingValues = false;
                } ).
                error( function ( data, status ) {
                    logError( data );
                    IndoorTemperatureStats.loadingValues = false;
                    IndoorTemperatureStats.loadingError = true;
                } );
        },
        listenForUpdates: function () {
            // TOOD: Make a socket and hook this up
            var values = this.values;
        },
        init: function () {
            var IndoorTemperatureStats = this;
            var values = this.values;
            if ( values.average === null || values.min === null || values.max === null ) {
                IndoorTemperatureStats.getValues( "today" );
            }
        }
    };

} );

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


var svcMod = angular.module('myApp.services_indoor_humidity', []);


// Indoor Humidity Reporting
svcMod.factory( "IndoorHumidityReporting", function ( $http, socket ) {

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
        buildChart: function () {
            var chart = this.chart;
            var apiUrl = "/api/indoor/humidity/recent?numberOfReadings=24";

            $http.get( apiUrl ).
                success( function ( data, status ) {
                    data.forEach( function ( element, index, array ) {

                        var parsedTime = makeHoursMinutesTimeString( element.date );
                        chart.data.labels.push( parsedTime );

                        chart.data.datasets[0].data.push( element.percent );

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
        listenForUpdates: function ( ) {
            var chart = this.chart;
            
            socket.on( 'updates:indoor:humidity', function ( data ) {
            
                var newLabel = makeHoursMinutesTimeString( data.date );
                var latestLabel = chart.data.labels[0];

                if ( newLabel != latestLabel ) {
                    // remove oldest one
                    chart.data.labels.pop();
                    chart.data.datasets[0].data.pop();
                    // add new one
                    chart.data.labels.unshift( newLabel );
                    chart.data.datasets[0].data.unshift( data.percent );
                }

            } );
        },
        init: function () {
            var IndoorHumidityReporting = this;
            var currentData = IndoorHumidityReporting.chart.data.datasets[0].data;
            if ( currentData.length === 0 ) {
                IndoorHumidityReporting.buildChart( );
            }
        }
    };

} );

// Indoor Humidity Current
svcMod.factory( "IndoorHumidityCurrent", function ( $http, socket ) {
    
    return {
        values: {
            date: null,
            percent: null
        },
        getValues: function () {
            var values = this.values;
            var apiUrl = "/api/indoor/humidity";

            $http.get( apiUrl ).
                success( function ( data, status) {
                    values.date = data.date;
                    values.percent = data.percent;
                } ).
                error( function ( data, status ) {
                    logError( data );
                } );
        },
        listenForUpdates: function () {
            var values = this.values;
            socket.on( 'updates:indoor:humidity', function ( data ) {
                if ( values.date != data.date ) {
                    values.date = data.date;
                    values.percent = data.percent;
                }
            } );
        },
        init: function () {
            var IndoorHumidityCurrent = this;
            var currentPercent = IndoorHumidityCurrent.values.percent;
            if ( currentPercent === null ) {
                IndoorHumidityCurrent.getValues();
            }
        }
    };

} );

// Indoor Humidity Stats
svcMod.factory( "IndoorHumidityStats", function ( $http, socket ) {

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
            var IndoorHumidityStats = this;
            var apiUrl = "/api/indoor/humidity/stats/" + breakdownType;
            IndoorHumidityStats.loadingValues = true;
            $http.get( apiUrl ).
                success( function ( data, status ) {
                    IndoorHumidityStats.values.label = data.label;
                    IndoorHumidityStats.values.average = data.average.percent;
                    IndoorHumidityStats.values.min = data.min.percent;
                    IndoorHumidityStats.values.max = data.max.percent;
                    IndoorHumidityStats.loadingValues = false;
                } ).
                error( function ( data, status ) {
                    logError( data );
                    IndoorHumidityStats.loadingError = true;
                    IndoorHumidityStats.loadingValues = false;
                } );

        },
        listenForUpdates: function () {
            // TOOD: Make a socket and hook this up
            var values = this.values;
        },
        init: function () {
            var IndoorHumidityStats = this;
            var values = this.values;
            if ( values.average === null || values.min === null || values.max === null ) {
                IndoorHumidityStats.getValues( "today" );
            }
        }
    };

} );

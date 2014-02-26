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


var svcMod = angular.module('myApp.services_system_info', []);


// Current System Memory
svcMod.factory( "SystemMemoryCurrent", function ( $http, socket ) {

    return {
        values: {
            date: null,
            total: null,
            used: null,
            free: null,
            shared: null,
            buffers: null,
            cached: null
        },
        currentMemoryChart: {
            options: {},
            data: []
        },
        buildCurrentMemoryChart: function () {
            var values = this.values;
            var currentMemoryChart = this.currentMemoryChart;
            currentMemoryChart.data = [
                {
                    value: values.used,
                    color: "#F7464A"
                },
                {
                    value: values.free,
                    color: "#4D5360"
                },
                {
                    value: values.shared,
                    color: "#7EC5BC"
                },
                {
                    value: values.buffers,
                    color : "#949FB1"
                },
                {
                    value: values.cached,
                    color : "#D4CCC5"
                }
            ];
        },
        getValues: function () {
            var SystemMemoryCurrent = this;
            var values = this.values;
            var apiUrl = "/api/system/memory";

            $http.get( apiUrl ).
                success( function ( data, status ) {
                    values.date = data.date;
                    values.total = data.total;
                    values.used = data.used;
                    values.free = data.free;
                    values.shared = data.shared;
                    values.buffers = data.buffers;
                    values.cached = data.cached;
                    SystemMemoryCurrent.buildCurrentMemoryChart();
                }).
                error( function ( data, status ) {
                    logError( data );
                });
        },
        listenForUpdates: function () {
            // TOOD: Make a socket and hook this up
            var values = this.values;
        },
        init: function () {
            
            var SystemMemoryCurrent = this;
            
            var values = this.values;
            if ( values.date === null || values.total === null || values.used === null || values.free === null || values.shared === null || values.buffers === null || values.cached === null ) {
                SystemMemoryCurrent.getValues();
            }

        }

    };

} );

// Current System Storage
svcMod.factory( "SystemStorageCurrent", function ( $http, socket ) {

    return {
        values: {
            date: null,
            available: null,
            used: null
        },
        currentStorageChart: {
            options: {},
            data: []
        },
        buildCurrentStorageChart: function () {
            var values = this.values;
            var currentStorageChart = this.currentStorageChart;
            currentStorageChart.data = [
                {
                    value: values.available,
                    color: "#4D5360"
                },
                {
                    value: values.used,
                    color: "#F7464A"
                }
            ];

        },
        getValues: function () {
            var SystemStorageCurrent = this;
            var values = this.values;
            var apiUrl = "/api/system/storage";

            $http.get( apiUrl ).
                success( function ( data, status ) {
                    values.date = data.date;
                    values.available = data.available;
                    values.used = data.used;
                    SystemStorageCurrent.buildCurrentStorageChart();
                }).
                error( function ( data, status ) {
                    logError( data );
                });
        },
        listenForUpdates: function () {
            // TOOD: Make a socket and hook this up
            var values = this.values;
        },
        init: function () {

            var SystemStorageCurrent = this;

            var values = this.values;
            if ( values.available === null || values.used === null ) {
                SystemStorageCurrent.getValues();
            }
        }
    };

} );

// Current System Config
svcMod.factory( "SystemConfigCurrent", function ( $http, socket ) {

    return {
        values: {
            date: null,
            arm_freq: null,
            core_freq: null,
            sdram_freq: null,
            temp_limit: null
        },
        getValues: function () {
            var values = this.values;
            var apiUrl = "/api/system/config";

            $http.get( apiUrl ).
                success( function ( data, status ) {
                    values.date = data.date;
                    values.arm_freq = data.arm_freq;
                    values.core_freq = data.core_freq;
                    values.sdram_freq = data.sdram_freq;
                    values.temp_limit = data.temp_limit;
                } ).
                error( function ( data, status ) {
                    logError( data );
                } );
        },
        init: function () {

            var SystemConfigCurrent = this;

            var values = this.values;
            if ( values.arm_freq === null || values.core_freq === null || values.sdram_freq === null || values.temp_limit === null ) {
                SystemConfigCurrent.getValues();
            }

        }
    };

} );

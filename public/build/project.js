var appMod = angular.module( 'myApp', [
    'ngRoute',
    'myApp.services',
    'myApp.directives',
    'myApp.controllers',
    // Third-party modules
    'angles',
    'angular-skycons'
] );


appMod.config( function( $routeProvider ) {

    $routeProvider.when( '/home', {
        templateUrl: 'partials/home',
        controller: 'Home'
    } );

    $routeProvider.when( '/temperature/recent', {
        templateUrl: 'partials/temperature-recent',
        controller: 'TemperatureRecent'
    } );

    $routeProvider.when( '/temperature/average/weekly', {
        templateUrl: 'partials/temperature-average-weekly',
        controller: 'TemperatureAverageWeekly'
    } );

    $routeProvider.when( '/temperature/average/monthly', {
        templateUrl: 'partials/temperature-average-monthly',
        controller: 'TemperatureAverageMonthly'
    } );

    $routeProvider.when( '/temperature/average/yearly', {
        templateUrl: 'partials/temperature-average-yearly',
        controller: 'TemperatureAverageYearly'
    } );

    $routeProvider.when( '/temperature/average', {
        templateUrl: 'partials/temperature-average',
        controller: 'TemperatureAverage'
    } );

    $routeProvider.when( '/temperature/min-max', {
        templateUrl: 'partials/temperature-min-max',
        controller: 'TemperatureMinMax'
    } );

    $routeProvider.when( '/humidity', {
        templateUrl: 'partials/humidity',
        controller: 'Humidity'
    } );

    $routeProvider.when( '/pressure', {
        templateUrl: 'partials/pressure',
        controller: 'Pressure'
    } );

    $routeProvider.when( '/raspberry-pi', {
        templateUrl: 'partials/raspberry-pi',
        controller: 'RaspberryPi'
    } );

    $routeProvider.when( '/about', {
        templateUrl: 'partials/about'
    } );

    $routeProvider.otherwise( {
        redirectTo: '/home'
    } );

} );

var cMod = angular.module( 'myApp.controllers', [] );


cMod.controller( 'Compatibility', function ( $scope, $window ) {
    $scope.notChrome = typeof window.chrome === "undefined";
} );


cMod.controller( 'Home', function( $scope, SensorReading, RaspberryPi, Weather ) {

    $scope.SensorReading = SensorReading;
    $scope.SensorReading.latest();

    $scope.RaspberryPi = RaspberryPi;
    $scope.RaspberryPi.latest();

    $scope.Weather = Weather;
    $scope.Weather.init();

} );


cMod.controller( 'TemperatureRecent', function( $scope, SensorRecentChart ) {

    $scope.SensorChart = SensorRecentChart;
    $scope.SensorChart.init( 'temperature' );

} );


cMod.controller( 'TemperatureAverageWeekly', function( $scope ) {

} );


cMod.controller( 'TemperatureAverageMonthly', function( $scope ) {

} );


cMod.controller( 'TemperatureAverageYearly', function( $scope ) {

} );


cMod.controller( 'TemperatureMinMax', function( $scope, SensorStatsChart ) {


} );


cMod.controller( 'Humidity', function( $scope, SensorRecentChart ) {

    $scope.SensorChart = SensorRecentChart;
    $scope.SensorChart.init( 'humidity' );

} );


cMod.controller( 'Pressure', function( $scope, SensorRecentChart ) {

    $scope.SensorChart = SensorRecentChart;
    $scope.SensorChart.init( 'pressure' );

} );


cMod.controller( 'RaspberryPi', function ( $scope, RaspberryPiChart ) {

    $scope.RaspberryPiChart = RaspberryPiChart;
    $scope.RaspberryPiChart.init( 'pressure' );

} );

var dMod = angular.module( 'myApp.directives', [] );


dMod.directive( 'appVersion', function( version ) {

    return function( scope, elm, attrs ) {
        elm.text( version );
    };

} );

var sMod = angular.module( 'myApp.services', [] );


sMod.factory( 'API', function ( $http, $location, $window ) {

    var apiRequest = function ( method, path, requestData, callback ) {

        var headers = {
            "Content-Type": "application/json"
        };

        var options = {
            method: method,
            url: path,
            headers: headers,
            data: requestData
        };

        $http( options )
            .success( function ( data, status, headers, config ) {
                callback( null, data );
            } )
            .error( function ( data, status, headers, config ) {
                callback( data, null );
            } );

    };


    return {
        get: function ( path, callback ) {
            return apiRequest( 'GET', path, {}, callback );
        },
        post: function ( path, requestData, callback ) {
            return apiRequest( 'POST', path, requestData, callback );
        },
        put: function ( path, requestData, callback ) {
            return apiRequest( 'PUT', path, requestData, callback );
        },
        patch: function ( path, requestData, callback ) {
            return apiRequest( 'PATCH', path, requestData, callback );
        },
        delete: function ( path, callback ) {
            return apiRequest( 'DELETE', path, {}, callback );
        }
    };

} );


sMod.factory( 'RaspberryPi', function ( API ) {

    return {
        data: {},
        latest: function () {
            var self = this;
            API.get( '/api/latest/raspberry-pi', function ( err, data ) {

                if ( err ) {
                    // TODO: improve error display
                    return alert( "Error with latest reading" );
                }

                self.data = data;

            } );
        }
    };

} );


sMod.factory( 'SensorReading', function ( API ) {

    return {
        data: {},
        latest: function () {
            var self = this;
            API.get( '/api/latest/all', function ( err, data ) {

                if ( err ) {
                    // TODO: improve error display
                    return alert( "Error with latest reading" );
                }

                self.data = data;

            } );
        }
    };

} );


// Helper function used in charting routes
var makeDataSets = function ( rawChartData, propertyName ) {

    var extractPropertyData = function ( chartItem ) {
        return chartItem[ propertyName ];
    };

    return {
        fillColor : "rgba(151,187,205,0)",
        strokeColor : "#e67e22",
        highlightFill: "rgba(220,220,220,0.75)",
        highlightStroke: "rgba(220,220,220,1)",
        pointColor : "rgba(151,187,205,0)",
        pointStrokeColor : "#e67e22",
        data: rawChartData.map( extractPropertyData )
    };

};


sMod.factory( 'SensorRecentChart', function ( API, $window ) {

    var chartWidth = function () {

        return ( $window.innerWidth - 150 );

    };

    var chartDataProps = {
        temperature: 'temp_f',
        humidity: 'humidity',
        pressure: 'pressure'
    };

    var makeLabels = function ( rawChartData ) {

        var extractDateParts = function ( chartItem ) {
            var d = new Date( chartItem.date );
            var hours = d.getHours();
            var minutes = d.getMinutes();
            if ( minutes < 10 ) {
                return hours + ":0" + minutes;
            }
            return hours + ":" + minutes;
        };

        return rawChartData.map( extractDateParts );

    };

    return {
        width: chartWidth(),
        data:{
            labels: [],
            datasets: []
        },
        init: function ( chartType ) {

            var self = this;

            API.get( '/api/chart/' + chartType, function ( err, data ) {

                if ( err ) {
                    // TODO: improve error display
                    return alert( "Error with " + chartType + " chart" );
                }

                self.data.labels = makeLabels( data );
                self.data.datasets.push( makeDataSets( data, chartDataProps[ chartType ] ) );

            } );
        }
    };

} );


sMod.factory( "SensorStatsChart", [ "API", function ( API ) {

    var makeLabels = function ( rawChartData ) {

        var extractDateParts = function ( chartItem ) {
            var d = new Date( chartItem.date );
            var day = d.getDate();
            var month = d.getMonth() + 1;
            var year = d.getFullYear();
            return year + "/" + month + "/" + day;
        };

        return rawChartData.map( extractDateParts );

    };

    return {
        data: {
            labels: [],
            datasets: []
        },
        average: function ( options ) {

            var self = this;
            var chart = options.chart;
            var stat = options.stat;
            var readings = options.readings;

            var url = "/api/chart/" + chart + "/stats?stat=" + stat + "&readings=" + readings;

            API.get( url, function ( err, results ) {

                if ( err ) {
                    // TODO: improve error display
                    return alert( "Error with " + chart + " stats chart" );
                }

                self.data.datasets = [];
                self.data.labels = makeLabels( results );
                self.data.datasets.push( makeDataSets( results, "avg_temp_f" ) );

                console.log( self.data );

            } );

        },
        minMax: function ( options ) {

            var self = this;
            var chart = options.chart;
            var stat = options.stat;
            var readings = options.readings;

        },
        weeklyAverage: function ( chart ) {

            var self = this;

            return self.average( {
                chart: chart,
                stat: "WEEKLY",
                readings: 52
            } );

        },
        weeklyMinMax: function ( chart ) {

        },
        monthlyAverage: function ( chart ) {

            var self = this;

            return self.average( {
                chart: chart,
                stat: "MONTHLY",
                readings: 12
            } );

        },
        monthlyMinMax: function ( chart ) {

        },
        yearlyAverage: function ( chart ) {

            var self = this;

            return self.average( {
                chart: chart,
                stat: "YEARLY",
                readings: 5
            } );

        },
        yearlyMinMax: function ( chart ) {

        },
    };

} ] );


sMod.factory( 'RaspberryPiChart', function ( API, $window ) {

    var chartWidth = function () {

        return ( $window.innerWidth - 150 );

    };

    return {
        width: chartWidth(),
        data:{
            labels: [],
            datasets: []
        },
        init: function () {

            var self = this;

            API.get( '/api/chart/raspberry-pi', function ( err, data ) {

                if ( err ) {
                    // TODO: improve error display
                    return alert( "Error with raspberry-pi chart" );
                }

                self.data.labels = makeLabels( data );
                self.data.datasets = makeDataSets( data, 'temp_f' );

            } );
        }
    };

} );


sMod.factory( 'Weather', function ( API, $window ) {

    var formatData = function ( data ) {

        var convertWindBearing = function ( windBearing ) {

            if ( windBearing === 0 ) {
                return "North";
            }

            if ( windBearing > 0 && windBearing < 90 ) {
                return "North East";
            }

            if ( windBearing === 90 ) {
                return "East";
            }

            if ( windBearing > 90 && windBearing < 180 ) {
                return "South East";
            }

            if ( windBearing === 180 ) {
                return "South";
            }

            if ( windBearing > 180 && windBearing < 270 ) {
                return "South West";
            }

            if ( windBearing === 270 ) {
                return "West";
            }

            if ( windBearing > 270 && windBearing < 360 ) {
                return "North West";
            }

        };

        data.windBearing = convertWindBearing( data.windBearing );
        data.time = data.time * 1000;
        data.humidity = Math.round(data.humidity * 100);


        return data;

    };

    var calcIconSize = function () {

        var blockWidth = $window.innerWidth;
        if ( $window.innerWidth > 991 ) {
            blockWidth = $window.innerWidth / 3.0;
        }
        return blockWidth - 200;

    };

    return {
        loading: false,
        currently: {},
        hourly: {},
        init: function () {

            var self = this;

            self.loading = true;
            API.get( '/api/weather', function ( err, data ) {

                self.loading = false;

                if ( err ) {
                    // TODO: improve error display
                    return alert( "Error with weather API" );
                }

                self.currently = formatData( data.currently );
                console.log( calcIconSize() );
                self.currently.iconSize = calcIconSize();
                self.hourly = data.hourly;
                self.hourly.data = data.hourly.data.map( formatData );

            } );
        }
    };

} );

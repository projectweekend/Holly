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


sMod.factory( "ActiveMenuItem", [ "$location", function ( $location ) {
    return function ( activePath ) {
        if ( activePath === $location.path() ) {
            return "active";
        }
        return "";
    };
} ] );


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


sMod.factory( "StatChartUtils", [ function () {
    return {
        makeLabels: function ( rawChartData ) {

            var extractDateParts = function ( chartItem ) {
                var d = new Date( chartItem.date );
                var day = d.getDate();
                var month = d.getMonth() + 1;
                var year = d.getFullYear();
                return year + "/" + month + "/" + day;
            };

            return rawChartData.map( extractDateParts );

        }
    };
} ] );


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

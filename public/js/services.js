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


sMod.factory( 'SensorChart', function ( API, $window ) {

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

        return [ {
            fillColor : "rgba(151,187,205,0)",
            strokeColor : "#e67e22",
            pointColor : "rgba(151,187,205,0)",
            pointStrokeColor : "#e67e22",
            data: rawChartData.map( extractPropertyData )
        } ];

    };

    var chartWidth = function () {

        return ( $window.innerWidth - 150 );

    };

    var chartDataProps = {
        temperature: 'temp_f',
        humidity: 'humidity',
        pressure: 'pressure'
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
                    return alert( "Error with " + chartType + " chart" );
                }

                self.data.labels = makeLabels( data );
                self.data.datasets = makeDataSets( data, chartDataProps[ chartType ] );

            } );
        }
    };

} );

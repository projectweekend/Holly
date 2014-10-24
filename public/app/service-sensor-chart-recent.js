var sMod = angular.module( 'myApp.service-sensor-chart-recent', [] );


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

var cMod = angular.module( 'myApp.controller-temperature-average', [] );


cMod.controller( 'TemperatureAverageWeekly',
    function( $scope, ActiveMenuItem, API ) {

        $scope.ActiveMenuItem = ActiveMenuItem;

        $scope.chart = {
            labels: [],
            datasets: []
        };

        var apiURL = "/api/chart/temperature/stats?stat=WEEKLY&readings=52";

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

        var makeDataSets = function ( rawChartData, propertyName ) {

            var extractPropertyData = function ( chartItem ) {
                return chartItem[ propertyName ];
            };

            return {
                fillColor : "rgba(230,126,34,0.5)",
                strokeColor : "rgba(230,126,34,1)",
                highlightFill: "rgba(230,126,34,0.8)",
                highlightStroke: "rgba(230,126,34,1)",
                data: rawChartData.map( extractPropertyData )
            };

        };

        API.get( apiURL, function ( err, data ) {
            if ( err ) {
                return alert( "Error with weekly average temperature chart" );
            }
            $scope.chart.labels = makeLabels( data );
            $scope.chart.datasets.push( makeDataSets( data, "avg_temp_f" ) );
        } );

    } );


cMod.controller( 'TemperatureAverageMonthly',
    function( $scope, ActiveMenuItem ) {

        $scope.ActiveMenuItem = ActiveMenuItem;

    } );


cMod.controller( 'TemperatureAverageYearly',
    function( $scope, ActiveMenuItem ) {

        $scope.ActiveMenuItem = ActiveMenuItem;

    } );

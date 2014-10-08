var cMod = angular.module( 'myApp.controller-temperature-average', [] );


var makeDataSets = function ( rawChartData ) {

    var extractPropertyData = function ( chartItem ) {
        return chartItem[ "avg_temp_f" ];
    };

    return {
        fillColor : "rgba(230,126,34,0.5)",
        strokeColor : "rgba(230,126,34,1)",
        highlightFill: "rgba(230,126,34,0.8)",
        highlightStroke: "rgba(230,126,34,1)",
        data: rawChartData.map( extractPropertyData )
    };

};


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


cMod.controller( 'TemperatureAverageWeekly',
    function( $scope, ActiveMenuItem, API ) {

        $scope.ActiveMenuItem = ActiveMenuItem;

        $scope.chart = {
            labels: [],
            datasets: []
        };

        var apiURL = "/api/chart/temperature/stats?stat=WEEKLY&readings=52";

        API.get( apiURL, function ( err, data ) {
            if ( err ) {
                return alert( "Error with average temperature chart" );
            }
            $scope.chart.labels = makeLabels( data );
            $scope.chart.datasets.push( makeDataSets( data ) );
        } );

    } );


cMod.controller( 'TemperatureAverageMonthly',
    function( $scope, ActiveMenuItem, API ) {

        $scope.ActiveMenuItem = ActiveMenuItem;

        $scope.chart = {
            labels: [],
            datasets: []
        };

        var apiURL = "/api/chart/temperature/stats?stat=MONTHLY&readings=12";

        API.get( apiURL, function ( err, data ) {
            if ( err ) {
                return alert( "Error with average temperature chart" );
            }
            $scope.chart.labels = makeLabels( data );
            $scope.chart.datasets.push( makeDataSets( data ) );
        } );

    } );


cMod.controller( 'TemperatureAverageYearly',
    function( $scope, ActiveMenuItem, API ) {

        $scope.ActiveMenuItem = ActiveMenuItem;

        $scope.chart = {
            labels: [],
            datasets: []
        };

        var apiURL = "/api/chart/temperature/stats?stat=YEARLY&readings=5";

        API.get( apiURL, function ( err, data ) {
            if ( err ) {
                return alert( "Error with average temperature chart" );
            }
            $scope.chart.labels = makeLabels( data );
            $scope.chart.datasets.push( makeDataSets( data ) );
        } );

    } );

    var cMod = angular.module( 'myApp.controller-temperature-min-max', [] );


cMod.controller( 'TemperatureMinMaxWeekly',
    function( $scope, ActiveMenuItem, API, StatChartUtils ) {

        $scope.ActiveMenuItem = ActiveMenuItem;

        var apiURL = "/api/chart/temperature/stats?stat=WEEKLY&readings=52";

    } );


cMod.controller( 'TemperatureMinMaxMonthly',
    function( $scope, ActiveMenuItem, API, StatChartUtils ) {

        $scope.ActiveMenuItem = ActiveMenuItem;

        var apiURL = "/api/chart/temperature/stats?stat=MONTHLY&readings=12";

    } );


cMod.controller( 'TemperatureMinMaxYearly',
    function( $scope, ActiveMenuItem, API, StatChartUtils ) {

        $scope.ActiveMenuItem = ActiveMenuItem;

        var apiURL = "/api/chart/temperature/stats?stat=YEARLY&readings=5";

    } );

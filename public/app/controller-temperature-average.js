var cMod = angular.module( 'myApp.controller-temperature-average', [] );


cMod.controller( 'TemperatureAverageWeekly',
    function( $scope, ActiveMenuItem) {

        $scope.ActiveMenuItem = ActiveMenuItem;

    } );


cMod.controller( 'TemperatureAverageMonthly',
    function( $scope, ActiveMenuItem ) {

        $scope.ActiveMenuItem = ActiveMenuItem;

    } );


cMod.controller( 'TemperatureAverageYearly',
    function( $scope, ActiveMenuItem ) {

        $scope.ActiveMenuItem = ActiveMenuItem;

    } );

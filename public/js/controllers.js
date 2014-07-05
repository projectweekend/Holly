var cMod = angular.module( 'myApp.controllers', [] );


cMod.controller( 'Home', function( $scope, TemperatureChart ) {

    $scope.TemperatureChart = TemperatureChart;
    $scope.TemperatureChart.init();

} );


cMod.controller( 'MyCtrl2', function( $scope ) {

} );

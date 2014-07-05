var cMod = angular.module( 'myApp.controllers', [] );


cMod.controller( 'Home', function( $scope, TemperatureChart ) {

    $scope.temperatureChart = TemperatureChart;
    $scope.temperatureOptions = {};

} );


cMod.controller( 'MyCtrl2', function( $scope ) {

} );

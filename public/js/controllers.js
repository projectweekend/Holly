var cMod = angular.module( 'myApp.controllers', [] );


cMod.controller( 'Home', function( $scope, SensorReading ) {

    $scope.SensorReading = SensorReading;
    $scope.SensorReading.latest();

} );


cMod.controller( 'Temperature', function( $scope, SensorChart ) {

    $scope.SensorChart = SensorChart;
    $scope.SensorChart.init( 'temperature' );

} );


cMod.controller( 'Humidity', function( $scope, SensorChart ) {

    $scope.SensorChart = SensorChart;
    $scope.SensorChart.init( 'humidity' );

} );


cMod.controller( 'Pressure', function( $scope, SensorChart ) {

    $scope.SensorChart = SensorChart;
    $scope.SensorChart.init( 'pressure' );

} );

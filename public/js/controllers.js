var cMod = angular.module( 'myApp.controllers', [] );


cMod.controller( 'Compatibility', function ( $scope, $window ) {
    $scope.notChrome = typeof window.chrome === "undefined";
} );


cMod.controller( 'Home', function( $scope, SensorReading, RaspberryPi ) {

    $scope.SensorReading = SensorReading;
    $scope.SensorReading.latest();

    $scope.RaspberryPi = RaspberryPi;
    $scope.RaspberryPi.latest();

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

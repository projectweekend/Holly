var cMod = angular.module( 'myApp.controllers', [] );


cMod.controller( 'Compatibility', function ( $scope, $window ) {
    $scope.notChrome = typeof window.chrome === "undefined";
} );


cMod.controller( 'Home', function( $scope, SensorReading, RaspberryPi, Weather ) {

    $scope.SensorReading = SensorReading;
    $scope.SensorReading.latest();

    $scope.RaspberryPi = RaspberryPi;
    $scope.RaspberryPi.latest();

    $scope.Weather = Weather;
    $scope.Weather.init();

} );


cMod.controller( 'TemperatureRecent', function( $scope, SensorRecentChart ) {

    $scope.SensorChart = SensorRecentChart;
    $scope.SensorChart.init( 'temperature' );

} );


cMod.controller( 'TemperatureAverageWeekly', function( $scope ) {

} );


cMod.controller( 'TemperatureAverageMonthly', function( $scope ) {

} );


cMod.controller( 'TemperatureAverageYearly', function( $scope ) {

} );


cMod.controller( 'TemperatureMinMax', function( $scope, SensorStatsChart ) {


} );


cMod.controller( 'Humidity', function( $scope, SensorRecentChart ) {

    $scope.SensorChart = SensorRecentChart;
    $scope.SensorChart.init( 'humidity' );

} );


cMod.controller( 'Pressure', function( $scope, SensorRecentChart ) {

    $scope.SensorChart = SensorRecentChart;
    $scope.SensorChart.init( 'pressure' );

} );


cMod.controller( 'RaspberryPi', function ( $scope, RaspberryPiChart ) {

    $scope.RaspberryPiChart = RaspberryPiChart;
    $scope.RaspberryPiChart.init( 'pressure' );

} );

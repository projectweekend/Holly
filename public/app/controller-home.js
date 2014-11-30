var cMod = angular.module( 'myApp.controller-home', [] );


cMod.controller( 'Home', function( $scope, SensorReading, RaspberryPi, Weather ) {

    $scope.SensorReading = SensorReading;
    $scope.SensorReading.latest();

    $scope.RaspberryPi = RaspberryPi;
    // $scope.RaspberryPi.latest();

    $scope.Weather = Weather;
    $scope.Weather.init();

} );

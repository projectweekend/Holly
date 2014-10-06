var cMod = angular.module( 'myApp.controller-temperature-recent', [] );


cMod.controller( 'TemperatureRecent', function( $scope, SensorRecentChart ) {

    $scope.SensorChart = SensorRecentChart;
    $scope.SensorChart.init( 'temperature' );

} );

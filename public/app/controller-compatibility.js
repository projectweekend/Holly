var cMod = angular.module( 'myApp.controller-compatibility', [] );


cMod.controller( 'Compatibility', function ( $scope, $window ) {
    $scope.notChrome = typeof window.chrome === "undefined";
} );

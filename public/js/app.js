var appMod = angular.module( 'myApp', [
    'ngRoute',
    'myApp.services',
    'myApp.directives',
    'myApp.controllers'
] );


appMod.config( function( $routeProvider ) {

    $routeProvider.when( '/view1', {
        templateUrl: 'partials/partial1.html',
        controller: 'MyCtrl1'
    } );

    $routeProvider.when( '/view2', {
        templateUrl: 'partials/partial2.html',
        controller: 'MyCtrl2'
    } );

    $routeProvider.otherwise( {
        redirectTo: '/view1'
    } );

} );

var sMod = angular.module( 'myApp.service-active-menu', [] );


sMod.factory( "ActiveMenuItem", [ "$location", function ( $location ) {
    return function ( activePath ) {
        if ( activePath === $location.path() ) {
            return "active";
        }
        return "";
    };
} ] );

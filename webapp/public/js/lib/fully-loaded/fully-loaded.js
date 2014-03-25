var fullyLoaded = angular.module( 'fully-loaded', [] );


fullyLoaded.directive( 'status', function () {
	return {
        restrict: 'E',
        scope: {
            data: "="
        },
        templateUrl: "",
        link: function ( scope, element, attrs ) {

        }
	};
} );

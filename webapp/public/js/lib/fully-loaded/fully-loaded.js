var fullyLoaded = angular.module( 'fully-loaded', [] );


fullyLoaded.directive( 'flStatus', function () {
	return {
        restrict: 'E',
        scope: {
            status: "="
        },
        templateUrl: "fully-loaded/status.html",
        link: function ( scope, element, attrs ) {

			scope.$watch( 'status.loading', function () {

				if ( !scope.status.loading ) {
					element.hide();
				}

			}, true );

        }
	};
} );

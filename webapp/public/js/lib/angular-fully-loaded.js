var fullyLoaded = angular.module( 'angular-fully-loaded', [] );


fullyLoaded.directive( 'flLoading', function () {
	return {
        restrict: 'E',
        scope: {
            data: "="
        },
        templateUrl: function ( element, attrs ) {
			return attrs.template;
        },
        link: function ( scope, element, attrs ) {

			scope.$watch( 'data.loading', function () {
				if ( !scope.data.loading ) {
					element.hide();
				} else {
					element.show();
				}
			}, true );

        }
	};
} );

fullyLoaded.directive( 'flError', function () {
	return {
		restrict: 'E',
		scope: {
			data: "="
		},
        templateUrl: function ( element, attrs ) {
			return attrs.template;
        },
        link: function ( scope, element, attrs ) {

			scope.$watch( 'data.error', function () {
				if ( !scope.data.error ) {
					element.hide();
				} else {
					element.show();
				}
			}, true );

        }
	};
} );

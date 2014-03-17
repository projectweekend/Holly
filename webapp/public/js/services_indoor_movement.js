'use strict';


var logError = function ( data ) {
    console.log( data );
};


var svcMod = angular.module('myApp.services_indoor_movement', []);


svcMod.factory( "IndoorMovementToday", function ( $http ) {

    return {
        chart: {
            options: {},
            data: {
                labels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
                datasets: [
                    {
                        fillColor : "rgba(220,220,220,0.5)",
                        strokeColor : "rgba(220,220,220,1)",
                        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                    }
                ]
            }
        },
        buildChart: function () {
			var chart = this.chart;
			var apiUrl = "/api/indoor/movement/stats/today";

			$http.get( apiUrl ).
				success( function ( data, status ) {
					data.forEach( function ( element, index, array ) {
						chart.data.datasets[0].data[element._id] = element.value;
					} );
				} ).
				error( function ( data, status ) {
					logError( data );
				} );
        },
        init: function () {
			var IndoorMovementToday = this;
			IndoorMovementToday.buildChart();
        }
    };

} );

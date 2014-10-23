var sMod = angular.module( 'myApp.service-stat-chart-utils', [] );


sMod.factory( "StatChartUtils", [ function () {
    return {
        makeLabels: function ( rawChartData ) {

            var extractDateParts = function ( chartItem ) {
                var d = new Date( chartItem.date );
                var day = d.getDate();
                var month = d.getMonth() + 1;
                var year = d.getFullYear();
                return year + "/" + month + "/" + day;
            };

            return rawChartData.map( extractDateParts );

        },
        makeDataset: function ( rawChartData, chartDataProp ) {

            var extractPropertyData = function ( chartItem ) {
                return chartItem[ chartDataProp ];
            };

            return {
                fillColor : "rgba(230,126,34,0.5)",
                strokeColor : "rgba(230,126,34,1)",
                highlightFill: "rgba(230,126,34,0.8)",
                highlightStroke: "rgba(230,126,34,1)",
                data: rawChartData.map( extractPropertyData )
            };

        }
    };
} ] );

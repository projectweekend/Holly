var sMod = angular.module( 'myApp.service-raspberry-pi-chart', [] );


sMod.factory( 'RaspberryPiChart', function ( API, $window ) {

    var chartWidth = function () {

        return ( $window.innerWidth - 150 );

    };

    return {
        width: chartWidth(),
        data:{
            labels: [],
            datasets: []
        },
        init: function () {

            var self = this;

            API.get( '/api/chart/raspberry-pi', function ( err, data ) {

                if ( err ) {
                    // TODO: improve error display
                    return alert( "Error with raspberry-pi chart" );
                }

                self.data.labels = makeLabels( data );
                self.data.datasets = makeDataSets( data, 'temp_f' );

            } );
        }
    };

} );

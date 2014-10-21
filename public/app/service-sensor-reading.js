var sMod = angular.module( 'myApp.service-sensor-reading', [] );


sMod.factory( 'SensorReading', function ( API ) {

    return {
        data: {},
        latest: function () {
            var self = this;
            API.get( '/api/latest/all', function ( err, data ) {

                if ( err ) {
                    // TODO: improve error display
                    return alert( "Error with latest reading" );
                }

                self.data = data;

            } );
        }
    };

} );

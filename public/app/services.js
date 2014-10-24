var sMod = angular.module( 'myApp.services', [] );


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


sMod.factory( 'Weather', function ( API, $window ) {

    var formatData = function ( data ) {

        var convertWindBearing = function ( windBearing ) {

            if ( windBearing === 0 ) {
                return "North";
            }

            if ( windBearing > 0 && windBearing < 90 ) {
                return "North East";
            }

            if ( windBearing === 90 ) {
                return "East";
            }

            if ( windBearing > 90 && windBearing < 180 ) {
                return "South East";
            }

            if ( windBearing === 180 ) {
                return "South";
            }

            if ( windBearing > 180 && windBearing < 270 ) {
                return "South West";
            }

            if ( windBearing === 270 ) {
                return "West";
            }

            if ( windBearing > 270 && windBearing < 360 ) {
                return "North West";
            }

        };

        data.windBearing = convertWindBearing( data.windBearing );
        data.time = data.time * 1000;
        data.humidity = Math.round(data.humidity * 100);


        return data;

    };

    var calcIconSize = function () {

        var blockWidth = $window.innerWidth;
        if ( $window.innerWidth > 991 ) {
            blockWidth = $window.innerWidth / 3.0;
        }
        return blockWidth - 200;

    };

    return {
        loading: false,
        currently: {},
        hourly: {},
        init: function () {

            var self = this;

            self.loading = true;
            API.get( '/api/weather', function ( err, data ) {

                self.loading = false;

                if ( err ) {
                    // TODO: improve error display
                    return alert( "Error with weather API" );
                }

                self.currently = formatData( data.currently );
                console.log( calcIconSize() );
                self.currently.iconSize = calcIconSize();
                self.hourly = data.hourly;
                self.hourly.data = data.hourly.data.map( formatData );

            } );
        }
    };

} );

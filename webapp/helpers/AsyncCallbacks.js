exports.buildHumidityAverageCallback = function ( config, output ) {

    return function ( callback ) {

        var avgConfig = {
            out: { replace: config.collection },
            query: config.query,
            map: function () { emit( 1, this.humidity ); },
            reduce: function ( keyVal, humidityValues ) { return Array.avg( humidityValues ); }
        };

        config.model.mapReduce( avgConfig, function ( err, model, stats ) {
            if ( err ) {
                console.log( err );
                return callback( err );
            }
            model.find( {}, function ( err, data ) {
                if ( err ) {
                    return callback( err );
                }
                if ( data.length > 0 ) {
                    output.average.percent = data[0].value;
                } else {
                    output.average.percent = "No data";
                }
                callback();
            } );
        } );

    };

};


exports.buildHumidityMinMaxCallback = function ( config, output ) {

    return function ( callback ) {

        var maxConfig = {
            out: { replace: config.collection },
            query: config.query,
            map: function () {
                var x = { percent: this.humidity, _id: this._id };
                emit( 1, { min: x, max: x } );
            },
            reduce: function (key, humidityValues) {
                var result = humidityValues[0];
                for ( var i = 1; i < humidityValues.length; i++ ) {
                    if ( humidityValues[i].min.percent < result.min.percent ) {
                        result.min = humidityValues[i].min;
                    }
                    if ( humidityValues[i].max.percent > result.max.percent ) {
                        result.max = humidityValues[i].max;
                    }
                }
                return result;
            }
        };

        config.model.mapReduce( maxConfig, function ( err, model, stats ) {

            if ( err ) {
                console.log( err );
                return callback( err );
            }

            model.find( {}, function ( err, data ) {
                if ( err ) {
                    return callback( err );
                }
                if ( data.length > 0 ) {
                    output.min.percent = data[0].value.min.percent;
                    output.max.percent = data[0].value.max.percent;
                } else {
                    output.min.percent = "No data";
                    output.max.percent = "No data";
                }
                callback();
            } );
        } );

    };

};


exports.buildFahrenheitAverageCallback = function ( config, output ) {

    // performs fahrenheit average map reduce
    return function ( callback ) {

        var avgConfig = {
            out: { replace: config.collection },
            query: config.query,
            map: function () { emit( 1, this.fahrenheit ); },
            reduce: function ( keyVal, fahrenheitValues ) { return Array.avg( fahrenheitValues ); }
        };

        config.model.mapReduce( avgConfig, function ( err, model, stats ) {
            if ( err ) {
                console.log( err );
                return callback( err );
            }
            model.find( {}, function ( err, data ) {
                if ( err ) {
                    return callback( err );
                }
                if ( data.length > 0 ) {
                    output.average.fahrenheit = data[0].value;
                } else {
                    output.average.fahrenheit = "No data";
                }
                callback();
            } );
        } );

    };

};


exports.buildCelsiusAverageCallback = function ( config, output ) {

    // performs celsius average map reduce
    return function ( callback ) {

        var avgConfig = {
            out: { replace: config.collection },
            query: config.query,
            map: function () { emit( 1, this.celsius ); },
            reduce: function ( keyVal, celsiusValues ) { return Array.avg( celsiusValues ); }
        };

        config.model.mapReduce( avgConfig, function ( err, model, stats ) {
            if ( err ) {
                console.log( err );
                return callback( err );
            }
            model.find( {}, function ( err, data ) {
                if ( err ) {
                    return callback( err );
                }
                if ( data.length > 0 ) {
                    output.average.celsius = data[0].value;
                } else {
                    output.average.celsius = "No data";
                }
                callback();
            } );
        } );

    };
};


exports.buildFahrenheitMinMaxCallback = function ( config, output ) {

    // performs fahrenheit min/max map reduce
    return function ( callback ) {

        var maxConfig = {
            out: { replace: config.collection },
            query: config.query,
            map: function () {
                var x = { fahrenheit: this.fahrenheit, _id: this._id };
                emit( 1, { min: x, max: x } );
            },
            reduce: function (key, fahrenheitValues) {
                var result = fahrenheitValues[0];
                for ( var i = 1; i < fahrenheitValues.length; i++ ) {
                    if ( fahrenheitValues[i].min.fahrenheit < result.min.fahrenheit ) {
                        result.min = fahrenheitValues[i].min;
                    }
                    if ( fahrenheitValues[i].max.fahrenheit > result.max.fahrenheit ) {
                        result.max = fahrenheitValues[i].max;
                    }
                }
                return result;
            }
        };

        config.model.mapReduce( maxConfig, function ( err, model, stats ) {

            if ( err ) {
                console.log( err );
                return callback( err );
            }

            model.find( {}, function ( err, data ) {
                if ( err ) {
                    return callback( err );
                }
                if ( data.length > 0 ) {
                    output.min.fahrenheit = data[0].value.min.fahrenheit;
                    output.max.fahrenheit = data[0].value.max.fahrenheit;
                } else {
                    output.min.fahrenheit = "No data";
                    output.max.fahrenheit = "No data";
                }
                callback();
            } );
        } );

    };

};


exports.buildCelsiusMinMaxCallback = function ( config, output ) {

    // performs celsius min/max map reduce
    return function ( callback ) {

        var maxConfig = {
            out: { replace: config.collection },
            query: config.query,
            map: function () {
                var x = { celsius: this.celsius, _id: this._id };
                emit( 1, { min: x, max: x } );
            },
            reduce: function (key, celsiusValues) {
                var result = celsiusValues[0];
                for ( var i = 1; i < celsiusValues.length; i++ ) {
                    if ( celsiusValues[i].min.celsius < result.min.celsius ) {
                        result.min = celsiusValues[i].min;
                    }
                    if ( celsiusValues[i].max.celsius > result.max.celsius ) {
                        result.max = celsiusValues[i].max;
                    }
                }
                return result;
            }
        };

        config.model.mapReduce( maxConfig, function ( err, model, stats ) {

            if ( err ) {
                console.log( err );
                return callback( err );
            }

            model.find( {}, function ( err, data ) {
                if ( err ) {
                    return callback( err );
                }
                if ( data.length > 0 ) {
                    output.min.celsius = data[0].value.min.celsius;
                    output.max.celsius = data[0].value.max.celsius;
                } else {
                    output.min.celsius = "No data";
                    output.max.celsius = "No data";
                }
                callback();
            } );
        } );

    };

};

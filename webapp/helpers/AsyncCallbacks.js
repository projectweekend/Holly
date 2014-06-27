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
                    output.average.humidity = data[0].value;
                } else {
                    output.average.humidity = "No data";
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
                var x = { humidity: this.humidity, _id: this._id };
                emit( 1, { min: x, max: x } );
            },
            reduce: function (key, humidityValues) {
                var result = humidityValues[0];
                for ( var i = 1; i < humidityValues.length; i++ ) {
                    if ( humidityValues[i].min.humidity < result.min.humidity ) {
                        result.min = humidityValues[i].min;
                    }
                    if ( humidityValues[i].max.humidity > result.max.humidity ) {
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
                    output.min.humidity = data[0].value.min.humidity;
                    output.max.humidity = data[0].value.max.humidity;
                } else {
                    output.min.humidity = "No data";
                    output.max.humidity = "No data";
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
            map: function () { emit( 1, this.temp_f ); },
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
                    output.average.temp_f = data[0].value;
                } else {
                    output.average.temp_f = "No data";
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
            map: function () { emit( 1, this.temp_c ); },
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
                    output.average.temp_c = data[0].value;
                } else {
                    output.average.temp_c = "No data";
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
                var x = { temp_f: this.temp_f, _id: this._id };
                emit( 1, { min: x, max: x } );
            },
            reduce: function (key, fahrenheitValues) {
                var result = fahrenheitValues[0];
                for ( var i = 1; i < fahrenheitValues.length; i++ ) {
                    if ( fahrenheitValues[i].min.temp_f < result.min.temp_f ) {
                        result.min = fahrenheitValues[i].min;
                    }
                    if ( fahrenheitValues[i].max.temp_f > result.max.temp_f ) {
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
                    output.min.temp_f = data[0].value.min.temp_f;
                    output.max.temp_f = data[0].value.max.temp_f;
                } else {
                    output.min.temp_f = "No data";
                    output.max.temp_f = "No data";
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
                var x = { temp_c: this.temp_c, _id: this._id };
                emit( 1, { min: x, max: x } );
            },
            reduce: function (key, celsiusValues) {
                var result = celsiusValues[0];
                for ( var i = 1; i < celsiusValues.length; i++ ) {
                    if ( celsiusValues[i].min.temp_c < result.min.temp_c ) {
                        result.min = celsiusValues[i].min;
                    }
                    if ( celsiusValues[i].max.temp_c > result.max.temp_c ) {
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
                    output.min.temp_c = data[0].value.min.temp_c;
                    output.max.temp_c = data[0].value.max.temp_c;
                } else {
                    output.min.temp_c = "No data";
                    output.max.temp_c = "No data";
                }
                callback();
            } );
        } );

    };

};

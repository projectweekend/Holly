var appModels = require( '../models' ),
	weatherman = require('weatherman.io');

 
var errorHandler = function ( err, res ) {
    console.log( err );
    res.send( 500 );
};


var forecastIOKey = "Not defined";
var loadThirdPartyConfig = function () {

	var q = ThirdPartyConfig.findOne({config_key: 'FORECAST_IO_API_KEY'});
	q.exec( function ( err, data ) {
		if ( data ) {
			forecastIOKey = data.config_value;
		}
	} );

};
loadThirdPartyConfig();


exports.forecastIO = function ( req, res ) {
	var theWeatherman = weatherman(forecastIOKey);
	theWeatherman.options = {'exclude': ["minutely", "daily", "flags"]};
	theWeatherman.goOnLocation(41.8854710, -87.6430260);
	theWeatherman.doForecast( function ( err, weatherReport ) {
		if ( err ) {
			return errorHandler( err, res );
		}
		return res.json( weatherReport );
	} );
};

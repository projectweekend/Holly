var appModels = require( '../models' ),
	weatherman = require('weatherman.io');

 
var errorHandler = function ( err, res ) {
    console.log( err );
    res.send( 500 );
};


var convertDate = function ( unixTime ) {
	return new Date( unixTime * 1000 );
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


exports.forecastIOCurrent = function ( req, res ) {

	var latitude = req.query.latitude;
	var longitude = req.query.longitude;

	var theWeatherman = weatherman(forecastIOKey);
	theWeatherman.options = {'exclude': ["minutely", "hourly", "daily", "flags"]};
	theWeatherman.goOnLocation(latitude, longitude);
	theWeatherman.doForecast( function ( err, weatherReport ) {
		if ( err ) {
			return errorHandler( err, res );
		}
		var output = {
			dateTime: convertDate(weatherReport.currently.time),
			icon: weatherReport.currently.icon,
			summary: weatherReport.currently.summary,
			temperature: weatherReport.currently.temperature,
			feelsLike: weatherReport.currently.apparentTemperature,
			windSpeed: weatherReport.currently.windSpeed,
			windBearing: "N/A",
			humidity: weatherReport.currently.humidity
		};
		if ( output.windSpeed > 0 ) {
			var windBearing = weatherReport.currently.windBearing;
			if ( windBearing === 0  ) {
				output.windBearing = "North";
			}
			if ( windBearing < 90 ) {
				output.windBearing = "North East";
			}
			if ( windBearing === 90 ) {
				output.windBearing = "East";
			}
			if ( windBearing < 180 ) {
				output.windBearing = "South East";
			}
			if ( windBearing === 180 ) {
				output.windBearing = "South";
			}
			if ( windBearing < 270 ) {
				output.windBearing = "South West";
			}
			if ( windBearing === 270 ) {
				output.windBearing = "West";
			}
			if ( windBearing > 270 ) {
				output.windBearing = "North West";
			}
		}

		return res.json( output );
	} );
};


exports.forecastIOHourly = function ( req, res ) {
	var theWeatherman = weatherman(forecastIOKey);
	theWeatherman.options = {'exclude': ["minutely", "currently", "daily", "flags", "alerts"]};
	theWeatherman.goOnLocation(41.8854710, -87.6430260);
	theWeatherman.doForecast( function ( err, weatherReport ) {
		if ( err ) {
			return errorHandler( err, res );
		}
		return res.json( weatherReport );
	} );
};


exports.forecastIODaily = function ( req, res ) {
	var theWeatherman = weatherman(forecastIOKey);
	theWeatherman.options = {'exclude': ["minutely", "currently", "hourly", "flags", "alerts"]};
	theWeatherman.goOnLocation(41.8854710, -87.6430260);
	theWeatherman.doForecast( function ( err, weatherReport ) {
		if ( err ) {
			return errorHandler( err, res );
		}
		return res.json( weatherReport );
	} );

};

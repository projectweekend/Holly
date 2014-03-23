var appModels = require( '../models' ),
	weatherman = require('weatherman.io');

 
var errorHandler = function ( err, res ) {
    console.log( err );
    res.send( 500 );
};


var convertDate = function ( unixTime ) {
	return new Date( unixTime * 1000 );
};

var parseWeatherDataBlock = function ( weatherDataBlock ) {

	var output = {
		dateTime: convertDate(weatherDataBlock.time),
		icon: weatherDataBlock.icon,
		summary: weatherDataBlock.summary,
		temperature: weatherDataBlock.temperature,
		feelsLike: weatherDataBlock.apparentTemperature,
		windSpeed: weatherDataBlock.windSpeed,
		windBearing: "N/A",
		humidity: weatherDataBlock.humidity
	};

	if ( output.windSpeed > 0 ) {
		var windBearing = weatherDataBlock.windBearing;
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

	return output;

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
	theWeatherman.goOnLocation( latitude, longitude );
	theWeatherman.doForecast( function ( err, weatherReport ) {
		
		if ( err ) {
			return errorHandler( err, res );
		}
		
		return res.json( parseWeatherDataBlock(weatherReport.currently) );

	} );
};


exports.forecastIOHourly = function ( req, res ) {

	var latitude = req.query.latitude;
	var longitude = req.query.longitude;

	var theWeatherman = weatherman(forecastIOKey);
	theWeatherman.options = {'exclude': ["minutely", "currently", "daily", "flags", "alerts"]};
	theWeatherman.goOnLocation( latitude, longitude );
	theWeatherman.doForecast( function ( err, weatherReport ) {
		if ( err ) {
			return errorHandler( err, res );
		}

		var output = [];

		weatherReport.hourly.data.forEach( function ( element, index, array ) {
			output.push( parseWeatherDataBlock( element ) );
		} );

		return res.json( output );
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

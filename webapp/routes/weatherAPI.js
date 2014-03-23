var appModels = require( '../models' ),
	weatherman = require( 'weatherman.io' );

 
var errorHandler = function ( err, res ) {
    console.log( err );
    res.send( 500 );
};


var convertDate = function ( unixTime ) {
	return new Date( unixTime * 1000 );
};


var convertWindBearing = function ( windBearingNumber ) {

	var output;

	if ( windBearingNumber === 0  ) {
		output = "North";
	}
	if ( windBearingNumber < 90 ) {
		output = "North East";
	}
	if ( windBearingNumber === 90 ) {
		output = "East";
	}
	if ( windBearingNumber < 180 ) {
		output = "South East";
	}
	if ( windBearingNumber === 180 ) {
		output = "South";
	}
	if ( windBearingNumber < 270 ) {
		output = "South West";
	}
	if ( windBearingNumber === 270 ) {
		output = "West";
	}
	if ( windBearingNumber > 270 ) {
		output = "North West";
	}

	return output;

};


var parseWeatherDataBlock = function ( weatherDataBlock ) {

	var output = {
		dateTime: convertDate( weatherDataBlock.time ),
		icon: weatherDataBlock.icon,
		summary: weatherDataBlock.summary,
		temperature: weatherDataBlock.temperature,
		feelsLike: weatherDataBlock.apparentTemperature,
		windSpeed: weatherDataBlock.windSpeed,
		windBearing: "N/A",
		humidity: weatherDataBlock.humidity
	};

	if ( output.windSpeed > 0 ) {
		output.windBearing = convertWindBearing( weatherDataBlock.windBearing );
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

	var theWeatherman = weatherman( forecastIOKey );
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

	var theWeatherman = weatherman( forecastIOKey );
	theWeatherman.options = {'exclude': ["minutely", "currently", "daily", "flags", "alerts"]};
	theWeatherman.goOnLocation( latitude, longitude );
	theWeatherman.doForecast( function ( err, weatherReport ) {
		if ( err ) {
			return errorHandler( err, res );
		}

		var output = {
			summary: weatherReport.hourly.summary,
			icon: weatherReport.hourly.icon,
			hours: []
		};

		weatherReport.hourly.data.forEach( function ( element, index, array ) {
			output.hours.push( parseWeatherDataBlock( element ) );
		} );

		return res.json( output );
	} );
};


exports.forecastIODaily = function ( req, res ) {

	var latitude = req.query.latitude;
	var longitude = req.query.longitude;

	var theWeatherman = weatherman( forecastIOKey );
	theWeatherman.options = {'exclude': ["minutely", "currently", "hourly", "flags", "alerts"]};
	theWeatherman.goOnLocation( latitude, longitude );
	theWeatherman.doForecast( function ( err, weatherReport ) {
		if ( err ) {
			return errorHandler( err, res );
		}

		var output = {
			summary: weatherReport.daily.summary,
			icon: weatherReport.daily.icon,
			days: []
		};

		weatherReport.daily.data.forEach( function ( element, index, array ) {
			var day = {
				dateTime: convertDate(element.time),
				icon: element.icon,
				summary: element.summary,
				temperatureMin: element.temperatureMin,
				temperatureMax: element.temperatureMax,
				feelsLikeMin: element.apparentTemperatureMin,
				feelsLikeMax: element.apparentTemperatureMax,
				windSpeed: element.windSpeed,
				windBearing: "N/A",
				humidity: element.humidity
			};
			if ( day.windSpeed > 0 ) {
				day.windBearing = convertWindBearing( element.windBearing );
			}
			output.days.push( day );
		} );

		return res.json( output );

	} );

};

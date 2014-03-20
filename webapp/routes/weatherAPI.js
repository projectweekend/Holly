var weatherman = require('weatherman');

var errorHandler = function ( err, res ) {
    console.log( err );
    res.send( 500 );
};


exports.currentWeather = function ( req, res ) {
	// var weatherman = weatherman('test');
	var theWeatherman = weatherman('test');
	// console.log(w.apiKey);
	res.json(theWeatherman.apiKey);
};

var express = require('express');
var router = express.Router();
var SensorAPI = require( '../api/sensor/controllers' );
var RaspberryPiAPI = require( '../api/raspberry_pi/controllers' );
var WeatherAPI = require( '../api/weather/controllers' );


// Serve the index page for the Angular app
router.get( '/', function ( req, res ) {
    res.render( 'index' );
} );

// Serve template partials for the Angular app
router.get( '/partials/:name', function ( req, res ) {
    res.render( 'partials/' + req.params.name );
} );


/* Map URLs to handlers in this file */
router.get( '/api/sensor', SensorAPI.current );
router.get( '/api/weather', WeatherAPI.current );


module.exports = router;

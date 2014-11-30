var express = require( 'express' );
var router = express.Router();
var jackrabbit = require( "jackrabbit" );
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

router.get( '/api/weather', WeatherAPI.current );

var broker = jackrabbit( process.env.RABBIT_URL, 1 );

var sensorReady = function () {
    // This route depends on the broker being ready
    router.get( '/api/sensor', SensorAPI.current( broker ) );
};

var systemReady = function () {
    // This route depends on the broker being ready
    router.get( '/api/raspberry-pi', RaspberryPiAPI.current( broker ) );
};

var create = function () {
    broker.create( "sensor.get", { prefetch: 5 }, sensorReady );
    broker.create( "system.get", { prefetch: 5 }, systemReady );
};

broker.once( "connected", create );

module.exports = router;

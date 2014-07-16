var express = require('express');
var router = express.Router();
var SensorAPI = require( '../api/sensor/controllers' );
var RaspberryPiAPI = require( '../api/raspberry_pi/controllers' );


// Serve the index page for the Angular app
router.get( '/', function ( req, res ) {
    res.render( 'index' );
} );

// Serve template partials for the Angular app
router.get( '/partials/:name', function ( req, res ) {
    res.render( 'partials/' + req.params.name );
} );


/* Map URLs to handlers in this file */
router.post( '/api/raspberry-pi', RaspberryPiAPI.create );
router.get( '/api/raspberry-pi', RaspberryPiAPI.read );

router.post( '/api/sensor', SensorAPI.create );
router.get( '/api/sensor/:readingType', SensorAPI.read );

router.get( '/api/chart/raspberry-pi/', RaspberryPiAPI.getChart );
router.get( '/api/chart/:chartType', SensorAPI.getChart );


module.exports = router;

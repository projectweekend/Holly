var express = require('express');
var router = express.Router();
var SensorAPI = require( '../api/sensor/controllers' );


// Serve the index page for the Angular app
router.get( '/', function ( req, res ) {

    res.render( 'index' );

} );


/* Map URLs to handlers in this file */
router.post( '/api/sensor', SensorAPI.create );
router.get( '/api/chart/:chartType', SensorAPI.getChart );


module.exports = router;

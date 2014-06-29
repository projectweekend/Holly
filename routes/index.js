var express = require('express');
var router = express.Router();
var SensorAPI = require( '../api/sensor/controllers' );


/* Map URLs to handlers in this file */
router.post( '/api/sensor-reading', SensorAPI.create );


module.exports = router;

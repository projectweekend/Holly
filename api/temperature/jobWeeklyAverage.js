#!/usr/bin/env node

var moment = require( "moment" );
var AverageTemperature = require( './models' ).AverageTemperature;
var SensorReading = require( '../sensor/models' ).SensorReading;


var weekStart = moment().subtract(6, "days").toDate();
var weekEnd = moment().toDate();


console.log( weekStart );
console.log( weekEnd );

SensorReading.findOne( {}, function ( err, data ) {
    if ( err ) {
        return console.log( err );
    }
    console.log( data );
} );


SensorReading.aggregate( [
    {
        $group: {
            _id: null,
            avgTempC: {
                $avg: "$temp_c"
            },
            avgTempF: {
                $avg: "$temp_f"
            }
        }
    }
], function ( err, data ) {
    if ( err ) {
        return console.log( err );
    }
    console.log( data );
} );

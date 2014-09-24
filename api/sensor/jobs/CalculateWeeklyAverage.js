#!/usr/bin/env node
var jobUtils = require( "../../utils/jobs" );
var SensorReading = require( '../models' ).SensorReading;
var AverageSensorReading = require( '../models' ).AverageSensorReading;


// connect to the db
jobUtils.connectToMongo();


var weekStart = jobUtils.momentDateOnly().subtract( 7, "days" ).toDate();
var weekEnd = jobUtils.momentDateOnly().toDate();
var calcDate = jobUtils.momentDateOnly().subtract( 1, "days" ).toDate();


SensorReading.averageOverDateRange( weekStart, weekEnd, function ( err, data ) {

    if ( err ) {
        jobUtils.logError();
    }

    if ( data.length === 0 ) {
        jobUtils.logNoSensorDataBetween( weekStart, weekEnd );
    }

    data[ 0 ].date = calcDate;
    data[ 0 ].type = "WEEKLY";

    AverageSensorReading.add( data[ 0 ], function ( err, avgReading ) {

        if ( err ) {
            console.log( err );
            process.exit( 1 );
        }

        process.exit( 0 );

    } );

} );

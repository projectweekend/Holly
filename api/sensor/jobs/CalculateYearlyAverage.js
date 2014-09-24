#!/usr/bin/env node
var jobUtils = require( "../../utils/jobs" );
var SensorReading = require( '../models' ).SensorReading;
var AverageSensorReading = require( '../models' ).AverageSensorReading;


// connect to the db
jobUtils.connectToMongo();


var priorYearStart = jobUtils.momentDateOnly().subtract( 1, "year" ).month( 1 ).date( 1 ).toDate();
var priorYearEnd = jobUtils.momentDateOnly().subtract( 1, "year" ).month( 12 ).date( 31 ).toDate();


SensorReading.averageOverDateRange( priorYearStart, priorYearEnd, function ( err, data ) {

    if ( err ) {
        jobUtils.logError();
    }

    if ( data.length === 0 ) {
        jobUtils.logNoSensorDataBetween( priorYearStart, priorYearEnd );
    }

    data[ 0 ].date = priorYearStart;
    data[ 0 ].type = "YEARLY";

    AverageSensorReading.add( data[ 0 ], function ( err, avgReading ) {

        if ( err ) {
            console.log( err );
            process.exit( 1 );
        }

        process.exit( 0 );

    } );

} );

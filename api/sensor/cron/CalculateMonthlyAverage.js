#!/usr/bin/env node
var jobUtils = require( "../../utils/jobs" );
var SensorReading = require( '../models' ).SensorReading;
var AverageSensorReading = require( '../models' ).AverageSensorReading;


// connect to the db
jobUtils.connectToMongo();


var priorMonthStart = jobUtils.momentDateOnly().subtract( 1, "months" ).date( 1 ).toDate();
var priorMonthEnd = jobUtils.momentDateOnly().date( 1 ).subtract( 1, "days" ).toDate();


SensorReading.averageOverDateRange( priorMonthStart, priorMonthEnd, function ( err, data ) {

    if ( err ) {
        jobUtils.logError();
    }

    if ( data.length === 0 ) {
        jobUtils.logNoSensorDataBetween( priorMonthStart, priorMonthEnd );
    }

    data[ 0 ].date = priorMonthStart;
    data[ 0 ].type = "MONTHLY";

    console.log( data[ 0 ] );

    // AverageSensorReading.add( data[ 0 ], function ( err, avgReading ) {

    //     if ( err ) {
    //         console.log( err );
    //         process.exit( 1 );
    //     }

    //     process.exit( 0 );

    // } );

} );

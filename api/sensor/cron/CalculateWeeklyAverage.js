#!/usr/bin/env node
var jobUtils = require( "../../utils/jobs" );
var SensorReading = require( '../models' ).SensorReading;
var SensorStats = require( '../models' ).SensorStats;


// connect to the db
jobUtils.connectToMongo();


var weekStart = jobUtils.momentDateOnly().subtract( 8, "days" ).toDate();
var weekEnd = jobUtils.momentDateOnly().subtract( 1, "days" ).toDate();


SensorReading.averageOverDateRange( weekStart, weekEnd, function ( err, data ) {

    if ( err ) {
        jobUtils.logError();
    }

    if ( data.length === 0 ) {
        jobUtils.logNoSensorDataBetween( weekStart, weekEnd );
    }

    data[ 0 ].date = weekEnd;
    data[ 0 ].type = "WEEKLY";



    SensorStats.add( data[ 0 ], function ( err, avgReading ) {

        if ( err ) {
            console.log( err );
            process.exit( 1 );
        }

        process.exit( 0 );

    } );

} );

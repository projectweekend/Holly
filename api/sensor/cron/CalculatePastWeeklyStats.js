#!/usr/bin/env node
var async = require( "async" );
var moment = require( "moment" );
var jobUtils = require( "../../utils/jobs" );
var SensorReading = require( '../models' ).SensorReading;
var SensorStats = require( '../models' ).SensorStats;


// connect to the db
jobUtils.connectToMongo();


var doAverage = function ( weekStart, weekEnd ) {

    SensorReading.statsOverDateRange( weekStart, weekEnd, function ( err, data ) {

        if ( err ) {
            console.log( "ERROR: " );
            console.log( err );
            return;
        }

        if ( data.length === 0 ) {
            console.log( "NO DATA: " + weekStart );
            return;
        }

        data[ 0 ].date = weekEnd;
        data[ 0 ].type = "WEEKLY";

        SensorStats.add( data[ 0 ], function ( err, avgReading ) {

            if ( err ) {
                console.log( err );
                return;
            }

            console.log( "DONE: " + weekStart );

        } );

    } );

};


var weeksInYear = moment().weeksInYear();
var allSundayMoments = [];
for ( var i = weeksInYear; i > 0; i-- ) {
    var sunday = moment().weeks( i ).subtract( 5, "days");
    if ( sunday.year() === moment().year() ) {
        allSundayMoments.push( sunday.hours( 0 ).minutes( 0 ).seconds( 0 ).milliseconds( 0 ) );
    }
}

for ( var i = 0; i < allSundayMoments.length; i++ ) {

    var weekStart = allSundayMoments[ i ].clone().subtract( 8, "days" ).toDate();
    var weekEnd = allSundayMoments[ i ].clone().subtract( 1, "days" ).toDate();

    doAverage( weekStart, weekEnd );

}

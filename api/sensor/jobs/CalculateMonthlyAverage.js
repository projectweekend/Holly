#!/usr/bin/env node
var jobUtils = require( "../../utils/jobs" );
var SensorReading = require( '../models' ).SensorReading;
var AverageSensorReading = require( '../models' ).AverageSensorReading;


// connect to the db
jobUtils.connectToMongo();


var priorMonthStart = jobUtils.momentDateOnly().subtract( 1, "months" ).date( 1 ).toDate();
var priorMonthEnd = jobUtils.momentDateOnly().date( 1 ).subtract( 1, "days" ).toDate();
var currentMonthStart = jobUtils.momentDateOnly().date( 1 ).toDate();


var logNoData = function () {
    console.log( "No sensor readings between " + priorMonthStart.toDateString() + " & " + priorMonthEnd.toDateString() );
    process.exit( 1 );
};


var saveAverageData = function ( calcData ) {

    delete calcData._id;
    calcData.date = priorMonthStart;
    calcData.type = "MONTHLY";

    AverageSensorReading.create( calcData, function ( err, avgReading ) {

        if ( err ) {
            console.log( err );
            process.exit( 1 );
        }

        process.exit( 0 );

    } );

};


SensorReading.aggregate( [
    {
        $match: {
            date: {
                $lt: currentMonthStart,
                $gte: priorMonthStart
            }
        }
    },
    {
        $group: {
            _id: null,
            temp_c: {
                $avg: "$temp_c"
            },
            temp_f: {
                $avg: "$temp_f"
            },
            humidity: {
                $avg: "$humidity"
            },
            pressure: {
                $avg: "$pressure"
            },
            luminosity: {
                $avg: "$luminosity"
            }
        }
    }
], function ( err, data ) {

    if ( err ) {
        jobUtils.logError();
    }

    if ( data.length === 0 ) {
        logNoData();
    }

    console.log( data );
    // saveAverageData( data[ 0 ] );

} );

#!/usr/bin/env node
var jobUtils = require( "../../utils/jobs" );
var SensorReading = require( '../models' ).SensorReading;
var AverageSensorReading = require( '../models' ).AverageSensorReading;


// connect to the db
jobUtils.connectToMongo();


var weekStart = jobUtils.momentDateOnly().subtract( 7, "days" ).toDate();
var weekEnd = jobUtils.momentDateOnly().toDate();
var calcDate = jobUtils.momentDateOnly().subtract( 1, "days" ).toDate();


var logNoData = function () {
    console.log( "No sensor readings between " + weekStart.toDateString() + " & " + weekEnd.toDateString() );
    process.exit( 1 );
};


var saveAverageData = function ( calcData ) {

    delete calcData._id;
    calcData.date = calcDate;
    calcData.type = "WEEKLY";

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
                $lt: weekEnd,
                $gte: weekStart
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

    saveAverageData( data[ 0 ] );

} );

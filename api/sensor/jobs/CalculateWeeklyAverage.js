#!/usr/bin/env node
var moment = require( "moment" );
var mongoose = require( "mongoose" );
var SensorReading = require( '../models' ).SensorReading;
var AverageSensorReading = require( '../models' ).AverageSensorReading;


// connect to the db
var MONGO_DB;
var FIG_DB = process.env.DB_1_PORT;
if ( FIG_DB ) {
  MONGO_DB = FIG_DB.replace( "tcp", "mongodb" ) + "/dev_db";
} else {
  MONGO_DB = process.env.MONGO_URL;
}
mongoose.connect(MONGO_DB);


var momentWithNoTime = function () {
    return moment().hour( 0 ).minutes( 0 ).seconds( 0 );
};


var weekStart = momentWithNoTime().subtract( 7, "days" ).toDate();
var weekEnd = momentWithNoTime().toDate();
var calcDate = momentWithNoTime().subtract( 1, "days" ).toDate();


var logError = function ( err ) {
    console.log( err );
    process.exit( 1 );
};


var logNoData = function () {
    console.log( "No sensors readings between " + weekStart.toDateString() + " & " + weekEnd.toDateString() );
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
        logError();
    }

    if ( data.length === 0 ) {
        logNoData();
    }

    saveAverageData( data[ 0 ] );

} );

#!/usr/bin/env node
var moment = require( "moment" );
var mongoose = require( "mongoose" );
var AverageTemperature = require( './models' ).AverageTemperature;
var SensorReading = require( '../sensor/models' ).SensorReading;


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


var weekStart = momentWithNoTime().subtract(7, "days").toDate();
var weekEnd = momentWithNoTime().subtract(1, "days").toDate();

console.log( weekStart );
console.log( weekEnd );

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
        console.log( err );
        process.exit( 1 );
    }
    console.log( data );
    process.exit( 0 );
} );



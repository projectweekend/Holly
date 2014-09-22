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


var weekStart = moment().subtract(6, "days").toDate();
var weekEnd = moment().toDate();

SensorReading.findOne( {}, function ( err, data ) {
    if ( err ) {
        return console.log( err );
    }
    console.log( data );
} );


// SensorReading.aggregate( [
//     {
//         $group: {
//             _id: null,
//             avgTempC: {
//                 $avg: "$temp_c"
//             },
//             avgTempF: {
//                 $avg: "$temp_f"
//             }
//         }
//     }
// ], function ( err, data ) {
//     if ( err ) {
//         return console.log( err );
//     }
//     console.log( data );
// } );

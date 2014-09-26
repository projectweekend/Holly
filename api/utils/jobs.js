var moment = require( "moment" );
var mongoose = require( "mongoose" );


exports.connectToMongo = function ( inputParams ) {
    var MONGO_DB;
    var FIG_DB = process.env.DB_1_PORT;
    if ( FIG_DB ) {
      MONGO_DB = FIG_DB.replace( "tcp", "mongodb" ) + "/dev_db";
    } else {
      MONGO_DB = process.env.MONGO_URL;
    }
    mongoose.connect( MONGO_DB );
};


exports.momentDateOnly = function () {
    return moment().hour( 0 ).minutes( 0 ).seconds( 0 ).milliseconds( 0 );
};


exports.logNoSensorDataBetween = function ( start, end ) {
    console.log( "No sensor readings between " + start.toDateString() + " & " + end.toDateString() );
    process.exit( 1 );
};


exports.logError = function ( err ) {
    console.log( err );
    process.exit( 1 );
};

var moment = require( "moment" );
var mongoose = require( "mongoose" );


exports.connectToMongo = function () {
    var fig_db = process.env.DB_1_PORT;
    if ( fig_db ) {
        mongoose.connect( fig_db.replace( "tcp", "mongodb" ) + "/dev_db" );
    } else {
        mongoose.connect( process.env.MONGO_URL );
    }
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

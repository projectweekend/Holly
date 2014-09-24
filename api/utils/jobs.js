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

var mongoose = require( 'mongoose' );

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;


var SensorReadingSchema = Schema( {
    date: Date,
    temp_c: Number,
    temp_f: Number,
    humidity: Number,
    pressure: Number,
    luminosity: Number
} );


SensorReadingSchema.statics.addReading = function ( data, cb ) {
    data.date = new Date();
    this.create( data, function ( err, reading ) {
        if ( err ) {
            return cb( err );
        }
        return cb( null, reading );
    } );
};


var SensorReading = mongoose.model( 'SensorReading', SensorReadingSchema );


exports.SensorReading = SensorReading;

var mongoose = require( 'mongoose' );
var systemError = require( '../utils' ).systemError;

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;


var AverageTemperatureSchema = Schema( {
    date: Date,
    type: String,
    temp_c: Number,
    temp_f: Number
} );


AverageTemperatureSchema.statics.addWeekly = function ( data, cb ) {
    data.type = "WEEKLY";
    this.create( data, function ( err, reading ) {
        if ( err ) {
            return cb( systemError( err ) );
        }
        return cb( null, reading );
    } );
};


AverageTemperatureSchema.statics.latestReading = function ( fieldsToSelect, cb ) {
    var q = this.findOne( {} )
                .select( fieldsToSelect )
                .sort( '-date' );
    q.exec( function ( err, readings ) {
        if ( err ) {
            return cb( systemError( err ) );
        }
        return cb( null, readings );
    } );
};


AverageTemperatureSchema.statics.chartReadings = function ( numberOfReadings, fieldsToSelect, cb ) {
    var q = this.find( {} )
                .select( fieldsToSelect )
                .limit( numberOfReadings )
                .sort( '-date' );
    q.exec( function ( err, readings ) {
        if ( err ) {
            return cb( systemError( err ) );
        }
        return cb( null, readings );
    } );
};


var AverageTemperature = mongoose.model( 'AverageTemperature', AverageTemperatureSchema );


exports.AverageTemperature = AverageTemperature;

var mongoose = require( 'mongoose' );
var systemError = require( '../utils' ).systemError;

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;


var SystemTemperatureSchema = Schema( {
    date: Date,
    temp_c: Number,
    temp_f: Number
} );


SystemTemperatureSchema.statics.add = function ( data, cb ) {
    data.date = new Date();
    this.create( data, function ( err, reading ) {
        if ( err ) {
            return cb( systemError( err ) );
        }
        return cb( null, reading );
    } );
};


SystemTemperatureSchema.statics.latestReading = function ( fieldsToSelect, cb ) {
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


SystemTemperatureSchema.statics.chartReadings = function ( numberOfReadings, fieldsToSelect, cb ) {
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


var SystemTemperature = mongoose.model( 'SystemTemperature', SystemTemperatureSchema );


exports.SystemTemperature = SystemTemperature;

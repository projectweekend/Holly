var mongoose = require( 'mongoose' );
var systemError = require( '../utils' ).systemError;

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;


// Sensor Reading
var SensorReadingSchema = Schema( {
    date: Date,
    temp_c: Number,
    temp_f: Number,
    humidity: Number,
    pressure: Number,
    luminosity: Number
} );


SensorReadingSchema.statics.add = function ( data, cb ) {
    data.date = new Date();
    this.create( data, function ( err, reading ) {
        if ( err ) {
            return cb( systemError( err ) );
        }
        return cb( null, reading );
    } );
};


SensorReadingSchema.statics.latestReading = function ( fieldsToSelect, cb ) {
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


SensorReadingSchema.statics.chartReadings = function ( numberOfReadings, fieldsToSelect, cb ) {
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


exports.SensorReading = mongoose.model( 'SensorReading', SensorReadingSchema );


// Average Sensor Reading
var AverageSensorReadingSchema = Schema( {
    date: Date,
    type: String,
    temp_c: Number,
    temp_f: Number,
    humidity: Number,
    pressure: Number,
    luminosity: Number
} );


AverageSensorReadingSchema.statics.latestReading = function ( fieldsToSelect, cb ) {
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


AverageSensorReadingSchema.statics.chartReadings = function ( numberOfReadings, fieldsToSelect, cb ) {
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


exports.AverageSensorReading = mongoose.model( 'AverageSensorReading', AverageSensorReadingSchema );

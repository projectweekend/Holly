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


SensorReadingSchema.statics.averageOverDateRange = function ( startDate, endDate, cb ) {

    var matchOptions = {
        date: {
            $gte: startDate,
            $lte: endDate
        }
    };

    var groupOptions = {
        _id: null,
        avg_temp_c: {
            $avg: "$temp_c"
        },
        avg_temp_f: {
            $avg: "$temp_f"
        },
        avg_humidity: {
            $avg: "$humidity"
        },
        avg_pressure: {
            $avg: "$pressure"
        },
        avg_luminosity: {
            $avg: "$luminosity"
        }
    };

    var q = this.aggregate()
                .match( matchOptions )
                .group( groupOptions );

    q.exec( cb );

};


exports.SensorReading = mongoose.model( 'SensorReading', SensorReadingSchema );


// Average Sensor Reading
var SensorStatsSchema = Schema( {
    date: Date,
    type: String,
    temp_c: Number,
    temp_f: Number,
    humidity: Number,
    pressure: Number,
    luminosity: Number
} );


SensorStatsSchema.statics.add = function ( data, cb ) {
    delete data._id;
    this.create( data, function ( err, reading ) {
        if ( err ) {
            return cb( systemError( err ) );
        }
        return cb( null, reading );
    } );
};


SensorStatsSchema.statics.latestReading = function ( fieldsToSelect, cb ) {
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


SensorStatsSchema.statics.chartReadings = function ( numberOfReadings, fieldsToSelect, cb ) {
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


exports.SensorStats = mongoose.model( 'SensorStats', SensorStatsSchema );

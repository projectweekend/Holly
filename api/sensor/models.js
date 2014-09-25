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


SensorReadingSchema.statics.statsOverDateRange = function ( startDate, endDate, cb ) {

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
        min_temp_c: {
            $min: "$temp_c"
        },
        max_temp_c: {
            $max: "$temp_c"
        },
        avg_temp_f: {
            $avg: "$temp_f"
        },
        min_temp_f: {
            $min: "$temp_f"
        },
        max_temp_f: {
            $max: "$temp_f"
        },
        avg_humidity: {
            $avg: "$humidity"
        },
        min_humidity: {
            $min: "$humidity"
        },
        max_humidity: {
            $max: "$humidity"
        },
        avg_pressure: {
            $avg: "$pressure"
        },
        min_pressure: {
            $min: "$pressure"
        },
        max_pressure: {
            $max: "$pressure"
        },
        avg_luminosity: {
            $avg: "$luminosity"
        },
        min_luminosity: {
            $min: "$luminosity"
        },
        max_luminosity: {
            $max: "$luminosity"
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
    avg_temp_c: Number,
    min_temp_c: Number,
    max_temp_c: Number,
    avg_temp_f: Number,
    min_temp_f: Number,
    max_temp_f: Number,
    avg_humidity: Number,
    min_humidity: Number,
    max_humidity: Number,
    avg_pressure: Number,
    min_pressure: Number,
    max_pressure: Number,
    avg_luminosity: Number,
    min_luminosity: Number,
    max_luminosity: Number
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

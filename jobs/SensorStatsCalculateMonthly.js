var jobUtils = require( "../../utils/jobs" );
var SensorReading = require( '../models' ).SensorReading;
var SensorStats = require( '../models' ).SensorStats;


// connect to the db
jobUtils.connectToMongo();


var priorMonthStart = jobUtils.momentDateOnly().subtract( 1, "months" ).date( 1 ).toDate();
var priorMonthEnd = jobUtils.momentDateOnly().date( 1 ).subtract( 1, "days" ).toDate();


SensorReading.statsOverDateRange( priorMonthStart, priorMonthEnd, function ( err, data ) {

    if ( err ) {
        jobUtils.logError();
    }

    if ( data.length === 0 ) {
        jobUtils.logNoSensorDataBetween( priorMonthStart, priorMonthEnd );
    }

    data[ 0 ].date = priorMonthStart;
    data[ 0 ].type = "MONTHLY";

    SensorStats.add( data[ 0 ], function ( err, avgReading ) {

        if ( err ) {
            console.log( err );
            process.exit( 1 );
        }

        process.exit( 0 );

    } );

} );

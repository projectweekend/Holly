var appModels = require( '../models' ),
	asyncCallbackHelpers = require( '../helpers/AsyncCallbacks' ),
	async = require( 'async' );


var errorHandler = function ( err, res ) {
    console.log( err );
    res.send( 500 );
};


exports.indoorHumidityStatsOverall = function ( req, res ) {
    
    var output = {
        label: "Overall",
        average: {
            percent: 0
        },
        min: {
			percent: 0
        },
        max: {
			percent: 0
        }
    };

    var getHumidityAverage = asyncCallbackHelpers.buildHumidityAverageCallback (
		{
			model: IndoorHumidityData,
			collection: "AverageIndoorOverallHumidity",
			query: {}
		},
		output
    );

    var getHumidityMinMax = asyncCallbackHelpers.buildHumidityMinMaxCallback (
		{
			model: IndoorHumidityData,
			collection: "MinMaxIndoorOverallHumidity",
			query: {}
		},
		output
    );

    // run all stat calculations async
    async.parallel( [
        getHumidityAverage,
        getHumidityMinMax
    ],
    // callback function for processes running async
    function( err ){
        if ( err ) {
            return errorHandler( err, res );
        }
        return res.json( output );
    } );

};


exports.indoorHumidityStatsDay = function ( req, res ) {

    var output = {
        label: "Today",
        average: {
            percent: 0
        },
        min: {
            percent: 0
        },
        max: {
            percent: 0
        }
    };

    var d = new Date();
    var currentDate = d.getDate();
    var currentMonth = d.getMonth();
    var currentYear = d.getFullYear();

    var q = {
        "date": {
            "$gte": new Date( currentYear, currentMonth, currentDate ),
            "$lt": new Date( currentYear, currentMonth, currentDate + 1 )
        }
    };

    var getHumidityAverage = asyncCallbackHelpers.buildHumidityAverageCallback (
        {
            model: IndoorHumidityData,
            collection: "AverageIndoorDayHumidity",
            query: q
        },
        output
    );

    var getHumidityMinMax = asyncCallbackHelpers.buildHumidityMinMaxCallback (
        {
            model: IndoorHumidityData,
            collection: "MinMaxIndoorDayHumidity",
            query: q
        },
        output
    );

    // run all stat calculations async
    async.parallel( [
        getHumidityAverage,
        getHumidityMinMax
    ],
    // callback function for processes running async
    function( err ){
        if ( err ) {
            return errorHandler( err, res );
        }
        return res.json( output );
    } );

};


exports.indoorHumidityStatsWeek = function ( req, res ) {

    var output = {
        label: "Last 7 Days",
        average: {
            percent: 0
        },
        min: {
            percent: 0
        },
        max: {
            percent: 0
        }
    };

    var d = new Date();
    var currentDate = d.getDate();
    var currentMonth = d.getMonth();
    var currentYear = d.getFullYear();

    var q = {
        "date": {
            "$gte": new Date( currentYear, currentMonth, currentDate - 7 ),
            "$lt": new Date( currentYear, currentMonth, currentDate + 1 )
        }
    };

    var getHumidityAverage = asyncCallbackHelpers.buildHumidityAverageCallback (
        {
            model: IndoorHumidityData,
            collection: "AverageIndoorWeekHumidity",
            query: q
        },
        output
    );

    var getHumidityMinMax = asyncCallbackHelpers.buildHumidityMinMaxCallback (
        {
            model: IndoorHumidityData,
            collection: "MinMaxIndoorWeekHumidity",
            query: q
        },
        output
    );

    // run all stat calculations async
    async.parallel( [
        getHumidityAverage,
        getHumidityMinMax
    ],
    // callback function for processes running async
    function( err ){
        if ( err ) {
            return errorHandler( err, res );
        }
        return res.json( output );
    } );

};


exports.indoorHumidityStatsMonth = function ( req, res ) {

    var output = {
        label: "Last 30 Days",
        average: {
            percent: 0
        },
        min: {
            percent: 0
        },
        max: {
            percent: 0
        }
    };

    var d = new Date();
    var currentDate = d.getDate();
    var currentMonth = d.getMonth();
    var currentYear = d.getFullYear();

    var q = {
        "date": {
            "$gte": new Date( currentYear, currentMonth, currentDate - 30 ),
            "$lt": new Date( currentYear, currentMonth, currentDate + 1 )
        }
    };

    var getHumidityAverage = asyncCallbackHelpers.buildHumidityAverageCallback (
        {
            model: IndoorHumidityData,
            collection: "AverageIndoorMonthHumidity",
            query: q
        },
        output
    );

    var getHumidityMinMax = asyncCallbackHelpers.buildHumidityMinMaxCallback (
        {
            model: IndoorHumidityData,
            collection: "MinMaxIndoorMonthHumidity",
            query: q
        },
        output
    );

    // run all stat calculations async
    async.parallel( [
        getHumidityAverage,
        getHumidityMinMax
    ],
    // callback function for processes running async
    function( err ){
        if ( err ) {
            return errorHandler( err, res );
        }
        return res.json( output );
    } );

};

var appModels = require( '../models' ),
	asyncCallbackHelpers = require( '../helpers/AsyncCallbacks' ),
	async = require( 'async' );


var errorHandler = function ( err, res ) {
    console.log( err );
    res.send( 500 );
};


exports.starbugTemperatureStatsOverall = function ( req, res ) {

    // The Temperature Stats output object
    var output = {
		label: "Overall",
        average: {
            celsius: null,
            fahrenheit: null
        },
        min: {
            celsius: null,
            fahrenheit: null
        },
        max: {
            celsius: null,
            fahrenheit: null
        }
    };

    var getFahrenheitAverage = asyncCallbackHelpers.buildFahrenheitAverageCallback (
        {
            model: StarbugTemperatureData,
            collection: "AverageStarbugTempFahrenheit",
            query: {}
        },
        output
    );

    var getCelsiusAverage = asyncCallbackHelpers.buildCelsiusAverageCallback (
        {
            model: StarbugTemperatureData,
            collection: "AverageStarbugTempCelsius",
            query: {}
        },
        output
    );

    var getFahrenheitMinMax = asyncCallbackHelpers.buildFahrenheitMinMaxCallback(
        {
            model: StarbugTemperatureData,
            collection: "MinMaxStarbugTempFahrenheit",
            query: {}
        },
        output
    );

    var getCelsiusMinMax = asyncCallbackHelpers.buildCelsiusMinMaxCallback(
        {
            model: StarbugTemperatureData,
            collection: "MinMaxStarbugTempCelsius",
            query: {}
        },
        output
    );

    // run all stat calculations async
    async.parallel( [
        getFahrenheitAverage,
        getCelsiusAverage,
        getFahrenheitMinMax,
        getCelsiusMinMax
    ],
    // callback function for processes running async
    function( err ){
        if ( err ) {
            return errorHandler( err, res );
        }
        return res.json( output );
    } );

};


exports.starbugTemperatureStatsDay = function ( req, res ) {

    // The Temperature Stats output object
    var output = {
		label: "Today",
        average: {
            celsius: null,
            fahrenheit: null
        },
        min: {
            celsius: null,
            fahrenheit: null
        },
        max: {
            celsius: null,
            fahrenheit: null
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

    var getFahrenheitAverage = asyncCallbackHelpers.buildFahrenheitAverageCallback (
        {
            model: StarbugTemperatureData,
            collection: "AverageStarbugTempDayFahrenheit",
            query: q
        },
        output
    );

    var getCelsiusAverage = asyncCallbackHelpers.buildCelsiusAverageCallback (
        {
            model: StarbugTemperatureData,
            collection: "AverageStarbugTempDayCelsius",
            query: q
        },
        output
    );

    var getFahrenheitMinMax = asyncCallbackHelpers.buildFahrenheitMinMaxCallback(
        {
            model: StarbugTemperatureData,
            collection: "MinMaxStarbugTempDayFahrenheit",
            query: q
        },
        output
    );

    var getCelsiusMinMax = asyncCallbackHelpers.buildCelsiusMinMaxCallback(
        {
            model: StarbugTemperatureData,
            collection: "MinMaxStarbugTempDayCelsius",
            query: q
        },
        output
    );

    // run all stat calculations async
    async.parallel( [
        getFahrenheitAverage,
        getCelsiusAverage,
        getFahrenheitMinMax,
        getCelsiusMinMax
    ],
    // callback function for processes running async
    function( err ){
        if ( err ) {
            return errorHandler( err, res );
        }
        return res.json( output );
    } );

};


exports.starbugTemperatureStatsWeek = function ( req, res ) {

    // The Temperature Stats output object
    var output = {
        label: "Last 7 Days",
        average: {
            celsius: null,
            fahrenheit: null
        },
        min: {
            celsius: null,
            fahrenheit: null
        },
        max: {
            celsius: null,
            fahrenheit: null
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

    var getFahrenheitAverage = asyncCallbackHelpers.buildFahrenheitAverageCallback (
        {
            model: StarbugTemperatureData,
            collection: "AverageStarbugTempWeekFahrenheit",
            query: q
        },
        output
    );

    var getCelsiusAverage = asyncCallbackHelpers.buildCelsiusAverageCallback (
        {
            model: StarbugTemperatureData,
            collection: "AverageStarbugTempWeekCelsius",
            query: q
        },
        output
    );

    var getFahrenheitMinMax = asyncCallbackHelpers.buildFahrenheitMinMaxCallback(
        {
            model: StarbugTemperatureData,
            collection: "MinMaxStarbugTempWeekFahrenheit",
            query: q
        },
        output
    );

    var getCelsiusMinMax = asyncCallbackHelpers.buildCelsiusMinMaxCallback(
        {
            model: StarbugTemperatureData,
            collection: "MinMaxStarbugTempWeekCelsius",
            query: q
        },
        output
    );

    // run all stat calculations async
    async.parallel( [
        getFahrenheitAverage,
        getCelsiusAverage,
        getFahrenheitMinMax,
        getCelsiusMinMax
    ],
    // callback function for processes running async
    function( err ){
        if ( err ) {
            return errorHandler( err, res );
        }
        return res.json( output );
    } );

};


exports.starbugTemperatureStatsMonth = function ( req, res ) {

    // The Temperature Stats output object
    var output = {
        label: "Last 30 Days",
        average: {
            celsius: null,
            fahrenheit: null
        },
        min: {
            celsius: null,
            fahrenheit: null
        },
        max: {
            celsius: null,
            fahrenheit: null
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

    var getFahrenheitAverage = asyncCallbackHelpers.buildFahrenheitAverageCallback (
        {
            model: StarbugTemperatureData,
            collection: "AverageStarbugTempMonthFahrenheit",
            query: q
        },
        output
    );

    var getCelsiusAverage = asyncCallbackHelpers.buildCelsiusAverageCallback (
        {
            model: StarbugTemperatureData,
            collection: "AverageStarbugTempMonthCelsius",
            query: q
        },
        output
    );

    var getFahrenheitMinMax = asyncCallbackHelpers.buildFahrenheitMinMaxCallback(
        {
            model: StarbugTemperatureData,
            collection: "MinMaxStarbugTempMonthFahrenheit",
            query: q
        },
        output
    );

    var getCelsiusMinMax = asyncCallbackHelpers.buildCelsiusMinMaxCallback(
        {
            model: StarbugTemperatureData,
            collection: "MinMaxStarbugTempMonthCelsius",
            query: q
        },
        output
    );

    // run all stat calculations async
    async.parallel( [
        getFahrenheitAverage,
        getCelsiusAverage,
        getFahrenheitMinMax,
        getCelsiusMinMax
    ],
    // callback function for processes running async
    function( err ){
        if ( err ) {
            return errorHandler( err, res );
        }
        return res.json( output );
    } );

};

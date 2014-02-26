var appModels = require( '../models' ),
    asyncCallbackHelpers = require( '../helpers/AsyncCallbacks' ),
    async = require( 'async' );


var errorHandler = function ( err, res ) {
    console.log( err );
    res.send( 500 );
};


exports.indoorTemperatureStatsOverall = function ( req, res ) {

    var output = {
        label: "Overall",
        average: {
            celsius: 0,
            fahrenheit: 0
        },
        min: {
            celsius: 0,
            fahrenheit: 0
        },
        max: {
            celsius: 0,
            fahrenheit: 0
        }
    };

    var getFahrenheitAverage = asyncCallbackHelpers.buildFahrenheitAverageCallback(
        { model: IndoorTemperatureData, collection: "AverageIndoorOverallTempFahrenheit", query: {} },
        output
    );

    var getCelsiusAverage = asyncCallbackHelpers.buildCelsiusAverageCallback(
        { model: IndoorTemperatureData, collection: "AverageIndoorOverallTempCelsius", query: {} },
        output
    );

    var getFahrenheitMinMax = asyncCallbackHelpers.buildFahrenheitMinMaxCallback(
        { model: IndoorTemperatureData, collection: "MinMaxSystemTempFahrenheit", query: {} },
        output
    );

    var getCelsiusMinMax = asyncCallbackHelpers.buildCelsiusMinMaxCallback(
        { model: IndoorTemperatureData, collection: "MinMaxSystemTempCelsius", query: {} },
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


exports.indoorTemperatureStatsDay = function ( req, res ) {

    var output = {
        label: "Today",
        average: {
            celsius: 0,
            fahrenheit: 0
        },
        min: {
            celsius: 0,
            fahrenheit: 0
        },
        max: {
            celsius: 0,
            fahrenheit: 0
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

    var getFahrenheitAverage = asyncCallbackHelpers.buildFahrenheitAverageCallback(
        {
            model: IndoorTemperatureData,
            collection: "AverageIndoorDayTempFahrenheit",
            query: q
        },
        output
    );

    var getCelsiusAverage = asyncCallbackHelpers.buildCelsiusAverageCallback(
        {
            model: IndoorTemperatureData,
            collection: "AverageIndoorDayTempCelsius",
            query: q
        },
        output
    );

    var getFahrenheitMinMax = asyncCallbackHelpers.buildFahrenheitMinMaxCallback(
        {
            model: IndoorTemperatureData,
            collection: "MinMaxIndoorDayTempFahrenheit",
            query: q
        },
        output
    );

    var getCelsiusMinMax = asyncCallbackHelpers.buildCelsiusMinMaxCallback(
        {
            model: IndoorTemperatureData,
            collection: "MinMaxIndoorDayTempCelsius",
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


exports.indoorTemperatureStatsWeek = function ( req, res ) {

    var output = {
        label: "Last 7 Days",
        average: {
            celsius: 0,
            fahrenheit: 0
        },
        min: {
            celsius: 0,
            fahrenheit: 0
        },
        max: {
            celsius: 0,
            fahrenheit: 0
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

    var getFahrenheitAverage = asyncCallbackHelpers.buildFahrenheitAverageCallback(
        {
            model: IndoorTemperatureData,
            collection: "AverageIndoorWeekTempFahrenheit",
            query: q
        },
        output
    );

    var getCelsiusAverage = asyncCallbackHelpers.buildCelsiusAverageCallback(
        {
            model: IndoorTemperatureData,
            collection: "AverageIndoorWeekTempCelsius",
            query: q
        },
        output
    );

    var getFahrenheitMinMax = asyncCallbackHelpers.buildFahrenheitMinMaxCallback(
        {
            model: IndoorTemperatureData,
            collection: "MinMaxIndoorWeekTempFahrenheit",
            query: q
        },
        output
    );

    var getCelsiusMinMax = asyncCallbackHelpers.buildCelsiusMinMaxCallback(
        {
            model: IndoorTemperatureData,
            collection: "MinMaxIndoorWeekTempCelsius",
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


exports.indoorTemperatureStatsMonth = function ( req, res ) {

    var output = {
        label: "Last 30 Days",
        average: {
            celsius: 0,
            fahrenheit: 0
        },
        min: {
            celsius: 0,
            fahrenheit: 0
        },
        max: {
            celsius: 0,
            fahrenheit: 0
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

    var getFahrenheitAverage = asyncCallbackHelpers.buildFahrenheitAverageCallback(
        {
            model: IndoorTemperatureData,
            collection: "AverageIndoorMonthTempFahrenheit",
            query: q
        },
        output
    );

    var getCelsiusAverage = asyncCallbackHelpers.buildCelsiusAverageCallback(
        {
            model: IndoorTemperatureData,
            collection: "AverageIndoorMonthTempCelsius",
            query: q
        },
        output
    );

    var getFahrenheitMinMax = asyncCallbackHelpers.buildFahrenheitMinMaxCallback(
        {
            model: IndoorTemperatureData,
            collection: "MinMaxIndoorMonthTempFahrenheit",
            query: q
        },
        output
    );

    var getCelsiusMinMax = asyncCallbackHelpers.buildCelsiusMinMaxCallback(
        {
            model: IndoorTemperatureData,
            collection: "MinMaxIndoorMonthTempCelsius",
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

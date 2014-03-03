var appModels = require( '../models' ),
    asyncCallbackHelpers = require( '../helpers/AsyncCallbacks' ),
    async = require( 'async' );


var errorHandler = function ( err, res ) {
    console.log( err );
    res.send( 500 );
};


exports.systemTemperatureStatsOverall = function ( req, res ) {

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

    var systemName = req.query.systemName || "Holly";

    var getFahrenheitAverage = asyncCallbackHelpers.buildFahrenheitAverageCallback (
        {
            model: SystemTemperatureData,
            collection: "AverageSystemTempFahrenheit",
            query: { "from": systemName }
        },
        output
    );

    var getCelsiusAverage = asyncCallbackHelpers.buildCelsiusAverageCallback (
        {
            model: SystemTemperatureData,
            collection: "AverageSystemTempCelsius",
            query: { "from": systemName }
        },
        output
    );

    var getFahrenheitMinMax = asyncCallbackHelpers.buildFahrenheitMinMaxCallback(
        {
            model: SystemTemperatureData,
            collection: "MinMaxSystemTempFahrenheit",
            query: { "from": systemName }
        },
        output
    );

    var getCelsiusMinMax = asyncCallbackHelpers.buildCelsiusMinMaxCallback(
        {
            model: SystemTemperatureData,
            collection: "MinMaxSystemTempCelsius",
            query: { "from": systemName }
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


exports.systemTemperatureStatsDay = function ( req, res ) {

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

    var systemName = req.query.systemName || "Holly";

    var d = new Date();
    var currentDate = d.getDate();
    var currentMonth = d.getMonth();
    var currentYear = d.getFullYear();

    var q = {
        "date": {
            "$gte": new Date( currentYear, currentMonth, currentDate ),
            "$lt": new Date( currentYear, currentMonth, currentDate + 1 )
        },
        "from": systemName
    };

    var getFahrenheitAverage = asyncCallbackHelpers.buildFahrenheitAverageCallback (
        {
            model: SystemTemperatureData,
            collection: "AverageSystemTempDayFahrenheit",
            query: q
        },
        output
    );

    var getCelsiusAverage = asyncCallbackHelpers.buildCelsiusAverageCallback (
        {
            model: SystemTemperatureData,
            collection: "AverageSystemTempDayCelsius",
            query: q
        },
        output
    );

    var getFahrenheitMinMax = asyncCallbackHelpers.buildFahrenheitMinMaxCallback(
        {
            model: SystemTemperatureData,
            collection: "MinMaxSystemTempDayFahrenheit",
            query: q
        },
        output
    );

    var getCelsiusMinMax = asyncCallbackHelpers.buildCelsiusMinMaxCallback(
        {
            model: SystemTemperatureData,
            collection: "MinMaxSystemTempDayCelsius",
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


exports.systemTemperatureStatsWeek = function ( req, res ) {

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

    var systemName = req.query.systemName || "Holly";

    var d = new Date();
    var currentDate = d.getDate();
    var currentMonth = d.getMonth();
    var currentYear = d.getFullYear();

    var q = {
        "date": {
            "$gte": new Date( currentYear, currentMonth, currentDate - 7 ),
            "$lt": new Date( currentYear, currentMonth, currentDate + 1 )
        },
        "from": systemName
    };

    var getFahrenheitAverage = asyncCallbackHelpers.buildFahrenheitAverageCallback (
        {
            model: SystemTemperatureData,
            collection: "AverageSystemTempWeekFahrenheit",
            query: q
        },
        output
    );

    var getCelsiusAverage = asyncCallbackHelpers.buildCelsiusAverageCallback (
        {
            model: SystemTemperatureData,
            collection: "AverageSystemTempWeekCelsius",
            query: q
        },
        output
    );

    var getFahrenheitMinMax = asyncCallbackHelpers.buildFahrenheitMinMaxCallback(
        {
            model: SystemTemperatureData,
            collection: "MinMaxSystemTempWeekFahrenheit",
            query: q
        },
        output
    );

    var getCelsiusMinMax = asyncCallbackHelpers.buildCelsiusMinMaxCallback(
        {
            model: SystemTemperatureData,
            collection: "MinMaxSystemTempWeekCelsius",
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


exports.systemTemperatureStatsMonth = function ( req, res ) {

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

    var systemName = req.query.systemName || "Holly";

    var d = new Date();
    var currentDate = d.getDate();
    var currentMonth = d.getMonth();
    var currentYear = d.getFullYear();

    var q = {
        "date": {
            "$gte": new Date( currentYear, currentMonth, currentDate - 30 ),
            "$lt": new Date( currentYear, currentMonth, currentDate + 1 )
        },
        "from": systemName
    };

    var getFahrenheitAverage = asyncCallbackHelpers.buildFahrenheitAverageCallback (
        {
            model: SystemTemperatureData,
            collection: "AverageSystemTempMonthFahrenheit",
            query: q
        },
        output
    );

    var getCelsiusAverage = asyncCallbackHelpers.buildCelsiusAverageCallback (
        {
            model: SystemTemperatureData,
            collection: "AverageSystemTempMonthCelsius",
            query: q
        },
        output
    );

    var getFahrenheitMinMax = asyncCallbackHelpers.buildFahrenheitMinMaxCallback(
        {
            model: SystemTemperatureData,
            collection: "MinMaxSystemTempMonthFahrenheit",
            query: q
        },
        output
    );

    var getCelsiusMinMax = asyncCallbackHelpers.buildCelsiusMinMaxCallback(
        {
            model: SystemTemperatureData,
            collection: "MinMaxSystemTempMonthCelsius",
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

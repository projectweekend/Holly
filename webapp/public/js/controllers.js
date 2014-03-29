'use strict';


var cMod = angular.module( 'myApp.controllers', [] );


cMod.controller( 'AppCtrl', function ( $scope, $location ) {

	$scope.navActiveElement = function ( routeName ) {

		var currentRoute = $location.path();
		if ( currentRoute == routeName ) {
			return "active";
		}

	};

} );


cMod.controller( 'HomeCtrl', function (
    $scope,
    IndoorTempReporting,
    IndoorTemperatureCurrent,
    IndoorTemperatureStats,
    IndoorHumidityReporting,
    IndoorHumidityCurrent,
    IndoorHumidityStats,
    IndoorMovementToday ) {

    $scope.indoorTemperatureCurrent = IndoorTemperatureCurrent;
    $scope.indoorTemperatureCurrent.init();
    $scope.indoorTemperatureCurrent.listenForUpdates();

    $scope.indoorTemperatureStats = IndoorTemperatureStats;
    $scope.indoorTemperatureStats.init();

    $scope.indoorTemperatureReporting = IndoorTempReporting;
    $scope.indoorTemperatureReporting.init( 'F' );
    $scope.indoorTemperatureReporting.listenForUpdates( 'F' );

    $scope.indoorHumidityCurrent = IndoorHumidityCurrent;
    $scope.indoorHumidityCurrent.init();
    $scope.indoorHumidityCurrent.listenForUpdates();

    $scope.indoorHumidityStats = IndoorHumidityStats;
    $scope.indoorHumidityStats.init();

    $scope.indoorHumidityReporting = IndoorHumidityReporting;
    $scope.indoorHumidityReporting.init();
    $scope.indoorHumidityReporting.listenForUpdates();

    $scope.indoorMovementToday = IndoorMovementToday;
    $scope.indoorMovementToday.init();

} );


cMod.controller( 'WeatherCtrl', function ( $scope, WeatherIO ) {

	$scope.CurrentWeather = new WeatherIO();
	$scope.CurrentWeather.getForecast( 'current' );

    $scope.HourlyWeather = new WeatherIO();
    $scope.HourlyWeather.getForecast( 'hourly' );

    $scope.DailyWeather = new WeatherIO();
    $scope.DailyWeather.getForecast( 'daily' );

} );


cMod.controller( 'TransitCtrl', function ( $scope, BusTracker, BusTrackerConfig ) {

    $scope.busTracker = BusTracker;
    $scope.busTracker.init();

    $scope.busTrackerConfig = BusTrackerConfig;
    $scope.busTrackerConfig.init();

} );


cMod.controller( 'LightsCtrl', function ( $scope, HueLighting ) {

    $scope.hueLighting = HueLighting;
    $scope.hueLighting.init();

} );


cMod.controller( 'NewsCtrl', function ( $scope, NewsArticles ) {

    $scope.newsArticles = NewsArticles;
    $scope.newsArticles.getArticles();

} );


cMod.controller( 'SystemCtrl', function (
    $scope,
    SystemTempReporting,
    SystemTempCurrent,
    SystemTempStats,
    SystemMemoryCurrent,
    SystemStorageCurrent,
    SystemConfigCurrent,
    SystemMessages,
    StarbugTempCurrent,
    StarbugTempReporting,
    StarbugTempStats ) {

    $scope.systemTempReporting = SystemTempReporting;
    $scope.systemTempReporting.init( 'F' );
    $scope.systemTempReporting.listenForUpdates( 'F' );

    $scope.systemCurrentTemp = SystemTempCurrent;
    $scope.systemCurrentTemp.init();
    $scope.systemCurrentTemp.listenForUpdates();

    $scope.systemTempStats = SystemTempStats;
    $scope.systemTempStats.init();

    $scope.systemCurrentMemory = SystemMemoryCurrent;
    $scope.systemCurrentMemory.init();

    $scope.systemCurrentStorage = SystemStorageCurrent;
    $scope.systemCurrentStorage.init();

    $scope.systemCurrentConfig = SystemConfigCurrent;
    $scope.systemCurrentConfig.init();

    $scope.systemMessages = SystemMessages;
    $scope.systemMessages.init();

    $scope.starbugCurrentTemp = StarbugTempCurrent;
    $scope.starbugCurrentTemp.init();
    $scope.starbugCurrentTemp.listenForUpdates();

    $scope.starbugTempReporting = StarbugTempReporting;
    $scope.starbugTempReporting.init( 'F' );

    $scope.starbugTempStats = StarbugTempStats;
    $scope.starbugTempStats.init();

} );


cMod.controller( 'SystemConfigCtrl', function (
    $scope,
    NewsSourceConfig,
    VariablesConfig,
    Nova5Config ) {

    $scope.newsSourceConfig = NewsSourceConfig;
    $scope.newsSourceConfig.getSources();

    $scope.variablesConfig = VariablesConfig;
    $scope.variablesConfig.getVariables();

    $scope.nova5 = Nova5Config;
    $scope.nova5.getConfiguration();
    $scope.nova5.hue.init();

} );


cMod.controller( 'MyCtrl2', function ( $scope ) {
	// write Ctrl here
} );

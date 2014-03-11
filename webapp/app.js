
/**
 * Module dependencies
 */

var express = require('express'),
  routes = require('./routes'),
  indoorEnvAPI = require('./routes/indoorEnvironmentalAPI'),
  indoorTempStatsAPI = require('./routes/indoorTemperatureStatsAPI'),
  indoorHumidStatsAPI = require('./routes/indoorHumidityStatsAPI'),
  indoorMovementLogAPI = require('./routes/indoorMovementLogAPI'),
  systemStatusAPI = require('./routes/systemStatusAPI'),
  systemDataAPI = require('./routes/systemDataAPI'),
  systemTempStatsAPI = require('./routes/systemTemperatureStatsAPI'),
  configurationAPI = require('./routes/configurationAPI'),
  thirdPartyConfigAPI = require('./routes/thirdPartyConfigAPI'),
  newsAPI = require('./routes/newsAPI'),
  ctaBusAPI = require('./routes/ctaBusAPI'),
  http = require('http'),
  path = require('path'),
  mongoose = require('mongoose');

var app = module.exports = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

/**
 * Configuration
 */

// all environments
app.set('port', process.env.WEBAPP_PORT);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);


// connect to the db
var mongoUri = process.env.MONGO_URL ||
    'mongodb://localhost/holly-webapp-db';

mongoose.connect(mongoUri);
var db = mongoose.connection;


// development only
if (app.get('env') === 'development') {
  app.use(express.errorHandler());
}

// production only
if (app.get('env') === 'production') {
  // TODO
}


/**
 * Routes
 */

// serve index and view partials
app.get('/', routes.index);
app.get('/partials/:name', routes.partials);

// JSON API
app.get('/api/indoor/temperature', indoorEnvAPI.indoorTemperatureData);
app.post('/api/indoor/temperature', indoorEnvAPI.indoorTemperatureData);
app.post('/api/indoor/temperature/bulk', indoorEnvAPI.indoorTemperatureDataBulk);
app.get('/api/indoor/temperature/recent', indoorEnvAPI.indoorTemperatureDataRecent);

app.get('/api/indoor/temperature/stats/overall', indoorTempStatsAPI.indoorTemperatureStatsOverall);
app.get('/api/indoor/temperature/stats/today', indoorTempStatsAPI.indoorTemperatureStatsDay);
app.get('/api/indoor/temperature/stats/week', indoorTempStatsAPI.indoorTemperatureStatsWeek);
app.get('/api/indoor/temperature/stats/month', indoorTempStatsAPI.indoorTemperatureStatsMonth);

app.get('/api/indoor/humidity', indoorEnvAPI.indoorHumidityData);
app.post('/api/indoor/humidity', indoorEnvAPI.indoorHumidityData);
app.post('/api/indoor/humidity/bulk', indoorEnvAPI.indoorHumidityDataBulk);
app.get('/api/indoor/humidity/recent', indoorEnvAPI.indoorHumidityDataRecent);

app.get('/api/indoor/humidity/stats/overall', indoorHumidStatsAPI.indoorHumidityStatsOverall);
app.get('/api/indoor/humidity/stats/today', indoorHumidStatsAPI.indoorHumidityStatsDay);
app.get('/api/indoor/humidity/stats/week', indoorHumidStatsAPI.indoorHumidityStatsWeek);
app.get('/api/indoor/humidity/stats/month', indoorHumidStatsAPI.indoorHumidityStatsMonth);

app.get('/api/indoor/movement', indoorMovementLogAPI.indoorMovementLog);
app.post('/api/indoor/movement', indoorMovementLogAPI.indoorMovementLog);
app.post('/api/indoor/movement/bulk', indoorMovementLogAPI.indoorMovementLogBulk);
app.get('/api/indoor/movement/recent', indoorMovementLogAPI.indoorMovementLogRecent);

app.get('/api/system/temperature', systemDataAPI.systemTemperatureData);
app.post('/api/system/temperature', systemDataAPI.systemTemperatureData);
app.post('/api/system/temperature/bulk', systemDataAPI.systemTemperatureDataBulk);
app.get('/api/system/temperature/recent', systemDataAPI.systemTemperatureDataReportingRecent);

app.get('/api/system/temperature/stats/overall', systemTempStatsAPI.systemTemperatureStatsOverall);
app.get('/api/system/temperature/stats/today', systemTempStatsAPI.systemTemperatureStatsDay);
app.get('/api/system/temperature/stats/week', systemTempStatsAPI.systemTemperatureStatsWeek);
app.get('/api/system/temperature/stats/month', systemTempStatsAPI.systemTemperatureStatsMonth);

app.get('/api/system/memory', systemDataAPI.systemMemoryData);
app.get('/api/system/storage', systemDataAPI.systemStorageData);

app.get('/api/system/messages', systemStatusAPI.messagesList);
app.post('/api/system/messages', systemStatusAPI.messagesList);
app.get('/api/system/messages/:id', systemStatusAPI.messagesDetail);
app.delete('/api/system/messages/:id', systemStatusAPI.messagesDetail);

app.get('/api/system/configuration', configurationAPI.systemConfigurationList);
app.post('/api/system/configuration', configurationAPI.systemConfigurationList);
app.get('/api/system/configuration/:id', configurationAPI.systemConfigurationDetail);
app.put('/api/system/configuration/:id', configurationAPI.systemConfigurationDetail);
app.delete('/api/system/configuration/:id', configurationAPI.systemConfigurationDetail);

app.get('/api/system/third-party/config', thirdPartyConfigAPI.configManager);
app.post('/api/system/third-party/config', thirdPartyConfigAPI.configManager);
app.put('/api/system/third-party/config', thirdPartyConfigAPI.configManager);
app.delete('/api/system/third-party/config', thirdPartyConfigAPI.configManager);

app.get('/api/news-source/config', newsAPI.newsSourceConfig);
app.post('/api/news-source/config', newsAPI.newsSourceConfig);
app.put('/api/news-source/config', newsAPI.newsSourceConfig);
app.delete('/api/news-source/config', newsAPI.newsSourceConfig);

app.get('/api/news-articles', newsAPI.newsArticles);
app.get('/api/article-keywords', newsAPI.articleKeywords);

app.post('/api/news-articles/read', newsAPI.readArticle);
app.post('/api/news-articles/ignore', newsAPI.ignoreArticle);

app.get('/api/bustracker/routes', ctaBusAPI.busTrackerRoutes);
app.get('/api/bustracker/directions', ctaBusAPI.busTrackerRouteDirections);
app.get('/api/bustracker/stops', ctaBusAPI.busTrackerRouteStops);
app.get('/api/bustracker/predictions', ctaBusAPI.busTrackerPredictions);
app.get('/api/bustracker/favorites', ctaBusAPI.busTrackerFavorites);
app.post('/api/bustracker/favorites', ctaBusAPI.busTrackerFavorites);
app.delete('/api/bustracker/favorites', ctaBusAPI.busTrackerFavorites);

// redirect all others to the index (HTML5 history)
app.get('*', routes.index);

// Socket.io Communication
io.sockets.on('connection', require('./routes/socket'));

/**
 * Start Server
 */

server.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});

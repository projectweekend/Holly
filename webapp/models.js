var mongoose = require( 'mongoose' );

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;


IndoorTemperatureDataSchema = Schema( {
	id: ObjectId,
	date: Date,
	celsius: Number,
	fahrenheit: Number
} );
IndoorTemperatureData = mongoose.model( 'IndoorTemperatureData', IndoorTemperatureDataSchema );


IndoorHumidityDataSchema = Schema( {
	id: ObjectId,
	date: Date,
	percent: Number
} );
IndoorHumidityData = mongoose.model( 'IndoorHumidityData', IndoorHumidityDataSchema );


SystemTemperatureDataSchema = Schema( {
	id: ObjectId,
	date: Date,
	celsius: Number,
	fahrenheit: Number
} );
SystemTemperatureData = mongoose.model( 'SystemTemperatureData', SystemTemperatureDataSchema );


SystemMemoryDataSchema = Schema( {
	id: ObjectId,
	date: Date,
    total: Number,
    used: Number,
    free: Number,
    shared: Number,
    buffers: Number,
    cached: Number
} );
SystemMemoryData = mongoose.model( 'SystemMemoryData', SystemMemoryDataSchema );


SystemStorageDataSchema = Schema( {
	id: ObjectId,
	date: Date,
    available: Number,
    used: Number,
    percent: Number
} );
SystemStorageData = mongoose.model( 'SystemStorageData', SystemStorageDataSchema );


StarbugTemperatureDataSchema = Schema( {
	id: ObjectId,
	date: Date,
	celsius: Number,
	fahrenheit: Number
} );
StarbugTemperatureData = mongoose.model( 'StarbugTemperatureData', StarbugTemperatureDataSchema );


NewsSourceConfigSchema = Schema( {
	id: ObjectId,
	date: Date,
	url: String
} );
NewsSourceConfig = mongoose.model( 'NewsSourceConfig', NewsSourceConfigSchema );


NewsArticleSchema = Schema( {
	id: ObjectId,
	title: String,
	summary: String,
	image_url: String,
	url: String,
	keywords: [String]
} );
NewsArticle = mongoose.model( 'NewsArticle', NewsArticleSchema );


NewsArticleKeywordSchema = Schema( {
	id: ObjectId,
	word: {
		type: String,
		index: true,
		unique: true
	},
	score: Number
} );
NewsArticleKeyword = mongoose.model( 'NewsArticleKeyword', NewsArticleKeywordSchema );


BusStopConfigSchema = Schema( {
	id: ObjectId,
	stopID: String,
	route: String
} );
BusStopConfig = mongoose.model( 'BusStopConfig', BusStopConfigSchema );

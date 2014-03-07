var appModels = require( '../models' ),
	http = require( 'http' ),
	async = require( 'async' ),
	xml2js = require( 'xml2js' );


var errorHandler = function ( err, res ) {
    console.log( err );
    res.send( 500 );
};


var busTrackerKey;
var loadThirdPartyConfig = function () {

	var q = ThirdPartyConfig.findOne({config_key: 'BUS_TRACKER_API_KEY'});
	q.exec( function ( err, data ) {
		busTrackerKey = data.config_value || "Not defined";
	} );

};
loadThirdPartyConfig();


exports.busTrackerFavorites = function ( req, res ) {

	if ( req.method == 'POST' ) {
		var newFavorite = {
			stopID: req.body.stopID,
			route: req.body.route
		};
		BusStopConfig.create( newFavorite, function ( err, newFavoriteData ) {
            if ( err ) {
                return errorHandler( err, res );
            }
            return res.send( 201 );
		} );
	}

	if ( req.method == 'GET' ) {
		var q = BusStopConfig.find( ).sort( 'route' );
		q.exec( function ( err, data ) {
            if ( err ) {
                return errorHandler( err, res );
            }
            return res.json( data );
		} );
	}

	if ( req.method == 'DELETE' ) {
		BusStopConfig.findById( req.query.id, function ( err, itemToDelete ) {
            if ( err ) {
                return errorHandler( err, res );
            }
            itemToDelete.remove();
            return res.send( 200 );
		} );
	}

};


exports.busTrackerRoutes = function ( req, res ) {

	var output = [];

	var apiOptions = {
		hostname: "www.ctabustracker.com",
		path: "/bustime/api/v1/getroutes?key=" + busTrackerKey
	};

	http.get( apiOptions, function ( ctaRes ) {

		var shittyXML = "";

		ctaRes.on( 'data', function ( chunk ) {
			shittyXML += chunk;
		} );

		ctaRes.on( 'end', function () {
			xml2js.parseString( shittyXML, function ( err, awesomeJSON ) {
				
				if ( err ) {
					return errorHandler( err, res );
				}

				if ( awesomeJSON['bustime-response']['error'] ) {
					output.push( awesomeJSON['bustime-response'] );
				}

				if ( awesomeJSON['bustime-response']['route'] ) {
					var routes = awesomeJSON['bustime-response']['route'];

					routes.forEach( function ( r, index, array ) {
						output.push( {
							route: r.rt[0],
							routeName: r.rtnm[0]
						} );
					} );
				}
				
				return res.json( output );

			} );
		} );

	});

};


exports.busTrackerRouteDirections = function ( req, res ) {

	var output = [];

	var apiOptions = {
		hostname: "www.ctabustracker.com",
		path: "/bustime/api/v1/getdirections?key=" + busTrackerKey + "&rt=" + req.query.route
	};

	http.get( apiOptions, function ( ctaRes ) {

		var shittyXML = "";

		ctaRes.on( 'data', function ( chunk ) {
			shittyXML += chunk;
		} );

		ctaRes.on( 'end', function () {
			xml2js.parseString( shittyXML, function ( err, awesomeJSON ) {
				
				if ( err ) {
					return errorHandler( err, res );
				}

				if ( awesomeJSON['bustime-response']['error'] ) {
					return res.json( awesomeJSON['bustime-response'] );
				}

				var directions = awesomeJSON['bustime-response']['dir'];
				
				return res.json( directions );

			} );
		} );

	} );

};


exports.busTrackerRouteStops = function ( req, res ) {

	var output = [];

	var apiOptions = {
		hostname: "www.ctabustracker.com",
		path: "/bustime/api/v1/getstops?key=" + busTrackerKey + "&rt=" + req.query.route + "&dir=" + req.query.direction
	};

	http.get( apiOptions, function ( ctaRes ) {

		var shittyXML = "";

		ctaRes.on( 'data', function ( chunk ) {
			shittyXML += chunk;
		} );

		ctaRes.on( 'end', function () {
			xml2js.parseString( shittyXML, function ( err, awesomeJSON ) {

				if ( err ) {
					return errorHandler( err, res );
				}

				if ( awesomeJSON['bustime-response']['error'] ) {
					return res.json( awesomeJSON['bustime-response'] );
				}

				var stops = awesomeJSON['bustime-response']['stop'];

				stops.forEach( function ( s, index, array ) {
					output.push( {
						stopID: s.stpid[0],
						stopName: s.stpnm[0],
						latitude: s.lat[0],
						longitude: s.lon[0]
					} );
				} );

				return res.json( output );

			} );
		} );

	} );

};


exports.busTrackerPredictions = function ( req, res ) {

	var output = [];

	var buildAsyncCallback = function ( busStopConfig ) {
		return function ( callback ) {

			var apiOptions = {
				hostname: "www.ctabustracker.com",
				path: "/bustime/api/v1/getpredictions?key=" + busTrackerKey + "&rt=" + busStopConfig.route + "&stpid=" + busStopConfig.stopID + "&top=5"
			};
			
			http.get( apiOptions, function ( ctaRes ) {

				var shittyXML = "";

				ctaRes.on( 'data', function ( chunk ) {
					shittyXML += chunk;
				} );

				ctaRes.on( 'end', function () {
					xml2js.parseString( shittyXML, function ( err, awesomeJSON ) {

						if ( err ) {
							callback( err );
						}

						var formattedJSON = {
							favoritesID: busStopConfig._id,
							title: busStopConfig.route + " - No data available",
							predictions: []
						};

						if ( awesomeJSON['bustime-response']['error'] ) {
							
							var busRoute = awesomeJSON['bustime-response']['error'][0]['rt'];
							var message = awesomeJSON['bustime-response']['error'][0]['msg'];

							formattedJSON.title = busRoute + " - " + message;

						} else {

							if ( awesomeJSON['bustime-response']['prd'] ) {

								if ( awesomeJSON['bustime-response']['prd'][0]['rt'] ) {

									var busRoute = awesomeJSON['bustime-response']['prd'][0]['rt'][0];
									var routeDirection = awesomeJSON['bustime-response']['prd'][0]['rtdir'][0];
									
									formattedJSON.title = busRoute + " - " + routeDirection;
									awesomeJSON['bustime-response']['prd'].forEach( function ( prd, index, array ) {

										var formattedPrediction = {
											type: prd.typ[0],
											time: prd.prdtm[0].split( " " )[1],
											distanceToStop: prd.dstp[0],
											delayed: false
										};

										if ( prd.dly ) {
											formattedPrediction.delayed = true;
										}
										
										formattedJSON.predictions.push( formattedPrediction );

									} );

								}

							}

						}
						output.push( formattedJSON );
						callback();

					} );
				} );

			} ).on( 'error', function ( err ) {
				callback( err );
			} );

		};
	};

	var busStopQuery = BusStopConfig.find();
	busStopQuery.exec( function ( err, data ) {
        
        if ( err ) {
            return errorHandler( err, res );
        }

        if ( data.length === 0 ) {
			return res.json( [] );
        }

		if ( busTrackerKey ) {

			var asyncTaskList = data.map( buildAsyncCallback );

			async.parallel( asyncTaskList, function ( err ) {
				if ( err ) {
					return errorHandler( err, res );
				}
				return res.json( output );
			} );

		} else {
			return res.json( { error: "CTA API key is missing"} );
		}


	} );

};

var appModels = require( '../models' ),
 async = require( 'async' );


var errorHandler = function ( err, res ) {
    console.log( err );
    res.send( 500 );
};


exports.configManagerList = function ( req, res ) {

	if ( req.method == 'GET' ) {
		var q = ThirdPartyConfig.find( ).sort( 'config_key' );
		q.exec( function ( err, data ) {
			if ( err ) {
				return errorHandler( err, res );
			}
			return res.json( data );
		} );
	}

	if ( req.method == 'POST' ) {
		var newConfigItem = {
			config_key: req.body.config_key,
			config_value: req.body.config_value
		};
		ThirdPartyConfig.create( newConfigItem, function ( err, configItemData ) {
            if ( err ) {
                return errorHandler( err, res );
            }

            return res.send( 201 );
		} );
	}

};


exports.configManagerDetail = function ( req, res ) {

	var configID = req.params.id;

	if ( req.method == 'GET' ) {
		ThirdPartyConfig.findById( configID, function ( err, data ) {
			if ( err ) {
				return errorHandler( err, res );
			}
			return res.json( data );
		} );
	}

	if ( req.method == 'PUT' ) {
		var update = {
			$set: {
				config_key: req.body.config_key,
				config_value: req.body.config_value
			}
		};
		ThirdPartyConfig.findByIdAndUpdate( configID, update, function ( err, updatedItem ) {
            if ( err ) {
                return errorHandler( err, res );
            }
            return res.json( updatedItem );
		} );
	}

	if ( req.method == 'DELETE' ) {
		ThirdPartyConfig.findById( configID, function ( err, itemToDelete ) {
            if ( err ) {
                return errorHandler( err, res );
            }
            itemToDelete.remove();
            return res.send( 200 );
        } );
	}

};

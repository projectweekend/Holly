var appModels = require( '../models' );


var errorHandler = function ( err, res ) {
    console.log( err );
    res.send( 500 );
};


exports.systemConfigurationList = function ( req, res ) {

	if (req.method == 'GET' ) {

		var q = Configuration.find( );
		q.exec( function ( err, data ) {
			if ( err ) {
				return errorHandler( err, res );
			}
			return res.json( data );
		} );
		
	}

	if (req.method == 'POST' ) {
		var newConfigItem = {
			system_name: req.body.system_name,
			system_options: req.body.system_options
		};
		Configuration.create( newConfigItem, function ( err, configItem ) {
            if ( err ) {
                return errorHandler( err, res );
            }
            return res.send( 201 );
		} );
	}

};


exports.systemConfigurationDetail = function ( req, res ) {

	var configID = req.params.id;

	if (req.method == 'GET' ) {

		Configuration.findById( configID, function ( err, data ) {
			if ( err ) {
				return errorHandler( err, res );
			}
			return res.json( data );
		} );
		
	}

	if (req.method == 'PUT' ) {
		var update = {
			$set: {
				system_options: req.body.system_options
			}
		};
		Configuration.findByIdAndUpdate( configID, update, function ( err, updatedItem ) {
            if ( err ) {
                return errorHandler( err, res );
            }
            return res.json( updatedItem );
		} );
	}

	if (req.method == 'DELETE' ) {
		Configuration.findById( configID, function ( err, itemToDelete ) {
            if ( err ) {
                return errorHandler( err, res );
            }
            itemToDelete.remove();
            return res.send( 200 );
		} );
	}

};

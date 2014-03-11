var appModels = require( '../models' );


var errorHandler = function ( err, res ) {
    console.log( err );
    res.send( 500 );
};


exports.systemConfigurationGetCreate = function ( req, res ) {

	if (req.method == 'GET' ) {

		var q = SystemConfiguration.findOne( { 'name': req.query.systemName } );
		q.exec( function ( err, data ) {
			if ( err ) {
				return errorHandler( err, res );
			}
			return res.json( data );
		} );
		
	}

	if (req.method == 'POST' ) {
		var newConfigItem = {
			name: req.body.name,
			options: req.body.options
		};
		SystemConfiguration.create( newConfigItem, function ( err, configItem ) {
            if ( err ) {
                return errorHandler( err, res );
            }
            return res.send( 201 );
		} );
	}

};


exports.systemConfigurationUpdateDelete = function ( req, res ) {

	var configID = req.params.id;

	if (req.method == 'PUT' ) {
		var update = {
			$set: {
				options: req.body.options
			}
		};
		SystemConfiguration.findByIdAndUpdate( configID, update, function ( err, updatedItem ) {
            if ( err ) {
                return errorHandler( err, res );
            }
            return res.json( updatedItem );
		} );
	}

	if (req.method == 'DELETE' ) {
		SystemConfiguration.findById( configID, function ( err, itemToDelete ) {
            if ( err ) {
                return errorHandler( err, res );
            }
            itemToDelete.remove();
            return res.send( 200 );
		} );
	}

};

var async = require( 'async' );
var SystemTemperature = require( './models' ).SystemTemperature;
var handleRouteError = require( '../utils' ).handleRouteError;


exports.create = function ( req, res ) {

    var validation = function ( callback ) {

        req.checkBody( "temp_c", "'temp_c' must be a float" ).isFloat();
        req.checkBody( "temp_f", "'temp_f' must be a float" ).isFloat();

        var errors = req.validationErrors();
        if ( errors ) {
            return callback( errors );
        }

        var cleanData = {
            temp_c: req.param( "temp_c" ),
            temp_f: req.param( "temp_f" )
        };

        return callback( null, cleanData );

    };

    var data = function ( cleanData, callback ) {

        SystemTemperature.add( cleanData, function ( err, newSystemTemperature ) {

            if ( err ) {
                return callback( err );
            }

            return callback( null, newSystemTemperature );

        } );

    };

    async.waterfall( [ validation, data ], function ( err, newSystemTemperature ) {

        if ( err ) {
            return handleRouteError( err, res );
        }

        return res.json( newSystemTemperature, 201 );

    } );

};

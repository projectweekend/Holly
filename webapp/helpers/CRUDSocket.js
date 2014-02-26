module.exports = function ( socket, handleError, config ) {

  // set some common items we will need from config
  var route = config.route;
  var model = config.model;

  // define the socket behavior
  socket.on( route, function ( data ) {

    switch ( data.action ) {
      
      case 'list':
        model.find( data.query, function ( err, itemList ) {
          if ( err ) {
            return handleError( route, err );
          }
          var response = {
            items: itemList
          };
          socket.emit( route + ':list:success', response );
        } );
        break;

      case 'item':
        model.findOne( data.query, function ( err, singleItem ) {
          if ( err ) {
            return handleError( route, err );
          }
          var response = {
            items: [singleItem]
          };
          socket.emit( route + ':item:success', response );
        } );
        break;

      case 'create':
        model.create( data.item, function ( err, newItem ) {
          if ( err ) {
            return handleError( route, err );
          }
          var response = {
            newItem: newItem
          };
          socket.emit( route + ':create:success', response );
        } );
        break;

      case 'update':
        model.update( data.query, { $set: data.item}, function ( err, updatedItem ) {
          if ( err ) {
            return handleError( route, err );
          }
          var response = {
            updatedItem: updatedItem
          };
          socket.emit( route + ':update:success', response );
        } );
        break;

      case 'delete':
        model.remove( data.query, function ( err ) {
          if ( err ) {
            return handleError( route, err );
          }
          var response = {};
          socket.emit( route + ':delete:success', response );
        } );
        break;

      default:
        err = {
          message:"available actions are: 'list', 'item', 'create', 'edit', 'delete'."
        };
        handleError( route, err );

    }

  } );

};

module.exports = function ( socket, config ) {

  var route = config.route;

  var errorHandler = function ( errRoute, err ) {
    var data = {
      socket: errRoute,
      error: err
    };
    socket.emit( route, data );
  };

  return errorHandler;

};

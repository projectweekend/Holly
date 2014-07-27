exports.conflictError = function ( message ) {
    return {
        type: 'conflict',
        msg: message,
        code: 409
    };
};


exports.systemError = function ( err ) {
    return {
        err: err,
        type: 'system',
        msg: "A system error occurred",
        code: 500
    };
};


exports.authorizationError = function ( message ) {
    return {
        type: 'authorization',
        msg: message,
        code: 401
    };
};

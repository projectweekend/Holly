#!/usr/bin/env node
var jwt = require( 'jsonwebtoken' );


var args = process.argv.slice(2);
var jwtSecret = args[0];
var jwtData = args[1];


var makeToken = function ( data ) {
    return jwt.sign( data, jwtSecret );
};

var token = makeToken( jwtData );

console.log( token );

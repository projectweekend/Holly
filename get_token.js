#!/usr/bin/env node
var jwt = require( 'jsonwebtoken' );


var args = process.argv.slice(2);
var jwtSecret = args[0];
var jwtData = args[1];


var makeToken = function () {
    var data = {
        id: jwtData
    };
    return jwt.sign( data, jwtSecret );
};

var token = makeToken();

console.log( token );

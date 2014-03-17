'use strict';


var logError = function ( data ) {
    console.log( data );
};


var makeTimeLabelString = function ( dateString ) {

    var d = new Date( dateString );
    var h = d.getHours();
    var m = d.getMinutes();

    if ( m === 0 ) {
        m = "00";
    }

    return h + ":" + m;
};


var svcMod = angular.module('myApp.services_indoor_movement', []);

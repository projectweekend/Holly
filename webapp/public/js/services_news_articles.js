'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
var makeHoursMinutesTimeString = function ( dateString ) {

    var d = new Date( dateString );
    var h = d.getHours();
    var m = d.getMinutes();

    if ( m === 0 ) {
        m = "00";
    }

    return h + ":" + m;
};

var logError = function ( data ) {
    console.log( data );
};


var svcMod = angular.module('myApp.services_news_articles', []);


svcMod.factory( "NewsArticles", function ( $http ) {

    return {
        articles: {
            col_1: [],
            col_2: []
        },
        getArticles: function () {
            var NewsArticles = this;
            var apiUrl = "/api/news-articles";
            // set to empty to prevent doubling up on page changes
            NewsArticles.articles.col_1 = [];
            NewsArticles.articles.col_2 = [];
            $http.get( apiUrl ).
                success( function ( data, status ) {
                    data.forEach( function ( article, index, array ) {
                        switch ( index % 2 ) {
                            case 0:
                                NewsArticles.articles.col_1.push( article );
                                break;
                            case 1:
                                NewsArticles.articles.col_2.push( article );
                                break;
                        }
                    } );
                } ).
                error( function ( data, status ) {
                    logError( data );
                } );
        },
        readArticle: function ( article, articleList ) {
            var apiUrl = "/api/news-articles/read";
            $http.post( apiUrl, article ).
                success( function ( data, status ) {
                    var index = articleList.indexOf( article );
                    if ( index > -1 ) {
                        articleList.splice( index, 1 );
                    }
                } ).
                error( function ( data, status ) {
                    logError( data );
                } );
        },
        ignoreArticle: function ( article, articleList ) {
            var apiUrl = "/api/news-articles/ignore";
            $http.post( apiUrl, article ).
                success( function ( data, status ) {
                    var index = articleList.indexOf( article );
                    if ( index > -1 ) {
                        articleList.splice( index, 1 );
                    }
                } ).
                error( function ( data, status ) {
                    logError( data );
                } );
        }
    };

} );

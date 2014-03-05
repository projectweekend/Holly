'use strict';

/* Services */


var logError = function ( data ) {
    console.log( data );
};


var svcMod = angular.module('myApp.services_system_config', []);


// News Source Config
svcMod.factory( "NewsSourceConfig", function ( $http ) {

    return {
        editing: {
            _id: "",
            url: "",
            clearForm: function () {
                var editing = this;
                editing._id = "";
                editing.url = "";
            },
            begin: function ( itemToEdit ) {
                var editing = this;
                editing.clearForm();
                editing._id = itemToEdit._id;
                editing.url = itemToEdit.url;
            }
        },
        save: function () {
            var NewsSourceConfig = this;
            var apiUrl = "/api/news-source/config";

            if ( !NewsSourceConfig.editing._id ) {
                $http.post( apiUrl, NewsSourceConfig.editing ).
                    success( function ( data, status ) {
                        NewsSourceConfig.editing.clearForm();
                        NewsSourceConfig.getSources();
                    } ).
                    error( function ( data, status ) {
                        logError( data );
                    } );
            } else {
                $http.put( apiUrl, NewsSourceConfig.editing ).
                    success( function ( data, status ) {
                        NewsSourceConfig.editing.clearForm();
                        NewsSourceConfig.getSources();
                    } ).
                    error( function ( data, status ) {
                        logError( data );
                    } );
            }

        },
        cancel: function () {
            var NewsSourceConfig = this;
            NewsSourceConfig.editing.clearForm();
        },
        edit: function ( itemToEdit ) {
            var NewsSourceConfig = this;
            NewsSourceConfig.editing.begin( itemToEdit );
        },
        remove: function ( id ) {
            var NewsSourceConfig = this;
            var apiUrl = "/api/news-source/config?id=" + id;

            $http.delete( apiUrl ).
                success( function ( data, status ) {
                    NewsSourceConfig.getSources();
                } ).
                error( function ( data, status ) {
                    logError( data );
                } );
        },
        sources: [],
        getSources: function () {
            var NewsSourceConfig = this;
            var apiUrl = "/api/news-source/config";

            $http.get( apiUrl ).
                success( function ( data, status ) {
                    NewsSourceConfig.sources = data;
                } ).
                error( function ( data, status ) {
                    logError( data );
                } );
        }
    };

} );

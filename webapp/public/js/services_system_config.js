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
                apiUrl = apiUrl + "/" + NewsSourceConfig.editing._id;
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
            var apiUrl = "/api/news-source/config/" + id;

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


svcMod.factory( "VariablesConfig", function ( $http ) {

    return {
        editing: {
            _id: "",
            config_key: "",
            config_value: "",
            clearForm: function () {
                var editing = this;
                editing._id = "";
                editing.config_key = "";
                editing.config_value = "";
            },
            begin: function ( itemToEdit ) {
                var editing = this;
                editing.clearForm();
                editing._id = itemToEdit._id;
                editing.config_key = itemToEdit.config_key;
                editing.config_value = itemToEdit.config_value;
            }
        },
        save: function () {
            var VariablesConfig = this;
            var apiUrl = "/api/system/third-party/config";

            if ( !VariablesConfig.editing._id ) {
                $http.post( apiUrl, VariablesConfig.editing ).
                    success( function ( data, status ) {
                        VariablesConfig.editing.clearForm();
                        VariablesConfig.getVariables();
                    } ).
                    error( function ( data, status ) {
                        logError( data );
                    } );
            } else {
                apiUrl = apiUrl + "/" + VariablesConfig.editing._id;
                $http.put( apiUrl, VariablesConfig.editing ).
                    success( function ( data, status ) {
                        VariablesConfig.editing.clearForm();
                        VariablesConfig.getVariables();
                    } ).
                    error( function ( data, status ) {
                        logError( data );
                    } );
            }

        },
        cancel: function () {
            var VariablesConfig = this;
            VariablesConfig.editing.clearForm();
        },
        edit: function ( itemToEdit ) {
            var VariablesConfig = this;
            VariablesConfig.editing.begin( itemToEdit );
        },
        remove: function ( id ) {
            var VariablesConfig = this;
            var apiUrl = "/api/system/third-party/config/" + id;

            $http.delete( apiUrl ).
                success( function ( data, status ) {
                    VariablesConfig.getVariables();
                } ).
                error( function ( data, status ) {
                    logError( data );
                } );
        },
        variables: [],
        getVariables: function () {
            var VariablesConfig = this;
            var apiUrl = "/api/system/third-party/config";
            $http.get( apiUrl ).
                success( function ( data, status ) {
                    VariablesConfig.variables = data;
                } ).
                error( function ( data, status ) {
                    logError( data );
                } );
        }
    };

} );


svcMod.factory( "Nova5Config", function ( $http ) {
    return {
        showNewConfiguration: false,
        newConfiguration: {
            system_name: "Nova5",
            system_options: {
                luminosity_threshold: 10,
                lights_enabled: [],
                manually_disabled: false,
                disabled_time_start: {
                    hour: 1,
                    minute: 0
                },
                disabled_time_end: {
                    hour: 8,
                    minute: 0
                }
            }
        },
        configuration: {},
        getConfiguration: function () {
            var Nova5Config = this;
            var apiUrl = "/api/system/configuration?system_name=Nova5";
            $http.get( apiUrl ).
                success( function ( data, status ) {
                    if ( data.length ) {
                        Nova5Config.configuration = data[0];
                    } else {
                        Nova5Config.createDefaultConfiguration();
                    }
                } ).
                error( function ( data, status ) {
                    logError( data );
                } );
        },
        createDefaultConfiguration: function () {
            var Nova5Config = this;
            var apiUrl = "/api/system/configuration";
            var defaultConfiguration = {
                system_name: "Nova5",
                system_options: {
                    luminosity_threshold: 10,
                    lights_enabled: [],
                    manually_disabled: false,
                    disabled_time_start: {
                        hour: 1,
                        minute: 0
                    },
                    disabled_time_end: {
                        hour: 8,
                        minute: 0
                    }
                }
            };
            $http.post( apiUrl, defaultConfiguration ).
                success( function ( data, status ) {
                    Nova5Config.configuration = data;
                } ).
                error( function ( data, status ) {
                    logError( data );
                } );

        },
        save: function () {
            var Nova5Config = this;
            var apiUrl = "/api/system/configuration";
            if ( typeof Nova5Config.configuration._id == "undefined" ) {
                $http.post( apiUrl, Nova5Config.newConfiguration ).
                    success( function ( data, status ) {
                        Nova5Config.configuration = data;
                    } ).
                    error( function ( data, status ) {
                        logError( data );
                    } );
            } else {
                apiUrl = apiUrl + "/" + Nova5Config.configuration._id;
                $http.put( apiUrl, Nova5Config.configuration ).
                    success( function ( data, status ) {
                        Nova5Config.configuration = data;
                    } ).
                    error( function ( data, status ) {
                        logError( data );
                    } );
            }
        }
    };
} );

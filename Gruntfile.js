module.exports = function( grunt ) {

    grunt.initConfig( {
        pkg: grunt.file.readJSON( "package.json" ),
        watch: {
            scripts: {
                files: [
                    "public/app/*"
                ],
                tasks: [ "concat:scripts" ]
            }
        },
        uglify: {
            options: {
                mangle: true,
                compress: true,
                banner: "/*! <%= pkg.name %> <%= grunt.template.today( 'yyyy-mm-dd' ) %> */",
                sourceMap: true,
                sourceMapName: "public/build/project.js.map"
            },
            project: {
                files: {
                    "public/build/project.js": [
                        "public/app/*"
                    ]
                }
            }
        },
        concat: {
            scripts: {
                src: [
                    "public/app/*"
                ],
                dest: "public/build/project.js"
            },
            angular: {
                src: [
                    "public/bower_components/angular/angular.min.js",
                    "public/bower_components/angular-route/angular-route.min.js"
                ],
                dest: "public/build/angular.js"
            },
            other: {
                src: [
                    "public/bower_components/chartjs/Chart.js",
                    "public/bower_components/angles/angles.js",
                    "public/bower_components/skycons/skycons.js",
                    "public/bower_components/angular-skycons/angular-skycons.js"
                ],
                dest: "public/build/other.js"
            }
        }
    } );

    grunt.loadNpmTasks( "grunt-contrib-watch" );
    grunt.loadNpmTasks( "grunt-contrib-uglify" );
    grunt.loadNpmTasks( "grunt-contrib-concat" );

    grunt.registerTask( "default", [
        "concat:scripts",
        "concat:angular",
        "concat:other"
    ] );

    grunt.registerTask( "deploy",  [
        "uglify",
        "concat:angular"
    ] );

};

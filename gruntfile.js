'use strict';

// When "grunt" is run from the root, this gruntfile.js is picked up.
// Grunt is used to automate repetitive tasks and has fabulous docs.
// REF: http://gruntjs.com/getting-started#how-the-cli-works
// REF: http://gruntjs.com/getting-started#the-gruntfile

// REF: http://gruntjs.com/getting-started#the-wrapper-function
module.exports = function(grunt) {
    // Project Configuration
    // REF: http://gruntjs.com/getting-started#project-and-task-configuration
    // You can run most of these by specifying them after "grunt" in terminal.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // This watches files for changes.  When they change,
        // the specified tasks are run.
        watch: {
            js: {
                files: ['gruntfile.js', 'server.js', 'app/**/*.js', 'public/js/**', 'test/**/*.js'],

                // REF: https://github.com/gruntjs/grunt-contrib-watch#tasks
                tasks: ['jshint'],
                options: {

                    // REF: https://github.com/gruntjs/grunt-contrib-watch#optionslivereload
                    livereload: true,
                },
            },
            html: {
                files: ['public/views/**', 'app/views/**'],
                options: {
                    livereload: true,
                },
            },
            css: {
                files: ['public/css/**'],
                options: {
                    livereload: true
                }
            }
        },

        // Run jshint.
        // example: grunt jshint
        jshint: {
            all: {
                src: ['gruntfile.js', 'server.js', 'app/**/*.js', 'public/js/**', 'test/**/*.js', '!test/coverage/**/*.js'],
                options: {
                    jshintrc: true
                }
            }
        },

        // This starts up the server.
        nodemon: {
            dev: {
                // GOTO: /server.js
                script: 'server.js',
                options: {
                    args: [],
                    ignore: ['public/**'],
                    ext: 'js',
                    nodeArgs: ['--debug'],
                    delayTime: 1,
                    env: {
                        PORT: 3000
                    },
                    cwd: __dirname
                }
            }
        },

        // This runs multiple tasks at the same time.
        concurrent: {
            tasks: ['nodemon', 'watch'],
            options: {
                logConcurrentOutput: true
            }
        },

        // Run Mocha tests.
        // Mocha is used to test the server-side code.
        // REF: http://visionmedia.github.io/mocha/
        // GOTO: /test/mocha/article/model.js
        mochaTest: {
            options: {
                reporter: 'spec',
                require: 'server.js'
            },
            src: ['test/mocha/**/*.js']
        },
        env: {
            test: {
                NODE_ENV: 'test'
            }
        },

        // Run Karma tests.
        // Karma is used to test the Angular JS code.
        // REF: http://karma-runner.github.io/0.10/index.html
        karma: {
            unit: {
                configFile: 'test/karma/karma.conf.js'
            }
        }
    });

    //Load NPM tasks
    // REF: http://gruntjs.com/getting-started#loading-grunt-plugins-and-tasks

    // REF: https://github.com/gruntjs/grunt-contrib-watch
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-karma');

    // REF: https://www.npmjs.org/package/grunt-nodemon
    grunt.loadNpmTasks('grunt-nodemon');

    // REF: https://github.com/sindresorhus/grunt-concurrent
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-env');

    //Making grunt default to force in order not to break the project.
    grunt.option('force', true);

    // REF: http://gruntjs.com/getting-started#custom-tasks
    //Default task(s).
    // When starting the app with "grunt", this is the main entry point.
    // Grunt runs the jshint and concurrent tasks defined above.
    grunt.registerTask('default', ['jshint', 'concurrent']);

    //Test task.
    grunt.registerTask('test', ['env:test', 'mochaTest', 'karma:unit']);
};

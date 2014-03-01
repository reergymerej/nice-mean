'use strict';

/**
 * Module dependencies.
 */
var express = require('express'),
    fs = require('fs'),

    // Passport is used for authentication.
    // REF: http://passportjs.org/
    passport = require('passport'),

    // REF: https://github.com/linnovate/mean-logger
    logger = require('mean-logger');

/**
 * Main application entry file.
 * Please note that the order of loading is important.
 */

// Load configurations
// Set the node enviornment variable if not set before
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Initializing system variables 
// GOTO: /config/config.js
var config = require('./config/config'),
    
    // Mongoose is used to interact with MongoDB.
    // REF: http://mongoosejs.com/
    mongoose = require('mongoose');

// Bootstrap db connection
var db = mongoose.connect(config.db);

// Bootstrap models
var models_path = __dirname + '/app/models';
var walk = function(path) {
    fs.readdirSync(path).forEach(function(file) {
        var newPath = path + '/' + file;
        var stat = fs.statSync(newPath);
        if (stat.isFile()) {
            if (/(.*)\.(js$|coffee$)/.test(file)) {
                require(newPath);
            }
        } else if (stat.isDirectory()) {
            walk(newPath);
        }
    });
};
// This loads all our models into memory.
// GOTO: /app/models/article.js
// GOTO: /app/models/user.js
walk(models_path);

// Bootstrap passport config
// GOTO: /config/passport.js
require('./config/passport')(passport);

var app = express();

// Express settings
require('./config/express')(app, passport, db);

// Bootstrap routes
var routes_path = __dirname + '/app/routes';
var walk = function(path) {
    fs.readdirSync(path).forEach(function(file) {
        var newPath = path + '/' + file;
        var stat = fs.statSync(newPath);
        if (stat.isFile()) {
            if (/(.*)\.(js$|coffee$)/.test(file)) {
                require(newPath)(app, passport);
            }
        // We skip the app/routes/middlewares directory as it is meant to be
        // used and shared by routes as further middlewares and is not a 
        // route by itself
        } else if (stat.isDirectory() && file !== 'middlewares') {
            walk(newPath);
        }
    });
};
walk(routes_path);


// Start the app by listening on <port>
var port = process.env.PORT || config.port;
app.listen(port);
console.log('Express app started on port ' + port);

// Initializing logger
logger.init(app, passport, mongoose);

// Expose app
exports = module.exports = app;

'use strict';

// Utilize Lo-Dash utility library
var _ = require('lodash');

// Extend the base configuration in all.js with environment
// specific configuration
module.exports = _.extend(

    // This is the standard configuration.
    // GOTO: /config/env/all.js
    require(__dirname + '/../config/env/all.js'),

    // It is extended with the config for the current evironment.
    // GOTO: /config/env/development.js
    require(__dirname + '/../config/env/' + process.env.NODE_ENV + '.js') || {}
);

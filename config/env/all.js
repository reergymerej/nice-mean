'use strict';

var path = require('path');
var rootPath = path.normalize(__dirname + '/../..');

// This is the standard config for the app.
// It is extended by the config for the current
// environment (dev, production, test).
module.exports = {
	root: rootPath,
	port: process.env.PORT || 3000,
	db: process.env.MONGOHQ_URL,

    // This is responsible for handling our templates.
	templateEngine: 'swig',

	// The secret should be set to a non-guessable string that
	// is used to compute a session hash
	sessionSecret: 'MEAN',
	// The name of the MongoDB collection to store sessions in
	sessionCollection: 'sessions'
};

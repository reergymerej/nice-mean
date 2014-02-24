'use strict';

module.exports = function(app) {
    
    // Home route
    // Load the index controller.
    var index = require('../controllers/index');

    // When the '/' path is requested,
    // execute the "render" method of the index controller.
    // GOTO: /app/controllers/index:render
    // REF: http://expressjs.com/api.html#app.get
    app.get('/', index.render);

};

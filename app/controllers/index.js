'use strict';

exports.render = function(req, res) {

    // Render the index view - /app/views/index.html
    // The path and extension are not necessary - they 
    // must be defined elsewhere.
    // GOTO: /app/views/index.html
    // REF: http://expressjs.com/api.html#res.render
    res.render('index', {
        user: req.user ? JSON.stringify(req.user) : 'null'
    });
};

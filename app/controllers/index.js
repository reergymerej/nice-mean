'use strict';

exports.render = function(req, res) {

    // Render the index view - /app/views/index.html
    // The path and extension are not necessary; they 
    // are defined  in /config/express.js.
    // GOTO: /app/views/index.html
    // REF: http://expressjs.com/api.html#res.render
    res.render('index', {

        // If we've authenticated, Passport added "user"
        // to the request.
        // REF: http://passportjs.org/guide/authenticate/
        // If that's the case, include the user in the template.
        user: req.user ? JSON.stringify(req.user) : 'null'
    });
};

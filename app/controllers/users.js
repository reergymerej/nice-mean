'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),

    // Get an instance of the User model.
    // The model was defined in /app/models/user.js.
    User = mongoose.model('User');

/**
 * Auth callback
 */
exports.authCallback = function(req, res) {
    res.redirect('/');
};

/**
 * Show login form
 */
exports.signin = function(req, res) {

    // Render the template /app/views/users/signin.html.
    // We don't need to specify the directory or the extension
    // because that is handled in the Express setup in /config/express.js
    // Pass the title and message to the template.
    // GOTO: /app/views/users/signin.html
    res.render('users/signin', {
        title: 'Signin',

        // "flash" is added to requests by connect-flash
        // REF: https://github.com/jaredhanson/connect-flash
        message: req.flash('error')
    });
};

/**
 * Show sign up form
 */
exports.signup = function(req, res) {

    // Render /app/views/users/signup.html.
    // Load with the title and an instance of User.
    // User is a Mongoose model.
    // REF: http://mongoosejs.com/docs/models.html
    // 
    // User was included at the top of this module.
    // It has custom methods including validation.
    // These values will be passed to the view renderer.
    // GOTO: /app/views/users/signup.html
    res.render('users/signup', {
        title: 'Sign up',
        user: new User(),
        funky: 'chicken'
    });
};

/**
 * Logout
 */
exports.signout = function(req, res) {

    // logout is added to the request by Passport.
    // REF: http://passportjs.org/guide/logout/
    req.logout();

    // GOTO: /app/routes/index.js (GET /)
    res.redirect('/');
};

/**
 * Session
 */
// This is called when logging in successfully.
exports.session = function(req, res) {

    // This renders the home page, just like before,
    // but this time we're logged in.
    // GOTO: /app/routes/index.js (GET /)
    res.redirect('/');
};

/**
 * Create user
 */
// This method is triggered when the signup form is submitted.
exports.create = function(req, res, next) {

    // A new User is created, loaded with the data
    // from the request.  With POST requests, the data
    // is in req.body.
    // REF: http://expressjs.com/api.html#req.body
    var user = new User(req.body);
    var message = null;

    user.provider = 'local';

    // Attempt to save the new User instance.
    user.save(function(err) {
        if (err) {

            // REF: http://www.mongodb.org/about/contributors/error-codes/
            switch (err.code) {
                case 11000:
                case 11001:
                    message = 'Username already exists';
                    break;
                default:
                    message = 'Please fill all the required fields';
            }

            // Re-render the signup page, passing our User instance
            // and error message to the template.
            // GOTO: /app/routes/users.js
            return res.render('users/signup', {
                message: message,
                user: user
            });
        }

        // Log the user in using the Passport middleware.
        // REF: http://passportjs.org/guide/login/
        req.logIn(user, function(err) {
            if (err) return next(err);

            // Passport makes the user available through req.user.
            // Now that we're logged in, go to the / path.
            // REF: http://expressjs.com/api.html#res.redirect
            // GOTO: /app/routes/index.js
            return res.redirect('/');
        });
    });
};

/**
 * Send User
 */
// This appears to be just for testing purposes.
// You can see the current user with http://localhost:3000/users/me.
exports.me = function(req, res) {
    // "user" is provided by Passport.
    // REF: http://passportjs.org/guide/login/
    res.jsonp(req.user || null);
};

/**
 * Find user by id
 */
// QUESTION: Where is this used?
exports.user = function(req, res, next, id) {

    console.log('hello');
    // QUESTION: What's using this?
    User
        .findOne({
            _id: id
        })
        .exec(function(err, user) {
            if (err) return next(err);
            if (!user) return next(new Error('Failed to load User ' + id));
            req.profile = user;
            next();
        });
};
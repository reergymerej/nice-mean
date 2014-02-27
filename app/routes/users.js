'use strict';

// User routes use users controller
// The users controller is in /app/controllers/users.js.
var users = require('../controllers/users');

module.exports = function(app, passport) {

    // The http method and path determine which method is executed.
    

    // Execute the "signin" method of the users controller.
    // GOTO: /app/controllers/users.js:signin
    app.get('/signin', users.signin);

    // Execute the signup method of the users controller.
    // GOTO: /app/controllers/users.js:signup
    app.get('/signup', users.signup);

    // GOTO: /app/controllers/users.js:signout
    app.get('/signout', users.signout);

    // QUESTION: When is this used?
    app.get('/users/me', users.me);

    // Setting up the users api
    // This route is triggered by submitting the signup form.
    // The "create" method of the users controller is called.
    // GOTO: /app/controllers/users.js:create
    app.post('/users', users.create);

    // Setting up the userId param
    // "param" allows you to inject logic when a parameter
    // is present in a request.
    // REF: http://expressjs.com/api.html#app.param
    // 
    // // This route has a :bar param.
    // app.get('/foo/:bar', function (req, res) {
    //     res.end('Was :bar "asdf"? ' + req.message);
    // });
    // 
    // // If the :bar param is present in the route,
    // // we get the chance to do work before the route's
    // // callback is executed.
    // app.param(':bar', function (req, res, next, id) {
    //     req.message = id === 'asdf';
    //     next();
    // });
    // 
    // Try out different values to see the result.
    // http://localhost:3000/foo/qwerty
    // 
    // All that aside, I can't figure out where this is being used.
    app.param('userId', users.user);


    // Setting the local strategy route
    // This is called when logging in.  Use Passport to authenticate.
    // REF: http://passportjs.org/guide/authenticate/
    app.post('/users/session', passport.authenticate('local', {

        // GOTO: [this file] (GET /signin)
        failureRedirect: '/signin',
        failureFlash: true

        // This is the handler for a successful login.
        // GOTO: /app/controllers/users.js:session
    }), users.session);

    // Setting the facebook oauth routes
    app.get('/auth/facebook', passport.authenticate('facebook', {
        scope: ['email', 'user_about_me'],
        failureRedirect: '/signin'
    }), users.signin);

    app.get('/auth/facebook/callback', passport.authenticate('facebook', {
        failureRedirect: '/signin'
    }), users.authCallback);

    // Setting the github oauth routes
    app.get('/auth/github', passport.authenticate('github', {
        failureRedirect: '/signin'
    }), users.signin);

    app.get('/auth/github/callback', passport.authenticate('github', {
        failureRedirect: '/signin'
    }), users.authCallback);

    // Setting the twitter oauth routes
    app.get('/auth/twitter', passport.authenticate('twitter', {
        failureRedirect: '/signin'
    }), users.signin);

    app.get('/auth/twitter/callback', passport.authenticate('twitter', {
        failureRedirect: '/signin'
    }), users.authCallback);

    // Setting the google oauth routes
    app.get('/auth/google', passport.authenticate('google', {
        failureRedirect: '/signin',
        scope: [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email'
        ]
    }), users.signin);

    app.get('/auth/google/callback', passport.authenticate('google', {
        failureRedirect: '/signin'
    }), users.authCallback);

    // Setting the linkedin oauth routes
    app.get('/auth/linkedin', passport.authenticate('linkedin', {
        failureRedirect: '/signin',
        scope: [ 'r_emailaddress' ]
    }), users.signin);

    app.get('/auth/linkedin/callback', passport.authenticate('linkedin', {
        failureRedirect: '/siginin'
    }), users.authCallback);

};

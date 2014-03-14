'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Article = mongoose.model('Article');

//Globals
var user;
var article;

//The tests
describe('<Unit Test>', function() {
    describe('Model Article:', function() {

        // Before each test, create a new user and
        // save it.  We need this because the article
        // requires an associated user.  This happens
        // before each "it" function.
        beforeEach(function(done) {

            user = new User({
                name: 'Full name',
                email: 'test@test.com',
                username: 'user',
                password: 'password'
            });

            user.save(function() {
                article = new Article({
                    title: 'Article Title',
                    content: 'Article Content',
                    user: user
                });

                done();
            });
        });

        describe('Method Save', function() {
            it('should be able to save without problems', function(done) {
                return article.save(function(err) {
                    // This notation is kind of weird.  Typically, you'd
                    // use err.should.not.exist.  The assertions work
                    // because "should" has been added to the Object prototype.
                    // If the object doesn't exist (or was created with Object.create(null))
                    // the assertions are undefined and the test fails in a way
                    // that was unexpected.
                    // REF: https://github.com/visionmedia/should.js/#chaining-assertions
                    should.not.exist(err);
                    done();
                });
            });

            it('should be able to show an error when try to save without title', function(done) {
                article.title = '';

                return article.save(function(err) {
                    should.exist(err);
                    done();
                });
            });
        });

        // This runs after each test.
        // It appears to errantly remove ALL
        // of the articles and users.
        afterEach(function(done) {
            Article.remove({});
            User.remove({});
            done();
        });
        after(function(done) {
            // QUESTION: What's with the exec?
            // It looks like you can do remove(fn) or remove().exec
            // to differentiate between async/sync processes.
            // We'll learn more about this when we brush up
            // on MongoDB.
            // REF: http://stackoverflow.com/a/10266789/1319850
            Article.remove().exec();
            User.remove().exec();
            done();
        });
    });
});
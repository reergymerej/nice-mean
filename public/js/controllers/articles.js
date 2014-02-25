'use strict';

// This controller is defined in the 'mean.articles' module.
// $scope       This is created for each directive.
// $stateParams This comes from AngularUI Router.
// $location    http://docs.angularjs.org/guide/dev_guide.services.$location
// Global       /public/js/services/global.js
// Articles     /public/js/services/articles.js
angular.module('mean.articles').controller('ArticlesController', ['$scope', '$stateParams', '$location', 'Global', 'Articles', function ($scope, $stateParams, $location, Global, Articles) {
    $scope.global = Global;

    $scope.create = function() {
        var article = new Articles({
            title: this.title,
            content: this.content
        });
        article.$save(function(response) {
            $location.path('articles/' + response._id);
        });

        this.title = '';
        this.content = '';
    };

    $scope.remove = function(article) {
        if (article) {
            article.$remove();

            for (var i in $scope.articles) {
                if ($scope.articles[i] === article) {
                    $scope.articles.splice(i, 1);
                }
            }
        }
        else {
            $scope.article.$remove();
            $location.path('articles');
        }
    };

    $scope.update = function() {
        var article = $scope.article;
        if (!article.updated) {
            article.updated = [];
        }
        article.updated.push(new Date().getTime());

        article.$update(function() {
            $location.path('articles/' + article._id);
        });
    };

    // This finds all the articles.
    $scope.find = function() {

        // Articles is a service injected into this controller.
        // "query" gets all the $resources as an array.
        Articles.query(function(articles) {

            // Once the call is complete, the articles
            // are assigned to the controller's scope.
            $scope.articles = articles;
        });
    };

    // This finds a specific article by id.
    $scope.findOne = function() {

        // Use our Articles service.
        // "get" appears to be used instead of "query"
        // for fetching a specific record.
        Articles.get({

            // Specify the "articleId" the resource should use.
            // Pull the value from $stateParams.  The $stateParams
            // value was set when the route was handled (/public/js/config.js).
            // GOTO: /public/js/services/articles.js
            articleId: $stateParams.articleId
        }, function(article) {
            $scope.article = article;
        });
    };
}]);
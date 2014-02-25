'use strict';

//Setting up route
// Routes are specified here as part of the 'mean' module (/public/js/app.js)
// $stateProvider and $urlRouterProvider are from AngularUI Router (/app/views/includes/foot.hml)
// REF: https://github.com/angular-ui/ui-router
angular.module('mean').config(['$stateProvider', '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
    // For unmatched routes:
    $urlRouterProvider.otherwise('/');

    // states for my app
    $stateProvider

      // QUESTION: How are the states used?
      .state('all articles', {
        url: '/articles',

        // When the url is matched, render the template.
        // GOTO: /public/views/articles/list.html
        templateUrl: 'views/articles/list.html'
    })
      .state('create article', {
        url: '/articles/create',
        templateUrl: 'views/articles/create.html'
    })
      .state('edit article', {
        url: '/articles/:articleId/edit',
        templateUrl: 'views/articles/edit.html'
    })

      // This is called when viewing an article.
      .state('article by id', {

        // This makes the value after "/articles/" in the url
        // available as "articleId" in the $stateParams.
        url: '/articles/:articleId',

        // GOTO: /public/views/articles/view.html
        templateUrl: 'views/articles/view.html'
    })
      .state('home', {
        url: '/',
        templateUrl: 'views/index.html'
    });
}
]);

//Setting HTML5 Location Mode
angular.module('mean').config(['$locationProvider',
  function($locationProvider) {
    $locationProvider.hashPrefix('!');
}
]);

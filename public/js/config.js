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

      // The states aren't used anywhere, but they could be.
      // Using state allows for routing by url or a named state 
      // (see the "go" method in the docs).
      // REF: http://angular-ui.github.io/ui-router/site/#/api/ui.router.state.$state
      .state('all articles', {
        url: '/articles',

        // When the url is matched, render the template.
        // GOTO: /public/views/articles/list.html
        templateUrl: 'views/articles/list.html'
    })
      .state('create article', {
        url: '/articles/create',
        // GOTO: /public/views/articles/create.html
        templateUrl: 'views/articles/create.html'
    })
      .state('edit article', {
        url: '/articles/:articleId/edit',

        // GOTO: /public/views/articles/edit.html
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

      // This is the default when no other routes were matched.
      .state('home', {
        url: '/',

        // GOTO: /public/views/index.html
        templateUrl: 'views/index.html'
    });
}
]);

//Setting HTML5 Location Mode
angular.module('mean').config(['$locationProvider',
  function($locationProvider) {
    // QUESTION: Why would you do this?
    $locationProvider.hashPrefix('!');
}
]);

'use strict';

// If jQuery is around, "element" uses that, otherwise, jqLite is used.
// REF: http://docs.angularjs.org/api/ng/function/angular.element
angular.element(document).ready(function() {
    //Fixing facebook bug with redirect
    if (window.location.hash === '#_=_') window.location.hash = '#!';

    //Then init the app
    // Start up Angular using the document as its root,
    // injected with the 'mean' module (/public/js/app.js).
    // REF: http://docs.angularjs.org/guide/bootstrap
    angular.bootstrap(document, ['mean']);
});
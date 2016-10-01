'use strict';

var app = angular.module('myApp', ['ui.router', 'ngMessages', 'ui.codemirror']);

app.run(function ($rootScope, $window) {
  $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
    console.error('Error transitioning from "' + fromState.name + '" to "' + toState.name + '":', error);
  });

  $rootScope.goBack = function () {
    $window.history.back()
  };

});

// app.constant('_', window._);

// app.run(function ($rootScope) {
//     $rootScope._ = window._;
// });

// app.factory('_', function($window) {
//     // place lodash include before angular
//     return $window._;
//   }
// );

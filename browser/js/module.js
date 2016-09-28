
'use strict';

var app = angular.module('myApp', ['ui.router', 'ngMessages']);

app.run(function ($rootScope, $window) {
  $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
    console.error('Error transitioning from "' + fromState.name + '" to "' + toState.name + '":', error);
  });

  $rootScope.goBack = function () {
    $window.history.back()
  };

});

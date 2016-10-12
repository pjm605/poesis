'use strict';

var app = angular.module('myApp', ['ui.router', 'ngMessages']);

app.config(function ($locationProvider, $urlRouterProvider) {
 $urlRouterProvider.otherwise('/poesis');
});
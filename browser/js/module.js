'use strict';

var app = angular.module('myApp', ['ui.router', 'ngMessages', 'ngclipboard']);

app.config(function ($locationProvider, $urlRouterProvider) {
	$locationProvider.html5Mode(true);
	$urlRouterProvider.otherwise('/poesis');
});

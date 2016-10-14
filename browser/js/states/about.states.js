app.config(function ($stateProvider, $locationProvider) {
	$stateProvider.state('about', {
		url: '/about',
	    templateUrl: 'about.html',
	    controller: 'AnimationCtrl'
	});

});

app.config(function ($stateProvider, $locationProvider) {
	$stateProvider.state('team', {
		url: '/team',
	    templateUrl: 'team.html',
	    controller: 'AnimationCtrl'
	});

});

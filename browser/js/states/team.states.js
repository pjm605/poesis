app.config(function ($stateProvider) {
	$stateProvider.state('team', {
		url: '/team',
	    templateUrl: 'team.html',
	    controller: 'AnimationCtrl'
	})
})
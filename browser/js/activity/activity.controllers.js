app.controller('ActivityCtrl', function ($scope, MainFactory, $log, $state, $stateParams) {

  $scope.location = $stateParams.location
  MainFactory.getStops( $scope.location )
  .then(function (activities) {

  	if(activities.data.activities === undefined) $scope.isAvaiable === true;
  	else {
  		$scope.isAvaiable === false;
  		for (var i = 0; i < activities.data.activities.length; i++)
	  	{
	  		var act = activities.data.activities[i];
	  		var name = act.title;
	  		name = name.replace(/[^A-Za-z\d]+/g, '-').toLowerCase()
	  		act["linkTo"] = "https://www.expedia.com/things-to-do/" + name + ".a" + act.id + ".activity-details";
	  	}
	    $scope.activities = activities.data.activities
      console.log($scope.activities)
  	}
  	
  		
  
  	
  })
  .catch($log.error)


})
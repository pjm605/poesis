app.config(function ($stateProvider) {

  $stateProvider.state('activity', {
    url: '/activity/:location',
    templateUrl: '/js/activity/activity.html',
    controller: 'ActivityCtrl'
  });

});

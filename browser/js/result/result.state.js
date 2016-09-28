app.config(function ($stateProvider) {

  $stateProvider.state('result', {
    url: '/result/:from/:to',
    templateUrl: '/js/result/result.html',
    resolve: {
      results: function ($stateParams, MainFactory) {
        return MainFactory.getResult($stateParams.from, $stateParams.to)
      }
    },
    controller: 'ResultCtrl'
  });

});
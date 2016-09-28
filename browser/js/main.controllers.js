app.controller('MainCtrl', function($scope, MainFactory, $log, $state) {
  
  $scope.options = {
    types: ['(cities)'],
    componentRestrictions: { country: 'FR' }
  };
  
  $scope.search = function (from, to) {
    var cFrom = from.split(",")[0]
    var cTo = to.split(",")[0]

    $scope.cFrom = cFrom;
    $scope.cTo = cTo;
    $state.go('result', {from: cFrom, to: cTo})
   
  };
  
});
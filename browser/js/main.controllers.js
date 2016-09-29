app.controller('MainCtrl', function($scope) {
  //console.log(input);
  // $scope.parent;
  $scope.onSpace = function ($event) {
    console.log("on space event triggered");
    console.log(input);
  }
});

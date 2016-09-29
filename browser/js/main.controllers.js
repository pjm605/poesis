app.controller('MainCtrl', function($scope) {
  //console.log(input);
  $scope.poem = {line: 0, word: ""};
  $scope.onSpace = function ($event) {
    console.log("on space event triggered");
    console.log($scope.poem.input);
  }
  $scope.onEnter = function ($event) {
    console.log("onEnter event triggered");
  }
  $scope.updateWord = function () {
    
  }
});

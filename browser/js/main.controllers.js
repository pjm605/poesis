app.controller('MainCtrl', function($scope, $log, DictionaryFactory, PhonemeFactory, SoundcountFactory) {
  $scope.poem = {line: 0, word: ""};
  $scope.onSpace = function ($event) {
    console.log("on space event triggered");
    console.log($scope.poem.input);
  };
  $scope.onEnter = function ($event) {
    console.log("onEnter event triggered");
  };
  $scope.updateWord = function () {
    
  };

  DictionaryFactory.getDictionary()
  .then(function (dictionary) {
    $scope.dictionary = dictionary;
  }).catch($log.error);
  
});
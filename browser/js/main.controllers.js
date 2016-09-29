app.controller('MainCtrl', function($scope, $log, DictionaryFactory, PhonemeFactory, SoundcountFactory) {
  $scope.poem = {line: 0, word: ""};
  $scope.lineEnd = false;

  $scope.onSpace = function ($event) {
    console.log("on space event triggered");
    var words = $scope.poem.input.split(' ');
    $scope.poem.word = words[words.length-1];
    console.log($scope.poem.word);
    $scope.lineEnd = false;
  };

  $scope.onEnter = function ($event) {
    console.log("onEnter event triggered");
    $scope.lineEnd = true;
    // do anything line-dependent here?
    $scope.onSpace();
  };

  DictionaryFactory.getDictionary()
  .then(function (dictionary) {
    $scope.dictionary = dictionary;
  }).catch($log.error);
  
});


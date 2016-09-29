app.controller('MainCtrl', function($scope, $log, parse, soundsFactory) {
  $scope.poem = {line: 0, word: ""};
  $scope.lineEnd = false;

  $scope.onSpace = function ($event) {
    console.log("on space event triggered");

    var words = $scope.poem.input.split(' ');
    $scope.poem.word = words[words.length-1];
    var wordSounds = parse($scope.poem.word).then(function (p) {
      return p;
    })

    wordSounds.then(function (sounds) {
      console.log(soundsFactory.countSounds(sounds));
    })

    $scope.lineEnd = false;
  }
  $scope.onEnter = function ($event) {
    console.log("onEnter event triggered");
    $scope.lineEnd = true;
    // do anything line-dependent here?
    $scope.onSpace();
  }
});

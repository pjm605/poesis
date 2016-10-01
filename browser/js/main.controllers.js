app.controller('MainCtrl', function($scope, $document, $log, parse, soundsFactory, soundToLetter) {
  $scope.poem = {line: 0, word: ""};
  $scope.lineEnd = false;

  // console.log(CodeMirror);
  //var textar = angular.element($document[0].querySelector('#poemarea'));
  var textar = document.getElementById('poemarea');
  //console.log(textar);
  $scope.colorrules = soundToLetter('AH', 'D');
  console.log($scope.colorrules);

  var cm = CodeMirror.fromTextArea(textar, {
    mode: {
      name: "lettermode",
      colorrules: $scope.colorrules
    },
    theme: "fontcolor"
  });

  // $scope.onSpace = function ($event) {
  //   //this should parse the *whole* poem that has been written
  //   //not just the most recent word
  //   //and save it as an array of word parses
  //   //which will be the argument for countSounds
  //   console.log("on space event triggered");
  //   var words = $scope.poem.input.split(' ');
  //   $scope.poem.word = words[words.length-1];
  //   var wordSounds = parse($scope.poem.word).then(function (p) {
  //     console.log($scope.poem.word )
  //     return p;
  //   });
  //   wordSounds.then(function (sounds) {
  //     console.log(soundsFactory.countSounds(sounds));
  //   });
  //
  //   $scope.lineEnd = false;
  // }
  // $scope.onEnter = function ($event) {
  //   console.log("onEnter event triggered");
  //   $scope.lineEnd = true;
  //   // do anything line-dependent here?
  //   $scope.onSpace();
  // }

  //every time the user types a letter, it adds to $scope.text.
  // console.log $scope.text when the user stops typing for more than 2 seconds.
  $scope.text = "";

  var debounced = _.debounce(function(cm, obj) {
    console.log('obj.text', $scope.text);
    //could pass in the updated $scope.text to a function here after the user stops typing.
  }, 2000);

  var beforeDebounced = function(cm, obj){
    $scope.text += obj.text;
    debounced();
  }

  cm.on('change', beforeDebounced);
});

app.controller('MainCtrl', function($scope, $document, $log, parse, soundFactory, soundToLetter) {
  $scope.poem = {line: 0, word: ''};
  $scope.lineEnd = false;

  var textar = document.getElementById('poemarea');
  //console.log(textar);
  $scope.colorrules = soundToLetter(['AH', 'D']);
  console.log($scope.colorrules);

  var cm = CodeMirror.fromTextArea(textar, {
    mode: {
      name: 'lettermode',
      colorrules: $scope.colorrules
    },
    theme: 'fontcolor'
  });

  //every time the user types a letter, it adds to $scope.text.
  // console.log $scope.text when the user stops typing for more than 2 seconds.
  $scope.text = '';

  var debounced = _.debounce(function(cm, obj) {
    console.log('obj.text', $scope.text);
    var words = $scope.text.split(' ');
    var parsedWords = [];
    // promise.all or whatever shit
    for (var w = 0; w < words.length; w++) {
      parsedWords.push(parse(words[w]));
    }
    Promise.all(parsedWords).then(function (parseArray) {
      console.log(soundFactory.identifySignificant(parseArray));
    });

    //could pass in the updated $scope.text to a function here after the user stops typing.
  }, 2000);

  var beforeDebounced = function(cm, obj){
    $scope.text += obj.text;
    debounced();
  }

  cm.on('change', beforeDebounced);
});

app.controller('MainCtrl', function($scope, $document, $log, parse, soundFactory, soundToLetter) {
  $scope.poem = {line: 0, word: ''};
  $scope.lineEnd = false;

  var textar = document.getElementById('poemarea');
  //console.log(textar);

  var cm = CodeMirror.fromTextArea(textar, {
    mode: {
      name: 'lettermode',
      colorrules: ['i']
    },
    theme: 'fontcolor'
  });

  $scope.text = "";
  var debounced = _.debounce(function(codeMirror, obj) {
    $scope.text = cm.getValue();
    //$scope.text gets updated when the user stops typing for more than 2 seconds.
    console.log('$scope.text', $scope.text);
    //could pass in the updated $scope.text to a function here
    var words = $scope.text.split(' ');
    var parsedWords = [];
    // promise.all or whatever shit
    for (var w = 0; w < words.length; w++) {
      parsedWords.push(parse(words[w]));
    }
    Promise.all(parsedWords).then(function (parseArray) {
      var sig = soundFactory.identifySignificant(parseArray);
    });
  }, 2000);

  cm.on('change', debounced);
});

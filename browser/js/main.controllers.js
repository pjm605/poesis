app.controller('MainCtrl', function($scope, $document, $log, soundFactory, lexicon, parse) {
  $scope.poem = {line: 0, word: ''};
  $scope.lineEnd = false;

  var textar = document.getElementById('poemarea');

  var cm = CodeMirror.fromTextArea(textar, {
    mode: {
      name: 'soundMode',
      consonantRules: [],
      vowelLocations: []
    },
    theme: 'fontcolor',
    lineWrapping: 'true'
  });

  $scope.text = '';
  var debounced = _.debounce(function(codeMirror) {
    $scope.text = cm.getValue();
    //$scope.text gets updated when the user stops typing for more than 2 seconds.
    console.log('$scope.text', $scope.text);
    //could pass in the updated $scope.text to a function here

    var pounded = $scope.text.replace(/\n/g, ' # ');
    var words = pounded.replace(/-/g, ' ').split(' ');
    // var words = $scope.text.replace(/ /g, '\n');
    var parsedWords = [];
    var hapaxWords = [];
    var fromLexicon = null;
    for (var idx = 0; idx < words.length; idx++) {
      parsedWords.push(parse(words[idx]));
    }

    Promise.all(parsedWords).then(function (parseArray) {
      for (var i = 0; i < parseArray.length; i ++) {
        if (parseArray[i][0] === '@') {
          hapaxWords.push(parseArray[i].slice(1));
        }
      }
      console.log('Not in the dictionary: hapaxWords', hapaxWords);
      if (hapaxWords.length > 0) {
        hapaxWords = hapaxWords.join('\n');
        lexicon(hapaxWords)
        .then(function(lexiconParseArray) {
          fromLexicon = lexiconParseArray;
          for(var i = 0; i < parseArray.length; i ++) {
            if (parseArray[i][0] === '@') {
              parseArray[i] = fromLexicon.shift();
            }
          }
          soundFactory.main(parseArray, cm);
        }).catch(function (err) {
          console.error('error', err);
        });

      } else {
        console.log(parseArray);
        soundFactory.main(parseArray, cm);
      }
    });
  }, 1000);
  cm.on('change', debounced);
});

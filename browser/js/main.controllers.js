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

    var words = $scope.text.replace(/-/g, ' ').split(' ');
    // var words = $scope.text.replace(/ /g, '\n');
    var parsedWords = [];
    var hapaxWords = [];
    var fromLexicon = null;
    for (var w = 0; w < words.length; w++) {
      parsedWords.push(parse(words[w]));
    }

    Promise.all(parsedWords).then(function (parseArray) {
      for(var i = 0; i < parseArray.length; i ++) {
        if (parseArray[i] === 'hapax') {
          hapaxWords.push(parseArray[i]);
        }
      }

      console.log('hapaxWords', hapaxWords);

      if (hapaxWords.length > 0) {
        hapaxWords = hapaxWords.join('\n');
        lexicon(hapaxWords)
        .then(function(lexiconParseArray) {
          console.log('!!!!!!!!!', lexiconParseArray);
          fromLexicon = lexiconParseArray;
          console.log('fromLexicon', fromLexicon);
          for(var i = 0; i < parseArray.length; i ++) {
            console.log('is it here?', fromLexicon[0]);
            if (parseArray[i] === 'hapax') {
              parseArray[i] =  fromLexicon[0];
              fromLexicon.shift();
            }
          }
          console.log('going into the soundFactory-number111111111111');
        soundFactory.main(parseArray, cm);

        }).catch(function (err) {
          console.error('error', err);
        });
        
      } else {
        console.log('going into the soundFactory-number22222222222');
        soundFactory.main(parseArray, cm);
      }
    });

  }, 1000);

  cm.on('change', debounced);
});

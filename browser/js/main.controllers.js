app.controller('MainCtrl', function ($scope, rhymeToken, soundToken, $document, lines, $log, soundFactory, lexicon, parse, rhymeFactory) {
  $scope.poem = {line: 0, word: ''};
  $scope.lineEnd = false;

  var textar = document.getElementById('poemarea');

  var cm = CodeMirror.fromTextArea(textar, {
    mode: {
      name: 'mainMode',
      consonantRules: [],
      vowelLocations: [],
      rhymeLocations: [],
      token: rhymeToken
    },
    theme: 'fontcolor',
    lineWrapping: 'true'
  });

  $scope.text = '';
  var debounced = _.debounce(function (codeMirror) {
    $scope.text = cm.getValue();
    //$scope.text gets updated when the user stops typing for more than 2 seconds.
    console.log('$scope.text', $scope.text);

    var pounded = $scope.text.replace(/\n/g, ' qzqz ').toLowerCase();
    pounded = pounded.trim(); //strip whitespace at the end
    var words = pounded.replace(/-/g, ' ').replace(/[^a-z'\s]+/gi, '').split(' ')
    .filter(function (word) {
      return word !== '';
    })
    console.log('words', words);

    var parsedWords = [];
    var hapaxWords = [];
    var fromLexicon = null;
    for (var idx = 0; idx < words.length; idx++) {
      parsedWords.push(parse(words[idx]));
    }
    console.log('parsedWords');
    Promise.all(parsedWords).then(function (parseArray) {
      for (var i = 0; i < parseArray.length; i++) {
        if (parseArray[i][0] === '@') {
          hapaxWords.push(parseArray[i].slice(1));
        }
      }
      console.log('Not in the dictionary: hapaxWords', hapaxWords);
      if (hapaxWords.length > 0) {
        hapaxWords = hapaxWords.join('\n');
        return lexicon(hapaxWords)
        .then(function(lexiconParseArray) {
          fromLexicon = lexiconParseArray;
          for (var j = 0; j < parseArray.length; j++) {
            if (parseArray[j][0] === '@') {
              parseArray[j] = fromLexicon.shift();
            }
          }
          console.log('parseArray', parseArray);
          var lineArray =  lines(parseArray);
          // soundFactory.main(parseArray, cm);
          rhymeFactory.getTheResult(lineArray, cm);
        });

      } else {
        console.log('parseArray', parseArray);
        var lineArray =  lines(parseArray);
        // soundFactory.main(parseArray, cm);
        rhymeFactory.main(lineArray, cm);
      }

    })
    .catch(function (err) {
      console.error('error', err);
    });
  }, 1000);
  cm.on('change', debounced);
});

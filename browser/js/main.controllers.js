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
    var fromLexicon;
    for (var w = 0; w < words.length; w++) {
      parsedWords.push(parse(words[w]));
    }
    console.log('parsedWords', parsedWords);

    Promise.all(parsedWords).then(function (parseArray) {
      for(var i = 0; i < parseArray.length; i ++) {
        if (parseArray[i] === 'hapax') {
          hapaxWords.push(parseArray[i]);
        }
      }
      hapaxWords = hapaxWords.join('\n');
      console.log('hapaxWords', hapaxWords);

      lexicon(hapaxWords)
      .then(function(lexiconParseArray) {
        fromLexicon = lexiconParseArray;
        console.log('fromLexicon', fromLexicon);
      });

      for(var i = 0; i < parsedWords.length; i ++) {
        if (parsedWords[i] === fromLexicon[0]) {
          parsedWords[i] = fromLexicon.shift();
        }
      }
      
      soundFactory.main(parseArray, cm);
    });

  }, 1000);

  cm.on('change', debounced);
});

app.controller('MainCtrl', function ($scope, meterToken, meterFactory, rhymeToken, soundToken, $document, lines, $log, soundFactory, lexicon, parse, rhymeFactory, parseWordsFactory) {
  $scope.poem = {line: 0, word: ''};
  $scope.lineEnd = false;

  var textar = document.getElementById('poemarea');

  var cm = CodeMirror.fromTextArea(textar, {
    mode: {
      name: 'mainMode',
      consonantRules: [],
      vowelLocations: [],
      rhymeLocations: [],
      stresses: [],
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
    });
    console.log('words', words);

    parseWordsFactory(words)
    .then(function (response) {
      // soundFactory.main(response, cm);
      // rhymeFactory.main(lines(response), cm);
      // meterFactory.main(lines(response), cm);
      return rhymeFactory.main(lines(response), cm);
    });

  }, 1000);
  cm.on('change', debounced);
});
app.controller('MainCtrl', function ($scope, meterToken, meterFactory, rhymeToken, soundToken, $document, linesFactory, $log, soundFactory, lexiconFactory, parseFactory, rhymeFactory, parseWordsFactory, $window) {
  $window.animations.contentWayPoint();

  $scope.poem = {line: 0, word: ''};
  $scope.lineEnd = false;

  var textar = document.getElementById('poemarea');

  $scope.currentToken = soundToken; //default

  var cm = CodeMirror.fromTextArea(textar, {
    mode: {
      name: 'mainMode',
      consonantRules: [],
      vowelLocations: [],
      rhymeLocations: [],
      stresses: [],
      token: soundToken
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
      switch ($scope.currentToken) {
        case soundToken:
          return soundFactory.main(response, cm);
        case meterToken:
          return meterFactory.main(linesFactory.returnLines(response), cm);
        case rhymeToken:
          return rhymeFactory.main(linesFactory.returnLines(response), cm);
        default:
          return null;
      }
    });

  }, 1000);

  $scope.toggleToken = function(token){
    switch (token) {
      case 'soundToken':
        $scope.currentToken = soundToken;
        break;
      case 'meterToken':
        $scope.currentToken = meterToken;
        break;
      case 'rhymeToken':
        $scope.currentToken = rhymeToken;
        break;
      default:
        $scope.currentToken = soundToken;
    }
    cm.options.mode.token = $scope.currentToken;
    return debounced();
  }

  cm.on('change', debounced);
});

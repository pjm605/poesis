app.controller('MainCtrl', function ($scope, meterToken, nullToken, nullFactory, meterFactory, rhymeToken, soundToken, $document, linesFactory, $log, soundFactory, lexiconFactory, parseFactory, rhymeFactory, parseWordsFactory, $window) {
  $window.animations.contentWayPoint();

  $scope.poem = {line: 0, word: ''};
  $scope.lineEnd = false;
  $scope.meterName = 'Meter';

  var textar = document.getElementById('poemarea');

  $scope.currentToken = nullToken; //default

  var cm = CodeMirror.fromTextArea(textar, {
    mode: {
      name: 'mainMode',
      consonantRules: [],
      vowelLocations: [],
      rhymeLocations: [],
      stresses: [],
      token: $scope.currentToken
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
    var words = pounded.replace(/[^a-z'\s]+/gi, '').split(' ')
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
        case nullToken:
          return nullFactory.main(linesFactory.returnLines(response), cm);
      }
    })
    .then( function (meterName) {
      if (meterName) {
        $scope.meterName = meterName;
        $scope.$digest();
      }
      else $scope.meterName = "Meter";
    });

  }, 1000);

//this probably does not need a switch statement
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
      case 'nullToken':
        $scope.currentToken = nullToken;
        break;
      default:
        $scope.currentToken = soundToken;
    }
    cm.options.mode.token = $scope.currentToken;
    return debounced();
  }

  cm.on('change', debounced);
});

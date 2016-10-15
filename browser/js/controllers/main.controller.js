app.controller('MainCtrl', function ($scope, meterToken, nullToken, nullFactory, meterFactory, rhymeToken, soundToken, $document, linesFactory, $log, soundFactory, lexiconFactory, parseFactory, rhymeFactory, parseWordsFactory, $window) {
  $window.animations.contentWayPoint();

  $scope.poem = {line: 0, word: ''};
  $scope.lineEnd = false;
  $scope.meterName = 'Meter';
  $scope.descr = '';

  var textar = document.getElementById('poemarea');

  new Clipboard('.savebtn');

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

    var pounded = $scope.text.replace(/\n/g, ' qzqz ').toLowerCase();
    pounded = pounded.trim(); //strip whitespace at the end
    var words = pounded.replace(/[^a-z'\s]+/gi, '').split(' ')
    .filter(function (word) {
      return word !== '';
    });

    parseWordsFactory(words)
    .then(function (response) {
      switch ($scope.currentToken) {
        case soundToken:
          $scope.descr = "Colored sounds are significantly more frequent than they are in standard English prose";
          $scope.$digest();
          return soundFactory.main(response, cm);
        case meterToken:
          $scope.descr = "Matching colors indicate rhyming soundss";
          return meterFactory.main(linesFactory.returnLines(response), cm);
        case rhymeToken:
          $scope.descr = "Blue vowels are stressed - pink vowels are unstressed";
          return rhymeFactory.main(linesFactory.returnLines(response), cm);
        case nullToken:
          $scope.descr = "";
          return nullFactory.main(linesFactory.returnLines(response), cm);
      }
    })
    .then( function (meterName) {
      if (meterName) {
        $scope.meterName = meterName;
        $scope.$digest();
      }
      else $scope.meterName = "Meter";
      $scope.$digest();
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

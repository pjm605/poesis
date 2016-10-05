app.controller('MainCtrl', function($scope, $document, $log, soundFactory, lexicon) {
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
    var words = $scope.text.replace(/ /g, '\n');
    
    lexicon(words)
    .then(function(parseArray) {
      console.log('parseArray', parseArray);
      soundFactory.main(parseArray, cm);
    });

  }, 1000);

  cm.on('change', debounced);
});

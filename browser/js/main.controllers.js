app.controller('MainCtrl', function($scope, $document, $log, parse, soundsFactory, $interval) {
  $scope.poem = {line: 0, word: ""};
  $scope.lineEnd = false;
  $scope.textArea = null;

  // console.log(CodeMirror);
  //var textar = angular.element($document[0].querySelector('#poemarea'));
  var textar = document.getElementById('poemarea');
  // console.log(textar);
  var cm = CodeMirror.fromTextArea(textar, {
    mode: "lettermode",
    theme: "fontcolor"
  });

  // function showCode() {
  //   $scope.textArea = cm.getValue();
  //   // document.getElementById('poemarea').val($scope.textArea);
  //   var poemarea = angular.element(document.querySelector('#poemarea'));
  //   poemarea.text($scope.textArea);
  // }
  // $interval(showCode, 3000);
  $scope.text = "";

  var debounced = _.debounce(function(cm, obj) {
    console.log('obj.text', $scope.text);
  }, 2000);

  var beforeDebounced = function(cm, obj){
    $scope.text += obj.text;
    debounced();
  }

  cm.on('change', beforeDebounced);


  $scope.onSpace = function ($event) {
    console.log("on space event triggered");

    var words = $scope.poem.input.split(' ');
    $scope.poem.word = words[words.length-1];
    var wordSounds = parse($scope.poem.word).then(function (p) {
      console.log($scope.poem.word )
      return p;
    })

    wordSounds.then(function (sounds) {
      console.log(soundsFactory.countSounds(sounds));
    })

    $scope.lineEnd = false;
  }
  $scope.onEnter = function ($event) {
    console.log("onEnter event triggered");
    $scope.lineEnd = true;
    // do anything line-dependent here?
    $scope.onSpace();
  }
 
});

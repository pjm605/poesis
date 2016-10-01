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
  cm.on('change', function(cm, obj) {
    $scope.text += obj.text;
    // console.log('CodeMirror text', obj.text);
    // console.log('scope.text', $scope.text);
    var text = obj.text;
    var debounced = _.debounce(function(text) {
      console.log('obj.text', debounced);
    }, 5000);
    
  });


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

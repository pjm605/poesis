'use strict';

var app = angular.module('myApp', ['ui.router', 'ngMessages']);

app.run(function ($rootScope, $window) {
  $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
    console.error('Error transitioning from "' + fromState.name + '" to "' + toState.name + '":', error);
  });

  $rootScope.goBack = function () {
    $window.history.back();
  };
});

app.controller('MainCtrl', function ($scope) {
  $scope.poem = { line: 0, word: "" };
  $scope.lineEnd = false;

  $scope.onSpace = function ($event) {
    console.log("on space event triggered");
    var words = $scope.poem.input.split(' ');
    $scope.poem.word = words[words.length - 1];
    console.log($scope.poem.word);
    $scope.lineEnd = false;
  };
  $scope.onEnter = function ($event) {
    console.log("onEnter event triggered");
    $scope.lineEnd = true;
    // do anything line-dependent here?
    $scope.onSpace();
  };
});

app.factory('SoundcountFactory', function ($http) {

  return {
    getSoundcount: function getSoundcount(word) {
      var newWord = word.replace(/[^A-Za-z ]+/g, '');
      newWord = newWord.split(" ");

      var soundDic = {};

      for (var i = 0; i < newWord.length; i++) {
        if (soundDic.hasOwnProperty(newWord[i]) === false) soundDic[newWord[i]] = 1;else soundDic[newWord[i]] += 1;
      }

      return soundDic;
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZHVsZS5qcyIsIm1haW4uY29udHJvbGxlcnMuanMiLCJzb3VuZENvdW50LmZhY3RvcnkuanMiXSwibmFtZXMiOlsiYXBwIiwiYW5ndWxhciIsIm1vZHVsZSIsInJ1biIsIiRyb290U2NvcGUiLCIkd2luZG93IiwiJG9uIiwiZXZlbnQiLCJ0b1N0YXRlIiwidG9QYXJhbXMiLCJmcm9tU3RhdGUiLCJmcm9tUGFyYW1zIiwiZXJyb3IiLCJjb25zb2xlIiwibmFtZSIsImdvQmFjayIsImhpc3RvcnkiLCJiYWNrIiwiY29udHJvbGxlciIsIiRzY29wZSIsInBvZW0iLCJsaW5lIiwid29yZCIsImxpbmVFbmQiLCJvblNwYWNlIiwiJGV2ZW50IiwibG9nIiwid29yZHMiLCJpbnB1dCIsInNwbGl0IiwibGVuZ3RoIiwib25FbnRlciIsImZhY3RvcnkiLCIkaHR0cCIsImdldFNvdW5kY291bnQiLCJuZXdXb3JkIiwicmVwbGFjZSIsInNvdW5kRGljIiwiaSIsImhhc093blByb3BlcnR5Il0sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQSxJQUFBQSxNQUFBQyxRQUFBQyxNQUFBLENBQUEsT0FBQSxFQUFBLENBQUEsV0FBQSxFQUFBLFlBQUEsQ0FBQSxDQUFBOztBQUVBRixJQUFBRyxHQUFBLENBQUEsVUFBQUMsVUFBQSxFQUFBQyxPQUFBLEVBQUE7QUFDQUQsYUFBQUUsR0FBQSxDQUFBLG1CQUFBLEVBQUEsVUFBQUMsS0FBQSxFQUFBQyxPQUFBLEVBQUFDLFFBQUEsRUFBQUMsU0FBQSxFQUFBQyxVQUFBLEVBQUFDLEtBQUEsRUFBQTtBQUNBQyxZQUFBRCxLQUFBLENBQUEsK0JBQUFGLFVBQUFJLElBQUEsR0FBQSxRQUFBLEdBQUFOLFFBQUFNLElBQUEsR0FBQSxJQUFBLEVBQUFGLEtBQUE7QUFDQSxHQUZBOztBQUlBUixhQUFBVyxNQUFBLEdBQUEsWUFBQTtBQUNBVixZQUFBVyxPQUFBLENBQUFDLElBQUE7QUFDQSxHQUZBO0FBSUEsQ0FUQTs7QUNKQWpCLElBQUFrQixVQUFBLENBQUEsVUFBQSxFQUFBLFVBQUFDLE1BQUEsRUFBQTtBQUNBQSxTQUFBQyxJQUFBLEdBQUEsRUFBQUMsTUFBQSxDQUFBLEVBQUFDLE1BQUEsRUFBQSxFQUFBO0FBQ0FILFNBQUFJLE9BQUEsR0FBQSxLQUFBOztBQUVBSixTQUFBSyxPQUFBLEdBQUEsVUFBQUMsTUFBQSxFQUFBO0FBQ0FaLFlBQUFhLEdBQUEsQ0FBQSwwQkFBQTtBQUNBLFFBQUFDLFFBQUFSLE9BQUFDLElBQUEsQ0FBQVEsS0FBQSxDQUFBQyxLQUFBLENBQUEsR0FBQSxDQUFBO0FBQ0FWLFdBQUFDLElBQUEsQ0FBQUUsSUFBQSxHQUFBSyxNQUFBQSxNQUFBRyxNQUFBLEdBQUEsQ0FBQSxDQUFBO0FBQ0FqQixZQUFBYSxHQUFBLENBQUFQLE9BQUFDLElBQUEsQ0FBQUUsSUFBQTtBQUNBSCxXQUFBSSxPQUFBLEdBQUEsS0FBQTtBQUNBLEdBTkE7QUFPQUosU0FBQVksT0FBQSxHQUFBLFVBQUFOLE1BQUEsRUFBQTtBQUNBWixZQUFBYSxHQUFBLENBQUEseUJBQUE7QUFDQVAsV0FBQUksT0FBQSxHQUFBLElBQUE7QUFDQTtBQUNBSixXQUFBSyxPQUFBO0FBQ0EsR0FMQTtBQU1BLENBakJBOztBQ0FBeEIsSUFBQWdDLE9BQUEsQ0FBQSxtQkFBQSxFQUFBLFVBQUFDLEtBQUEsRUFBQTs7QUFHQSxTQUFBO0FBQ0FDLG1CQUFBLHVCQUFBWixJQUFBLEVBQUE7QUFDQSxVQUFBYSxVQUFBYixLQUFBYyxPQUFBLENBQUEsY0FBQSxFQUFBLEVBQUEsQ0FBQTtBQUNBRCxnQkFBQUEsUUFBQU4sS0FBQSxDQUFBLEdBQUEsQ0FBQTs7QUFFQSxVQUFBUSxXQUFBLEVBQUE7O0FBRUEsV0FBQSxJQUFBQyxJQUFBLENBQUEsRUFBQUEsSUFBQUgsUUFBQUwsTUFBQSxFQUFBUSxHQUFBLEVBQUE7QUFDQSxZQUFBRCxTQUFBRSxjQUFBLENBQUFKLFFBQUFHLENBQUEsQ0FBQSxNQUFBLEtBQUEsRUFBQUQsU0FBQUYsUUFBQUcsQ0FBQSxDQUFBLElBQUEsQ0FBQSxDQUFBLEtBQ0FELFNBQUFGLFFBQUFHLENBQUEsQ0FBQSxLQUFBLENBQUE7QUFDQTs7QUFFQSxhQUFBRCxRQUFBO0FBQ0E7QUFiQSxHQUFBO0FBZ0JBLENBbkJBIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxudmFyIGFwcCA9IGFuZ3VsYXIubW9kdWxlKCdteUFwcCcsIFsndWkucm91dGVyJywgJ25nTWVzc2FnZXMnXSk7XG5cbmFwcC5ydW4oZnVuY3Rpb24gKCRyb290U2NvcGUsICR3aW5kb3cpIHtcbiAgJHJvb3RTY29wZS4kb24oJyRzdGF0ZUNoYW5nZUVycm9yJywgZnVuY3Rpb24gKGV2ZW50LCB0b1N0YXRlLCB0b1BhcmFtcywgZnJvbVN0YXRlLCBmcm9tUGFyYW1zLCBlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIHRyYW5zaXRpb25pbmcgZnJvbSBcIicgKyBmcm9tU3RhdGUubmFtZSArICdcIiB0byBcIicgKyB0b1N0YXRlLm5hbWUgKyAnXCI6JywgZXJyb3IpO1xuICB9KTtcblxuICAkcm9vdFNjb3BlLmdvQmFjayA9IGZ1bmN0aW9uICgpIHtcbiAgICAkd2luZG93Lmhpc3RvcnkuYmFjaygpXG4gIH07XG5cbn0pO1xuIiwiYXBwLmNvbnRyb2xsZXIoJ01haW5DdHJsJywgZnVuY3Rpb24oJHNjb3BlKSB7XG4gICRzY29wZS5wb2VtID0ge2xpbmU6IDAsIHdvcmQ6IFwiXCJ9O1xuICAkc2NvcGUubGluZUVuZCA9IGZhbHNlO1xuXG4gICRzY29wZS5vblNwYWNlID0gZnVuY3Rpb24gKCRldmVudCkge1xuICAgIGNvbnNvbGUubG9nKFwib24gc3BhY2UgZXZlbnQgdHJpZ2dlcmVkXCIpO1xuICAgIHZhciB3b3JkcyA9ICRzY29wZS5wb2VtLmlucHV0LnNwbGl0KCcgJyk7XG4gICAgJHNjb3BlLnBvZW0ud29yZCA9IHdvcmRzW3dvcmRzLmxlbmd0aC0xXTtcbiAgICBjb25zb2xlLmxvZygkc2NvcGUucG9lbS53b3JkKTtcbiAgICAkc2NvcGUubGluZUVuZCA9IGZhbHNlO1xuICB9XG4gICRzY29wZS5vbkVudGVyID0gZnVuY3Rpb24gKCRldmVudCkge1xuICAgIGNvbnNvbGUubG9nKFwib25FbnRlciBldmVudCB0cmlnZ2VyZWRcIik7XG4gICAgJHNjb3BlLmxpbmVFbmQgPSB0cnVlO1xuICAgIC8vIGRvIGFueXRoaW5nIGxpbmUtZGVwZW5kZW50IGhlcmU/XG4gICAgJHNjb3BlLm9uU3BhY2UoKTtcbiAgfVxufSk7XG4iLCJhcHAuZmFjdG9yeSgnU291bmRjb3VudEZhY3RvcnknLCBmdW5jdGlvbiAoJGh0dHApIHtcblxuXG4gIHJldHVybiB7XG4gICAgZ2V0U291bmRjb3VudDogZnVuY3Rpb24gKHdvcmQpIHtcbiAgICAgIHZhciBuZXdXb3JkID0gd29yZC5yZXBsYWNlKC9bXkEtWmEteiBdKy9nLCAnJylcbiAgICAgIG5ld1dvcmQgPSBuZXdXb3JkLnNwbGl0KFwiIFwiKTtcblxuICAgICAgdmFyIHNvdW5kRGljID0ge307XG5cbiAgIGZvciAodmFyIGkgPSAwOyBpIDwgbmV3V29yZC5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZihzb3VuZERpYy5oYXNPd25Qcm9wZXJ0eShuZXdXb3JkW2ldKSA9PT0gZmFsc2UpIHNvdW5kRGljW25ld1dvcmRbaV1dID0gMVxuICAgICAgICBlbHNlIHNvdW5kRGljW25ld1dvcmRbaV1dICs9IDEgIFxuICAgICAgfVxuXG4gICAgICByZXR1cm4gc291bmREaWNcbiAgICB9XG4gIH07XG5cbn0pO1xuXG5cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==

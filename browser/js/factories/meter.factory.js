app.factory('meterFactory', function() {

    var annotateLinesVowels = function(lineParses) {
      var lines = [];
      for (var l = 0; l < lineParses.length; l++) {
        lines[l] = [];
        for (var w = 0; w < lineParses[l].length; w++) {
          lines[l][w] = annotateWordVowels(lineParses[l][w]);
        }
      }
      return lines;
    };

    var annotateWordVowels = function (word) {
      var annotated = "";
      var sylls = word.split(' ');
      for (var s = 0; s < sylls.length; s++) {
        var lastChar = sylls[s][sylls[s].length-1];
        if (lastChar == String(Number(lastChar))) {
          annotated += sylls[s] + ' ';
        }
        else if (vowelSound(sylls[s])) {
          annotated += sylls[s] + 9 + ' ';
        }
        else annotated += sylls[s] + ' ';
      }
      return annotated.substring(0, annotated.length-1);
    };

    var vowelSound = function (str) {
      var simpleVowels = ['a', 'e', 'i', 'o', 'u', 'y'];
      var ltrs = str.split(' ');
      for (var i = 0; i < ltrs.length; i++) {
        if (simpleVowels.indexOf(ltrs[i]) === -1) return false;
      }
      return true;
    };

    var findStressLocations = function(lineParses) {
        // returns locations of vowels organized by stress level
        console.log('meter factory input', lineParses);
    };

    var mf = {};
    mf.main = function(lineParses) {
        return findStressLocations(lineParses);
    };
    return mf;
});

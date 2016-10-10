app.factory('meterFactory', function() {

    var annotateLineVowels = function(lineParses) {
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
      //console.log('Annotate Word Vowels Called');
      var annotated = "";
      var sylls = word.split(' ');
      for (var s = 0; s < sylls.length; s++) {
        var lastChar = sylls[s][sylls[s].length-1];
        if (lastChar == String(Number(lastChar))) {
          annotated += sylls[s] + ' ';
        }
        else if (vowelSound(sylls[s])) {
          console.log('this is an unmarked vowelSound: ' + sylls[s]);
          annotated += sylls[s] + 9 + ' ';
        }
        else annotated += sylls[s] + ' ';
      }
      return annotated.substring(0, annotated.length-1);
    };

    var vowelSound = function (str) {
      //console.log('vowelSound called');
      var arpaVowels = ['AA', 'IY', 'ER', 'AH'];
      return arpaVowels.indexOf(str) > -1;
    };

    var findStresses = function(lineParses) {
        // returns locations of vowels organized by stress level
        var annotated = annotateLineVowels(lineParses);
        findLineStresses(annotated[0]);
    };

    var findLineStresses = function (line) {
      var stresses = '';
      for (var w = 0; w < line.length; w++) {
        var sounds = line[w].split(' ');
        for (var s = 0; s < sounds.length; s++) {
          var sound = sounds[s];
          var stress = sound[sound.length-1]
          if (stress == String(Number(stress))) {
            // if the stress could be scanned either as long or short; 'anceps'
            if (stress > 1) stresses += 'a';
            else if (stress == 1) stresses += 'l';
            else stresses += 's';
          }
        }
      }
      console.log(stresses);
      return stresses;
    };

    var mf = {};
    mf.main = function(lineParses) {
        return findStresses(lineParses);
    };
    return mf;
});

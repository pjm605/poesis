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
        //  console.log('this is an unmarked vowelSound: ' + sylls[s]);
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
        var stresses = [];
        for (var i = 0; i < annotated.length; i++) {
          var ls = findLineStresses(annotated[i]);
          if (ls.length > 0) stresses = stresses.concat(ls);
        }
        //console.log('ALL STRESSES', stresses);
        return stresses;
    };

    var findLineStresses = function (line) {
      console.log('FIND LINE STRESSES CALLED');
      var stresses = [];
      for (var w = 0; w < line.length; w++) {
        if (line[w].length === 0 || line[w][0] === 'BREAK') {
          console.log('DONE WITH THE LINE');
          continue;
        }
        var wordStresses = [];
        var sounds = line[w].split(' ');
        for (var s = 0; s < sounds.length; s++) {
          var sound = sounds[s];
          var stress = sound[sound.length-1];
          if (stress == String(Number(stress))) {
            // if the stress could be scanned either as long or short; 'anceps'
            if (stress > 1) wordStresses.push('a');
            else if (stress == 1) wordStresses.push('l');
            else wordStresses.push('s');
          }
        }
        if (wordStresses) stresses.push(wordStresses);
      }

      //console.log('LINESTRESSES', stresses);
      return stresses;
    };

    var flatten = function (stresses) {
      return ''.concat(...[].concat(...stresses));
    }

    var mf = {};
    mf.main = function(lineParses, cm) {
      var stresses = findStresses(lineParses);
      var modeOptions = cm.getOption('mode');
      modeOptions.stresses = stresses;
      cm.setOption('mode', modeOptions);
    };
    return mf;
});

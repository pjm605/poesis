app.factory('meterFactory', function() {

    var meters = [];

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
      var annotated = "";
      var lastCharStr = null;
      var sylls = word.split(' ');
      for (var s = 0; s < sylls.length; s++) {
        var lastChar = sylls[s][sylls[s].length-1];
        lastCharStr = String(Number(lastChar));
        if (lastChar === lastCharStr) {
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
          ls = generalizeMeter(ls, scan(ls));
          meters.push([scan(ls), flatten(ls).length]);
          if (ls.length > 0) stresses = stresses.concat(ls);
        }
        console.log(meters, 'METERS');
        return stresses;
    };

    var findLineStresses = function (line) {
      var stresses = [];
      var stressStr = null;
      for (var w = 0; w < line.length; w++) {
        if (line[w].length === 0 || line[w][0] === 'BREAK') {
          continue;
        }
        var wordStresses = [];
        var sounds = line[w].split(' ');
        for (var s = 0; s < sounds.length; s++) {
          var sound = sounds[s];
          var stress = sound[sound.length-1];
          stressStr = String(Number(stress));
          if (stress === stressStr) {
            // if the stress could be scanned either as long or short; 'anceps'
            if (+stress > 1) wordStresses.push('a');
            else if (stress === '1') wordStresses.push('l');
            else wordStresses.push('s');
          }
        }
        if (wordStresses) stresses.push(wordStresses);
      }
      console.log('line stresses', stresses)
      return stresses;
    };

    var flatten = function (stresses) {
      return ''.concat(...[].concat(...stresses));
    }

    // this should be called with the overall meter if more than half of the
    // syllables are 'a'
    var generalizeMeter = function (stresses, foot) {
      var syl = 0;
      for (var i = 0; i < stresses.length; i++) {
        for (var j = 0; j < stresses[i].length; j++) {
          if (stresses[i][j] != foot[syl] && stresses[i][j] == 'a') {
            stresses[i][j] = foot[syl];
          }
          if (syl == foot.length-1) syl = 0;
          else syl++;
        }
      }
      return stresses;
    }

    var scan = function (line) {
      var feet = ['sl', 'ls', 'lss', 'ssl'];
      var footcounts = Array(4).fill(0);
      var flattened = flatten(line);
      for (var i = 0; i < feet.length; i++) {
        for (var j = 0; j < flattened.length; j++) {
          var match = true;
          for (var k = 0; k < feet[i].length; k++) {
            if (flattened[j+k] !== feet[i][k] && flattened[j+k] !== 'a') {
              match = false;
            }
          }
          if (match) {
            footcounts[i]++;
          }
        }
      }
      var maxfoot = [-1, -1];
      for (var i = 0; i < footcounts.length; i++) {
        if (footcounts[i] > maxfoot[1]) {
          maxfoot = [i, footcounts[i]];
        }
      }
      //console.log('SCANNING', feet, footcounts)
      return feet[maxfoot[0]];
    }

    var nameMeter = function (meterArray) {
      var footNames = {
        'sl': 'Iambic',
        'ls': 'Trochaic',
        'lss': 'Dactylic',
        'ssl': 'Anapestic'
      };
      var lengthNames = [null, null, null, 'Trimeter', 'Tetrameter', 'Pentameter', 'Hexameter',
    'Heptameter', 'Octameter', 'Nonameter', 'Decameter']
      //console.log('METER ARRAY', meterArray);

      var footFrequencies = {
        'sl': 0,
        'ls': 0,
        'lss': 0,
        'ssl': 0
      }

      var lengthFrequencies = Array(10).fill(0);

      for (var i = 0; i < meterArray.length; i++) {
        footFrequencies[meterArray[i][0]]++;
        lengthFrequencies[meterArray[i][1]]++;
      }

      var maxF = 0;
      var maxFName = '';
      var maxL = 0;
      var maxLName = 0;

      //console.log('FREQUENCIES', footFrequencies, lengthFrequencies);

      for (var key in footFrequencies) {
        if (footFrequencies[key] > maxF) {
          maxF = footFrequencies[key];
          maxFName = key;
        }
      }

      for (var i = 0; i < lengthFrequencies.length; i++) {
        if (lengthFrequencies[i] > maxL) {
          maxL = lengthFrequencies[i];
          maxLName = i;
        }
      }

      console.log(maxL, maxLName, maxFName, maxFName.length, 'length stuff');

      var name = "";
      name += footNames[maxFName] + ' ';
      name += lengthNames[Math.ceil(maxLName * 1.0 / maxFName.length)];
      return name;
    }

    var mf = {};
    mf.main = function(lineParses, cm) {
      var stresses = findStresses(lineParses);
      var name = nameMeter(meters);
      console.log('NAME', name);
      var modeOptions = cm.getOption('mode');
      modeOptions.stresses = stresses;
      cm.setOption('mode', modeOptions);
    };
    return mf;
});

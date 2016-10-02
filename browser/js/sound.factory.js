app.factory('soundFactory', function () {

  var countWordSounds = function (word, soundDic) {
    var newWord = word.replace(/[^A-Za-z ]+/g, '');
    newWord = newWord.split(' ');
    for (var i = 0; i < newWord.length; i++) {
      if (soundDic.hasOwnProperty(newWord[i]) === false) soundDic[newWord[i]] = 1;
      else soundDic[newWord[i]] += 1;
    }
  };

  //helper function we do not want to expose
  var countTextSounds = function (text) {
    var sd = {};
    console.log('text', text);
    for (var i = 0; i < text.length; i++) {
      countWordSounds(text[i], sd);
    }
    return sd
  };

  var normalize = function (counts) {
    console.log('normalize called');
    var total = 0;
    for (var k in counts) {
      total += counts[k];
    }
    for (var key in counts) {
      counts[key] = counts[key] * 1.0 / total;
    }
    return counts;
  }

  //sorts an array of sounds into an array of consonants and an array of vowels
  var soundSort = function (sounds) {
    var vowels = ['AO', 'AA', 'IY', 'UW', 'EH', 'IH', 'UH',
                  'AH', 'AX', 'AE', 'EY', 'AY', 'AW', 'OW', 'OY'];
    var sorted = [[], []];
    for (var i = 0; i < sounds.length; i++) {
      if (vowels.indexOf(sounds[i]) > -1) sorted[1].push(sounds[i]);
      else sorted[0].push(sounds[i]);
    }
    return sorted;
  }

  var soundToLetter = function (soundarr) {
    var result = [];
    var rule = {
      hh: 'h',
      er: 'ir',
      axr: 'er',
      zh: 's',
      dx: 'tt',
      el: 'le',
      em: 'om',
      en: 'n'
    };
    for (var i = 0; i < soundarr.length; i++) {
      var sound = soundarr[i].toLowerCase();
      if (rule.hasOwnProperty(sound)) result.push(rule[sound]);
      else result.push(sound);
    }
    return result;
  };

  return {
    //the text which is input should be an array of arrays of
    //phonetically parsed words
    identifySignificant: function (text) {
      var counts = countTextSounds(text);
      var nor = normalize(counts);
      console.log(nor);
      //average = n;
      // input: { AH: 3, JH: 1, UW: 1, D: 1, K: 1, EY: 1, SH: 1, N: 1 }
      // output: ["AH"]
      var significantN = 0.1;
      var significant = [];
      for (var key in nor) {
        console.log(key, nor[key], significantN)
        if (nor[key] > significantN) {
          significant.push(key);
        }
      }
      console.log('significant', significant);
      return soundSort(significant);
    },
    main: function (parseArray, cm) {
      var sig = this.identifySignificant(parseArray);
      var sigchars = soundToLetter(sig[0]);
      var modeOptions = cm.getOption('mode');
      modeOptions.consonantRules = sigchars;
      cm.setOption('mode', modeOptions);
    }
  };
});

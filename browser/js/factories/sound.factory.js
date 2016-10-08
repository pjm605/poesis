app.factory('soundFactory', function () {

  var stripBreaks = function (parseArray) {
    var stripped = [];
    for (var i = 0; i < parseArray.length; i++) {
      if (parseArray[i] != 'BREAK') stripped.push(parseArray[i]);
    }
    return stripped;
  };

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
    for (var i = 0; i < text.length; i++) {
      if (text[i] != 'BREAK') countWordSounds(text[i], sd);
    }
    return sd;
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
  };

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
  };

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
      en: 'n',
      th: 'th'
    };
    for (var i = 0; i < soundarr.length; i++) {
      var sound = soundarr[i].toLowerCase();
      if (rule.hasOwnProperty(sound)) result.push(rule[sound]);
      else result.push(sound);
    }
    return result;
  };

  var isVowel = function (str) {
    var vowels = ['AO', 'AA', 'IY', 'UW', 'EH', 'IH', 'UH', 'AH', 'AX', 'AE', 'EY', 'AY', 'OW', 'AW', 'OY'];
    return (/\d/.test(str[str.length-1]) || vowels.indexOf(str) > -1);
  };

  var unStress = function (vow) {
    var last = vow.substring(vow.length-1, vow.length);
    if (last == String(Number(last))) return vow.substring(0, vow.length-1);
    else return vow;
  }

  var stress = function (vow) {
    var last = vow.substring(vow.length-1, vow.length);
    if (last == String(Number(last))) return vow;
    else return vow+'9';
  }

  var locateVowelsInText = function (text, vowels) {
    var locations = {};
    for (var w = 0; w < text.length; w++) {
      var word = text[w].split(' ');
      var vowelCount = -1;
      for (var s = 0; s < word.length; s++) {
        var vowelSound = "";
        if (isVowel(word[s])) {
          vowelSound = unStress(word[s]);
          vowelCount++;
          console.log('vowelSound', vowelSound, w, vowelCount);
          for (var v = 0; v < vowels.length; v++) {
            var vow = vowels[v];
            if (vow == vowelSound) {
              if (locations[vow]) locations[vow].push([w, vowelCount]);
              else locations[vow] = [[w, vowelCount]];
            }
          }
        }
      }
    }
    console.log('LOCATIONS', locations);
    return locations;
  };

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
      var significantN = 0.1;
      var significant = [];
      for (var key in nor) {
        if (nor[key] > significantN) {
          significant.push(key);
        }
      }
      console.log('significant', significant);
      return soundSort(significant);
    },
    main: function (parseArray, cm) {
      var sig = this.identifySignificant(parseArray);
      var modeOptions = cm.getOption('mode');
      modeOptions.consonantRules = soundToLetter(sig[0]);
      modeOptions.vowelLocations = locateVowelsInText(stripBreaks(parseArray), sig[1]);
      cm.setOption('mode', modeOptions);
    }
  };
});

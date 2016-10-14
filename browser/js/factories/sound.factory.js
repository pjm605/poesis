app.factory('soundFactory', function () {

  //weird vowel coloring bug is likely because
  //BREAKS are being counted as words

  var countWordSounds = function (word, soundDic) {
    var newWord = word.replace(/[^A-Za-z ]+/g, '');
    newWord = newWord.split(' ');
    for (var i = 0; i < newWord.length; i++) {
      if (soundDic.hasOwnProperty(newWord[i]) === false) soundDic[newWord[i]] = 1;
      else soundDic[newWord[i]] += 1;
    }
  };

  var countTextSounds = function (text) {
    var sd = {};
    for (var i = 0; i < text.length; i++) {
      countWordSounds(text[i], sd);
    }
    return sd;
  };

  var normalize = function (counts) {
    var total = 0;
    for (var k in counts) {
      total += counts[k];
    }
    for (var key in counts) {
      counts[key] = counts[key] * 1.0 / total;
    }
    return counts;
  };

  var isVowel = function (str) {
    console.log('is this a vowel?', str);
    if (/\d/.test(str[str.length-1])) return true;
    else return false;
  };

  var stripBreaks = function (text) {
    var stripped = [];
    for (var i = 0; i < text.length; i++) {
      if (text[i] !== 'BREAK') stripped.push(text[i]);
    }
    return stripped;
  }

  var locateVowelsInText = function (brokenText, vowels) {
    var locations = {};
    var text = stripBreaks(brokenText);
    for (var w = 0; w < text.length; w++) {
      var word = text[w].split(' ');
      var vowelCount = -1;
      for (var s = 0; s < word.length; s++) {

        var vowelSound = "";
        //console.log('answer: ', isVowel(word[s]));
        if (isVowel(word[s])) {
          vowelSound = word[s].substring(0, word[s].length-1);
          vowelCount++;
          console.log('!!!!!vowelCount', vowelCount);
          //this is not being incremented, which makes me very sad
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
      hh: ['h'],
      er: ['ir'],
      axr: ['er'],
      zh: ['s'],
      dx: ['tt'],
      el: ['le'],
      em: ['om'],
      en: ['n'],
      sh: ['sh', 'tio'],
      w: ['w', 'wh']
    };
    for (var i = 0; i < soundarr.length; i++) {
      var sound = soundarr[i].toLowerCase();
      if (rule.hasOwnProperty(sound)) result.push(rule[sound]);
      else result.push(sound);
    }
    return result;
  };
  var frequencies = {
    AA: 0.0145,
    AE: 0.021,
    AH: 0.0174,
    AO: 0.0102,
    AW: 0.005,
    AY: 0.015,
    EH: 0.0286,
    ER: 0.1149,
    EY: 0.0194,
    IH: 0.0361,
    IY: 0.0632,
    OW: 0.0125,
    OY: 0.001,
    UH: 0.0043,
    UW: 0.0193,
    W: 0.0195,
    Y: 0.0081,
    B: 0.018,
    D: 0.0421,
    G: 0.008,
    K: 0.0318,
    P: 0.0215,
    T: 0.0691,
    CH: 0.0056,
    JH: 0.0059,
    DH: 0.0295,
    F: 0.0171,
    HH: 0.014,
    M: 0.0276,
    N: 0.0711,
    NG: 0.0099,
    L: 0.0396,
    R: 0.0694,
    S: 0.0475,
    SH: 0.0097,
    TH: 0.0041,
    V: 0.0201,
    Z: 0.0276,
    ZH: 0.0007
  }

  return {
    //the text which is input should be an array of arrays of
    //phonetically parsed words
    identifySignificant: function (text) {
      var counts = countTextSounds(text);
      var nor = normalize(counts);
      var significantN = frequencies;
      var significant = [];
      for (var key in nor) {
        if (nor[key] > significantN[key] * 2) {
          significant.push(key);
        }
      }
      return soundSort(significant);
    },
    main: function (parseArray, cm) {
      var sig = this.identifySignificant(parseArray);
      var modeOptions = cm.getOption('mode');
      modeOptions.consonantRules = soundToLetter(sig[0]);
      modeOptions.vowelLocations = locateVowelsInText(parseArray, sig[1]);
      cm.setOption('mode', modeOptions);
    }
  };
});

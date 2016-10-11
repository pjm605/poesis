app.factory('rhymeFactory', function () {

  var isVowel = function (str) {
    if (/\d/.test(str[str.length - 1 ])) return true;
    else return false;
  };

  //parseSound = "V IH1 Z AH0 B AH0 L"
  function findVowelLocation (parseSound) {
    console.log('parse sound!!!', parseSound);
    if (!parseSound) return 0;
    var word = parseSound.split(' ');
    //word = ["V", "IH1", "Z", "AH0", "B", "AH0", "L"]
    var vowelStore = [];
      for (var i = 0; i < word.length; i++) {
        if (isVowel(word[i])) {
          vowelStore.push(word[i].replace(/[^A-Za-z]/, ''));
        }
      }
    // vowelStore = [ 'IH', 'AH', 'AH' ]
    if (!vowelStore.length) return 0
    else return vowelStore.length - 1;
  }

//console.log('THIS IS FINDVOWEL', findVowelLocation('V IH1 Z AH0 B AH0 L'))

  function findLastVolAndCon (offset, parseSound) {
    console.log('this function has been called');
    console.log('parseSound', parseSound);
    var word = parseSound.join('').split(' ');
    var lastVowel = '';
    var consonants = [];
    var buffer = 0;
    var vowelIndex = findVowelLocation(parseSound[parseSound.length - 1])
    for (var i = 0; i < word.length; i++) {
      if (isVowel(word[i])) {
        lastVowel = word[i].replace(/[^A-Za-z ]+/g, '');
        buffer = i;
      }
    }

    for (var k = buffer + 1; k < word.length; k++) {
      consonants.push(word[k]);
    }
    var realIndex = offset + parseSound.length - 1;
    return [realIndex, vowelIndex, lastVowel, consonants];

  }

  function findMatch(breakLines) {
    var lastWords = [];

    // get [real line number, and rhyme sign]
    var lineCount = 0;
    for (var i = 0; i < breakLines.length; i++) {
      lastWords.push(findLastVolAndCon(lineCount, breakLines[i]))
      lineCount += breakLines[i].length;
    }

    var output = {};
    for (var i = 0; i < lastWords.length; i++) {
      var key = lastWords[i].slice(2);
      //console.log(lastWords[i].slice(1));
      if (key in output) {
        output[key].push(lastWords[i].slice(0, 2));
      }
      else {
        output[key] = [lastWords[i].slice(0, 2)];
      }
    }
  var result = []
  for (var key in output) {
    if (output.hasOwnProperty(key)) result.push(output[key]);
  }
    console.log('Result from findMatch function in RhymeFactory: ', result);
    return result;
  }

  var rf = {
    main: function (lineArray, cm) {
      var modeOptions = cm.getOption('mode');
      modeOptions.rhymeLocations = findMatch(lineArray);
      cm.setOption('mode', modeOptions);
    }
  };

 return rf;

});

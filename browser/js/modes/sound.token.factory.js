app.factory('soundToken', function () {

  var consonantColors = ['red', 'yellow'];

  var isVowel = function (tok, stream) {
    var simpleVowels = ['a', 'e', 'i', 'o', 'u'];
    if (tok == 'y') {
      if (stream.peek() && isVowel(stream.peek(), stream)) {
        return false;
      }
      return true;
    }
    return tok && simpleVowels.indexOf(tok[0]) > -1;
  };

  return function (stream, state, findToken, consonantRules, vowelLocations, currentPositions, vowelColors) {

    var next = findToken(stream);
    // console.log('NEXT', next);
    if (!next) {
      //next token is a space or does not exist
      state.position[0]++;
      state.position[1] = -1;
      return null;
    }
    else if (isVowel(next, stream)) {
      //next token is a vowel
      // console.log(next, 'is a vowel!!');
      state.position[1]++;
      for (var vow in vowelLocations) {
        var nextVowel = vowelLocations[vow][currentPositions[vow]];
        if (nextVowel && state.position[0] == nextVowel[0] && state.position[1] == nextVowel[1]) {
          currentPositions[vow]++;
          console.log(vow, vowelColors[vow]);
          return vowelColors[vow];
        }
      }
    }
    else {
      //next token is a consonant
      // console.log(next, 'is a consonant');
      for (var i = 0; i < consonantRules.length; i++) {
        for (var j = 0; j < consonantRules[i].length; j++) {
          if (next == consonantRules[i][j]) return consonantColors[i];
        }
      }
      return null;
    }
  };
});

app.factory('soundToken', function () {

  var consonantColors = ['tiffanyblue', 'lilac', 'lightgreen', 'green', 'blue', 'turquoise', 'softblue'];


  return function (stream, state, findToken, parserConfig, isVowel, currentPositions, vowelColors) {

    var vowelLocations = parserConfig.vowelLocations;
    var consonantRules = parserConfig.consonantRules;
    console.log('VOWELLOCATIONS', vowelLocations);
    console.log('VOWELCOLORS', vowelColors);

    var next = findToken(stream);
    //console.log('NEXT', next);
    if (stream.eol() || !next) {
      //next token is a space or does not exist
      state.position[0]++;
      state.position[1] = -1;
      return null;
    }
    else if (isVowel(next, stream)) {
      //next token is a vowel
      // console.log(next, 'is a vowel!!');
      state.position[1]++;
      //console.log('IAMHERE', state.position);
      for (var vow in vowelLocations) {
        var nextVowel = vowelLocations[vow][currentPositions[vow]];
        if (nextVowel && state.position[0] === nextVowel[0] && state.position[1] === nextVowel[1]) {
          console.log('IAMHERE', state.position);
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
          if (next === consonantRules[i][j]) return consonantColors[i];
        }
      }
      return null;
    }
  };
});

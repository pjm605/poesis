CodeMirror.defineMode('soundMode', function (config, parserConfig) {
  // console.log('CONFIG', config);
  // console.log('parserCONFIG', parserConfig);

  var simpleVowels = ['a', 'e', 'i', 'o', 'u'];
  var consonantRules = parserConfig.consonantRules;
  var vowelLocations = parserConfig.vowelLocations;
  var colors = ['red', 'green', 'purple', 'yellow'];
  var currentPositions = {};
  for (var vow in vowelLocations) {
    currentPositions[vow] = 0;
  }
  // console.log('vowel locations -->', vowelLocations);

  return {
    startState: function() {return {
      position: [0, -1],
      //token: this.token
    };},
    token: function (stream, state) {
      var next = stream.next().toLowerCase();
      if (next == ' ' || !next) {
        //next token is a space
        state.position[0]++;
        state.position[1] = -1;
        return null;
      }
      else {
        //next token is a vowel
        if (simpleVowels.indexOf(next) > -1 ||
        (next == 'y' && simpleVowels.indexOf(stream.peek()) < 0)) {
          console.log('inithe vowel branch!!!');
          while (simpleVowels.indexOf(stream.peek()) > -1 || stream.peek() == 'y') {
            stream.next();
          }
          state.position[1]++;
          for (var vow in vowelLocations) {
            var nextVowel = vowelLocations[vow][currentPositions[vow]];
            // console.log(state.position, "state.position");
            // console.log(nextVowel, 'nextvowel');
            if (nextVowel && state.position[0] == nextVowel[0] && state.position[1] == nextVowel[1]) {
              currentPositions[vow]++;
              return 'blue';
            }
          }
        }
        else {
          //next token is a consonant
          for (var i = 0; i < consonantRules.length; i++) {
            if (next == consonantRules[i][0]) {
              if (consonantRules[i].length == 1) return colors[i];
              for (var char = 1; char < consonantRules[i].length; char++) {
                if (consonantRules[i][char] != stream.next()) {
                  stream.backUp(char);
                }
                else return colors[i];
              }
            }
          }
          return null;
        }
      }
    }
  }
});

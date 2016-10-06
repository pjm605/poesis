CodeMirror.defineMode('soundMode', function (config, parserConfig) {
  // console.log('CONFIG', config);
  // console.log('parserCONFIG', parserConfig);

  var simpleVowels = ['a', 'e', 'i', 'o', 'u'];
  var consonantRules = parserConfig.consonantRules;
  var vowelLocations = parserConfig.vowelLocations;
  var colors = ['red', 'green', 'blue', 'yellow'];
  var currentPositions = {};
  for (var vow in vowelLocations) {
    currentPositions[vow] = 0;
  }

  return {
    startState: function() {return {
      position: [0, -1],
      //token: this.token
    };},
    token: function (stream, state) {
      var next = stream.next();
      console.log(next, 'NEXT');
      if (next == ' ' || !next) {
        //next token is a space
        state.position[0]++;
        state.position[1] = -1;
        return null;
      }
      else {
        next.toLowerCase();
      //  if (true) {
          //next token is a vowel
          stream.backUp();
          var vowelTest = stream.match(/^(ie|ou|ei|oi|ai|ow|ea|[aeiou])/, true, false);
          //var vowelTest = stream.match(/[aeiou]/);
          console.log('This is what stream.match returns', (vowelTest ? vowelTest : ""));
          if (vowelTest) {
            console.log('vowel test passed!!');
            // for (var i = 0; i < vowelTest[0].length; i++) {
            //   stream.next();
            // }
            state.position[1]++;
            console.log('state position', state.position);
            for (var vow in vowelLocations) {
              var nextVowel = vowelLocations[vow][currentPositions[vow]];
              // console.log(state.position, "state.position");
              // console.log(nextVowel, 'nextvowel');
              if (nextVowel && state.position[0] == nextVowel[0] && state.position[1] == nextVowel[1]) {
                currentPositions[vow]++;
                return 'blue';
              }
            }
            stream.next()
          }
        //}
      //  else {
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
    //}
  }
});

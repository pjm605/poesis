CodeMirror.defineMode('soundMode', function (config, parserConfig) {
  console.log('CONFIG', config);
  console.log('parserCONFIG', parserConfig);

  var simpleVowels = ['a', 'e', 'i', 'o', 'u']; //add Upper Case AEIOU
  var consonantRules = parserConfig.consonantRules;
  var vowelLocations = parserConfig.vowelLocations;
  var colors = ['red', 'blue', 'green', 'purple'];

  return {
    startState: function() {return {
      counting: [0, -1],
      token: this.token
    };},
    token: function (stream, state) {
      // var uc = stream.string.toLowerCase();
      // stream.string = uc;
      var next = stream.next();
      if (next == ' ') {
        state.counting[0]++;
        state.counting[1] = -1;
        return null;
      }
      else {
        if (simpleVowels.indexOf(next) > -1 ||
        (next == 'y' && simpleVowels.indexOf(stream.peek()) < 0)) {
          while (simpleVowels.indexOf(stream.peek()) > -1 || stream.peek() == 'y') {
            stream.next();
          }
          state.counting[1]++;
          return 'blue';
        }
        else {
          for (var i = 0; i < consonantRules.length; i++) {
            if (next == consonantRules[i][0]) {
              if (consonantRules[i].length == 1) return colors[i];
              for (var char = 1; char < consonantRules[i].length; char++) {
                if (consonantRules[i][char] != stream.next()) {
                  stream.backUp(char);
                  break;
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

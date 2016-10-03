CodeMirror.defineMode('consonantMode', function (parserConfig) {
  //local variables from parserConfig values go here!
  var consonantRules = parserConfig.mode.consonantRules;
  console.log(consonantRules);
  var colors = ['red', 'blue', 'green', 'yellow'];
  return {
    token: function (stream) {
      var next = stream.next();
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
      return null
    }
  }
});

CodeMirror.defineMode('vowelMode', function (parserConfig) {
  var simpleVowels = ['a', 'e', 'i', 'o', 'u'];
  var vowelLocations = parserConfig.mode.vowelLocations;

  return {
    startState: function() {return {counting: [0, -1]};},
    token: function (stream, state) {
      var next = stream.next();
      if (next == ' ') {
        state.counting[0]++;
        state.counting[1] = -1;
        return null;
      }
      else {
        if (simpleVowels.indexOf(next) > -1) {
          while (simpleVowels.indexOf(stream.peek()) > -1 || stream.peek() == 'y') {
            stream.next();
          }
          state.counting[1]++;
          console.log(state.counting);
          return 'blue';
        }
        else return 'green';
      }
    }
  }
});

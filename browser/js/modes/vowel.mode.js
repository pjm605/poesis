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
        if (simpleVowels.indexOf(next) > -1 ||
        (next == 'y' && simpleVowels.indexOf(stream.peek()) < 0)) {
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

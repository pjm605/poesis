CodeMirror.defineMode('consonantMode', function (parserConfig) {
  //local variables from parserConfig values go here!
  var colorrules = parserConfig.mode.colorrules || [];
  console.log(colorrules);
  var colors = ['red', 'blue', 'green', 'yellow'];
  return {
    token: function (stream) {
      var next = stream.next();
      for (var i = 0; i < colorrules.length; i++) {
        if (next == colorrules[i][0]) {
          if (colorrules[i].length == 1) return colors[i];
          for (var char = 1; char < colorrules[i].length; char++) {
            if (colorrules[i][char] != stream.next()) {
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
  return {
    startState: function() {return {counting: [0, -1]};},
    token: function (stream, state) {
      console.log(state);
      var next = stream.next();
      if (next == ' ') {
        state.counting[0]++;
        state.counting[1] = -1;
        return null;
      }
      else {
        state.counting[1]++;
        return 'green';
      }
    }
  }
});

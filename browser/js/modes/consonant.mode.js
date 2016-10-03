CodeMirror.defineMode('consonantMode', function (parserConfig) {
  var consonantRules = parserConfig.mode.consonantRules;
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
      return null;
    }
  };
});

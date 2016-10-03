CodeMirror.defineMode('consonantMode', function (parserConfig) {
  return {
    token: function (stream, state) {
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

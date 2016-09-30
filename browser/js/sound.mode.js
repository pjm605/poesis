CodeMirror.defineMode("lettermode", function (parserConfig) {
  //local variables from parserConfig values go here!
  var colorrules = parserConfig.mode.colorrules || [];
  console.log(colorrules)
  var colors = ['red', 'blue', 'green', 'yellow'];
  return {
    startState: function () {return {test: true};},
    token: function (stream, state) {
      var n = stream.next();
      for (var i = 0; i < colorrules.length; i++) {
        if (colorrules[i].indexOf(n) > -1) {
          return colors[i];
        }
      }
      return null;
    }
  }
});

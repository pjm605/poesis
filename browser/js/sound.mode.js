CodeMirror.defineMode('lettermode', function (parserConfig) {
  //local variables from parserConfig values go here!
  var colorrules = parserConfig.mode.colorrules || [];
  console.log(colorrules)
  var colors = ['red', 'blue', 'green', 'yellow'];
  return {
    token: function (stream) {
      var next = stream.next();
      for (var i = 0; i < colorrules.length; i++) {
        if (colorrules[i].indexOf(next) > -1) {
          return colors[i];
        }
      }
      return null;
    }
  }
});

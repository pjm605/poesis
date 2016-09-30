CodeMirror.defineMode("lettermode", function (parserConfig) {
  //local variables from parserConfig values go here!
  var colorletters = parserConfig.mode.colorletters;
  console.log('parserConfig', parserConfig)
  return {
    startState: function () {return {test: true};},
    token: function (stream, state) {
      if (colorletters.indexOf(stream.next()) > -1) {
        return 'error';
      }
      else {
        return null;
      }
      //return 'keyword';
    }
  }
});

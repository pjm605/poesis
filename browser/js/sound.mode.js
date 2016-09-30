CodeMirror.defineMode("lettermode", function (parserConfig) {
  //local variables from parserConfig values go here!
  var colorletters = parserConfig.mode.colorletters || [];
  console.log(colorletters)
  return {
    startState: function () {return {test: true};},
    token: function (stream, state) {
      if (colorletters.indexOf(stream.next()) > -1) {
        return 'colored';
      }
      else {
        return null;
      }
      //return 'keyword';
    }
  }
});

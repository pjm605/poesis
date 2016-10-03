CodeMirror.defineMode('vowelMode', function (parserConfig) {
  var vowelLocations = parserConfig.mode.vowelLocations;
  return {
    token: function (stream, state) {
      stream.next();
      return 'yellow';
    }
  }
}

CodeMirror.defineMode('soundMode', function (config, parserConfig) {
  console.log('CONFIG', config);
  console.log('parserCONFIG', parserConfig);
  var vowelMode = CodeMirror.getMode({
    name: "vowelMode",
    vowelLocations: config.mode.vowelLocations
  });
  var consonantMode = CodeMirror.getMode(config, {
    name: 'consonantMode',
    consonantRules: config.mode.consonantRules
  });
  return {
    token: function (stream) {
      return consonantMode.token(stream);
    }
  };
});

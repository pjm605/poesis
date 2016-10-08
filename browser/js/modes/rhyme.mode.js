CodeMirror.defineMode('rhymeMode', function (config, parserConfig) {
	return {
		startState: function () {
      return {
        rhyme: false
      }
    },
    token: function (stream, state) {
      //mode goes here!
    }
  };
});

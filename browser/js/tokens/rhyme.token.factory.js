app.factory('rhymeToken', function () {
	return function (stream, state, findToken, parserConfig) {
		var rhymeLocations = parserConfig.rhymeLocations;
		var next = findToken(stream);
		if (next == 'm') return 'blue';
		else return null;
	}
});

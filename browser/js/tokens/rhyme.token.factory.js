app.factory('rhymeToken', function () {

	var rhymeColors = ['tiffanyblue', 'lightpink', 'cranberry', 'softblue', 'lilac', 'burgundy', 'orange', 'red', 'green', 'lightgreen'];
	var locations = [];

	return function (stream, state, findToken, parserConfig, isVowel) {
		var rhymeLocations = parserConfig.rhymeLocations;
		var next = findToken(stream);
		if (next === ' ' || !next) {
			state.position[0]++;
			state.position[1] = -1;
			return null;
		} else {
			if (isVowel(next, stream)) {
				state.position[1]++;
				for (var i = 0; i < rhymeLocations.length; i++) {
					for (var j = 0; j < rhymeLocations[i].length; j++) {
						locations[0] = rhymeLocations[i][j][0];
						locations[1] = rhymeLocations[i][j][1];
						if (locations[0] === state.position[0] && locations[1] === state.position[1]){
							// console.log('MATCHING', [state.position[0], state.position[1]]);
							if (stream.peek() !== ' ') {
								stream.skipToEnd();
							}
							state.position[0]++;
							state.position[1] = -1;
							return rhymeColors[i];
						}
					}
				}
			}
			return null;
		}
	}
});

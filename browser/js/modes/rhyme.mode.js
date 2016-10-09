CodeMirror.defineMode('rhymeMode', function (config, parserConfig) {
var simpleVowels = ['a', 'e', 'i', 'o', 'u'];
var rhymeLocations = parserConfig.rhymeLocations;
var rhymeColors = ['blue', 'red', 'green', 'orange', 'yellow'];
var locations = [];

	return {
		startState: function () {
			return {
				counting: [0, -1]
			};
		},
		token: function (stream, state) {
			var next = stream.next();
			if (next === ' ') {
				state.counting[0]++;
				state.counting[1] = -1;
				return null;
			} else {
				if (simpleVowels.indexOf(next) > -1) {
					state.counting[1]++;
					for (var i = 0; i < rhymeLocations.length; i++) {
						for (var j = 0; j < rhymeLocations[i].length; j++) {
							locations[0] = rhymeLocations[i][j][0];
							locations[1] = rhymeLocations[i][j][1];
							if (locations[0] === state.counting[0] && locations[1] === state.counting[1]){
								console.log('MATCHING', [state.counting[0], state.counting[1]]);
								if (stream.peek() !== ' ') {
									stream.skipToEnd();
								}
								state.counting[0]++;
								state.counting[1] = -1;
								return rhymeColors[i];
							}
						}
					}
				}
				return null;
			}
		}
	}
});

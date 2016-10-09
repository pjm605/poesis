CodeMirror.defineMode('rhymeMode', function (config, parserConfig) {
var simpleVowels = ['a', 'e', 'i', 'o', 'u'];
// var simpleVowels = parserConfig.mode.simpleVowels;
var rhymeLocations = parserConfig.rhymeLocations; //[ [ [ 5, 0 ], [ 13, 0 ] ] ]
var rhymeColors = ['blue', 'red', 'green', 'orange', 'yellow'];

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
				return 'null';
			} else {
				if (simpleVowels.indexOf(next) > -1) {
					state.counting[1]++;
					for (var i = 0; i < rhymeLocations.length; i++) {
						for (var j = 0; j < rhymeLocations[i].length; j++) {
							var locations = [];
							locations[0] = rhymeLocations[i][j][0];
							locations[1] = rhymeLocations[i][j][1];
							console.log('locations', locations);
							console.log('state.counting!!!!!!!!!!!!!!!!', state.counting);
							if (locations[0] === state.counting[0] && locations[1] === state.counting[1]){
								console.log('HEY IT WORKS', [state.counting[0], state.counting[1]]);
								// while (stream.peak() !== ' ') {
								// 	stream.next();
								// }
								return rhymeColors[i];
							}
						}
					}
					return 'null';
				}
				// return 'orange';
			}
		}
	}
});

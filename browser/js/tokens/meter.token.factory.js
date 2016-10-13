app.factory('meterToken', function () {
  //state.position = [word#, v#]
  //the missing syllables bug is caused by the fact that you
  //were too lazy to hard code things
  return function (stream, state, findToken, parserConfig, isVowel, currentPositions) {
    var next = findToken(stream);
    if (!next || stream.eol()) {
      state.position[0]++;
      state.position[1] = -1;
    }
    if (isVowel(next, stream) && parserConfig.stresses.length) {
      state.position[1]++;
      console.log('NEXT I AM DEALING WITH THIS VOWEL NOW', next);
      console.log('STRESSES', parserConfig.stresses)
      console.log(state.position, '<--- state.position, brosphine');
      if (state.position[0] >= parserConfig.stresses.length) {
        var str = 'waiting';
      }
      else {
        var str = parserConfig.stresses[state.position[0]][state.position[1]];
      }
      switch (str) {
        case 'a':
          return 'lightgreen';
        case 's':
          return 'lightpink';
        case 'l':
          return 'softblue';
        case 'waiting':
          return null;
      }
    }
    else return null;
  };
});

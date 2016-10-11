app.factory('meterToken', function () {
  //state.position = [word#, v#]
  //the hanging word bug seems to be caused by
  //state.position[0] failing to increment
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
      console.log(state.position[0], '<--- state.position, brosphine');
      console.log('this hopefully does exist -->', parserConfig.stresses)
      var str = parserConfig.stresses[state.position[0]][state.position[1]];
    //  console.log('current stress: ', str);
      switch (str) {
        case 'a':
          return 'turquoise';
        case 's':
          return 'green';
        case 'l':
          return 'blue';
      }
    }
    else return null;
  };
});

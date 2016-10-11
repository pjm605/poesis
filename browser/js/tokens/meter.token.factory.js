app.factory('meterToken', function () {
  //state.position = [word#, v#]
  return function (stream, state, findToken, parserConfig, isVowel, currentPositions) {
    var next = findToken(stream);
    if (!next) {
      state.position[0]++;
      state.position[1] = -1;
    }
    if (isVowel(next, stream) && parserConfig.stresses.length) {
      state.position[1]++;
      console.log('STRESSES', parserConfig.stresses)
      console.log(state.position, '<--- state.position, brosphine');
      //var str = stresses[state.position[0]][state.position[1]];
    //  console.log('current stress: ', str);
      switch ('a') {
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

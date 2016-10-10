app.factory('meterToken', function () {
  //state.position = [word#, v#]
  return function (stream, state, findToken, isVowel, parserConfig, currentPositions) {
    var next = findToken(stream);
    var stresses = parserConfig.stresses;
    console.log('stresses', stresses);
    if (!next) {
      state.position[0]++;
      state.position[1] = -1;
    }
    // if (isVowel(next, stream) && stresses.length) {
    //   state.position[1]++;
    //   switch (stresses[vowelNumber]) {
    //     case 'a':
    //       return 'green';
    //     case 's':
    //       return 'blue';
    //     case 'l':
    //       return 'red';
    //   }
    // }
    else return null;
  };
});

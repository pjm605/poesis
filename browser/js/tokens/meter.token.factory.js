app.factory('meterToken', function () {
  return function (stream, state, findToken, isVowel, parserConfig, currentPositions) {
    var next = findToken(stream);
    console.log('PARSER CONFIG STRESSES', parserConfig.stresses);
    var stresses = parserConfig.stresses;
    console.log('stresses');
    if (isVowel(next, stream) && stresses.length) {
      switch (stresses.shift()) {
        case 'a':
          return 'green';
        case 's':
          return 'blue';
        case 'l':
          return 'red';
      }
    }
    else return null;
  };
});

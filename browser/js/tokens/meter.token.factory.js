app.factory('meterToken', function () {
  return function (stream, state, findToken, isVowel, parserConfig, currentPositions) {
    var next = findToken(stream);
    if (isVowel(next, stream)) {
      // do stuff
    }
    return null;
  };
});

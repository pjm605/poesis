CodeMirror.defineMode("lettermode", function () {
  return {
    startState: function () {return {letter: 'd'};},
    token: function (stream, state) {
      if (stream.peek() == letter) {
        return 'd';
      }
      else {
        return null;
      }
    }
  }
});

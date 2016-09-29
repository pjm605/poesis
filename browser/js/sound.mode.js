CodeMirror.defineMode("lettermode", function () {
  return {
    startState: function () {return {test: true};},
    token: function (stream, state) {
      if (stream.next() == 'd') {
        return 'error';
      }
      else {
        return null;
      }
      //return 'keyword';
    }
  }
});

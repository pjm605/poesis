CodeMirror.defineMode("lettermode", function (parserConfig) {
  //local variables from parserConfig values go here!
  var colorrules = parserConfig.mode.colorrules || [];
  console.log(colorrules)
  var colors = ['red', 'blue', 'green', 'yellow'];
  return {
    startState: function () {return {test: true};},
    token: function (stream, state) {
      var n = stream.next();
      for (var i = 0; i < colorrules.length; i++) {
        if (colorrules[i].indexOf(n) > -1) {
          return colors[i];
        }
      }
      return null;
    }
  }
});


/*

CodeMirror.defineMode("lettermode", function () {
  return {
    startState: function () {return {between: false};},
    token: function (stream, state) {


      if (!state.between && stream.next() == '|') { //if we want to include | , else stream.peak == "|" and inside of {} state.next();
        state.between = true;
      
        
      }

      if(state.between) {
        if(stream.skipTo('|'))
        {
          stream.next();
          state.between = false;
=======
      var n = stream.next();
      for (var i = 0; i < colorrules.length; i++) {
        if (colorrules[i].indexOf(n) > -1) {
          return colors[i];
>>>>>>> c4c0070d7c3951549670b27dcc972c0a1815d244
        }
      }
      return null;
    }
  }
});

*/
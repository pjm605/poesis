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
        }
        else {
          stream.skipToEnd();
        }
        return "error"; 
      }
      else {
        return null;
      }
      //return 'keyword';
    }
  }
});
*/

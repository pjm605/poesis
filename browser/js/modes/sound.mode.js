CodeMirror.defineMode('soundMode', function (config, parserConfig) {
  var simpleVowels = ['a', 'e', 'i', 'o', 'u'];
  var consonantRules = parserConfig.consonantRules;
  var vowelLocations = parserConfig.vowelLocations;
  var colors = ['red', 'green', 'blue', 'yellow'];
  var currentPositions = {};
  var clusters = ['tio', 'sh', 'th', 'ng', 'ch', 'ie', 'ou', 'ei', 'oi', 'ee', 'ai', 'ow', 'ea', 'oo'];

  for (var vow in vowelLocations) {
    currentPositions[vow] = 0;
  }

  var isVowel = function (tok) {
    // console.log(tok);
    // console.log(tok[0]);
    return tok && simpleVowels.indexOf(tok[0]) > -1;
  };

  var findToken = function (stream) {
    var next = stream.next();
    var single = next;
    if (!next || next == ' ') return null;
    else {
      next = next.toLowerCase();
      for (var i = 0; i < clusters.length; i++) {
        var current = "";
        //  console.log('trying....', clusters[i]);
        for (var c = 0; c < clusters[i].length; c++) {
            // console.log('cluster: ' + clusters[i][c]);
            // console.log('next', next);
          if (next == clusters[i][c]) {
            current += next;
          }
          else {
            stream.backUp(stream.current().length);
            next = stream.next().toLowerCase();
            break;
          }
          if (stream.peek()) next = stream.next().toLowerCase();
          else if (c < clusters[i].length - 1) {
            //console.log('break reached');
            stream.backUp(stream.current().length);
            next = stream.next().toLowerCase();
            break;
          }
        }
        if (current == clusters[i]) {
          // console.log('NEW MESSAGE', next);
          stream.backUp(1);
          return current;
        }
      }
    }
    return single;
    stream.next();
  };

  return {
    startState: function () {
      return {
        position: [0, -1]
      };
    },
    token: function (stream, state) {
      var next = findToken(stream);
      // console.log('NEXT', next);
      if (!next) {
        //next token is a space or does not exist
        state.position[0]++;
        state.position[1] = -1;
        return null;
      }
      else if (isVowel(next)) {
        //next token is a vowel
        // console.log(next, 'is a vowel!!');
        state.position[1]++;
        for (var vow in vowelLocations) {
          var nextVowel = vowelLocations[vow][currentPositions[vow]];
          // console.log(state.position, "state.position");
          // console.log(nextVowel, 'nextvowel');
          if (nextVowel && state.position[0] == nextVowel[0] && state.position[1] == nextVowel[1]) {
            currentPositions[vow]++;
            return 'blue';
          }
        }
      }
      else {
        //next token is a consonant
        // console.log(next, 'is a consonant');
        for (var i = 0; i < consonantRules.length; i++) {
          if (next == consonantRules[i]) return colors[i];
        }
        return null;
      }
    }
  };
});
